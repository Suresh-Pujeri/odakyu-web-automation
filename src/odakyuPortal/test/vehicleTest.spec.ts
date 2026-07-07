import { expect, Page } from '@playwright/test';
import  test from '../fixtures/baseTest';
import { userRoleAccessMatrix } from '../../testUserStates';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateTimestamp(): string {
  const now = new Date();
  const pad = (n: number, len = 2) => String(n).padStart(len, '0');
  return (
    `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}` +
    `_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
  );
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface VehicleData {
  name: string;
  tareWeight: number;
  maxLoadWeight: number;
  maxVehicleWeight: number;
  fuelTankCapacity: number;
  deviceId: string;
  cameraId: string;
}

function buildVehicleData(): VehicleData {
  const ts = generateTimestamp();
  const tareWeight = randomInt(1000, 5000);
  const maxLoadWeight = randomInt(5000, 15000);
  return {
    name: `TestVehicle_${ts}`,
    tareWeight,
    maxLoadWeight,
    maxVehicleWeight: tareWeight + maxLoadWeight,
    fuelTankCapacity: randomInt(50, 300),
    deviceId: `DEV_${ts}`,
    cameraId: `CAM_${ts}`,
  };
}

const BASE_URL = 'https://hauler.qa.ap.odakyu.smartcity.routeware.com';

// ---------------------------------------------------------------------------
// Page helpers
// ---------------------------------------------------------------------------

async function navigateToVehicles(page: Page) {
  //await page.goto(`${BASE_URL}/routes/route-tracker`);
  //await page.waitForLoadState('networkidle');

  // Click the Fleet nav item — it redirects directly to /fleet/vehicles
  await page.getByRole('link', { name: 'Fleet' }).click();
  await page.waitForURL('**/fleet/vehicles**');
  await expect(page).toHaveTitle(/Vehicles/);
}

async function selectDropdownFirstOption(page: Page, triggerLocator: ReturnType<Page['locator']>) {
  await triggerLocator.click();
  // Wait for at least one option to appear and click the first non-placeholder one
  const firstOption = page.locator('ul[role="listbox"] li, [role="option"]').first();
  await firstOption.waitFor({ state: 'visible', timeout: 5000 });
  await firstOption.click();
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------
for (const userRole of userRoleAccessMatrix.adminOnly) {
test.describe('Hauler — Vehicle CRUD', () => {
  let vehicle: VehicleData;
test.use({ storageState: `userStates/${userRole}UserStorageState.json` });
  test.beforeEach(async ({routePlannerPage,loginPage}) => {
    await routePlannerPage.goto();
    vehicle = buildVehicleData();
    console.log('Vehicle under test:', JSON.stringify(vehicle, null, 2));
  });

  // -------------------------------------------------------------------------
  // Full end-to-end CRUD
  // -------------------------------------------------------------------------
  test('Create → Search → Edit → Delete a vehicle', async ({ page }) => {

    // -----------------------------------------------------------------------
    // Phase 1: Navigate to Fleet > Vehicles
    // -----------------------------------------------------------------------
    await navigateToVehicles(page);

    const createBtn = page.getByRole('button', { name: 'Create Vehicle' });
    await expect(createBtn).toBeVisible();

    // -----------------------------------------------------------------------
    // Phase 2: Create vehicle
    // -----------------------------------------------------------------------
    await createBtn.click();
    await page.waitForURL('**/fleet/vehicles/create');
    await expect(page).toHaveTitle(/Create Vehicle/);

    // -- Vehicle Name
    const nameInput = page.getByLabel('Vehicle Name');
    await nameInput.fill(vehicle.name);
    await expect(nameInput).toHaveValue(vehicle.name);

    // -- Active checkbox (should already be checked)
    const activeCheckbox = page.getByLabel('Active');
    await expect(activeCheckbox).toBeChecked();

    // -- Vehicle Type dropdown → Commercial
    await page.getByLabel('Vehicle Type').click();
    await page.getByRole('option', { name: 'Commercial' }).click();
    await expect(page.getByLabel('Vehicle Type')).toHaveValue('Commercial');

    // -- Vehicle Subtype dropdown → first option (Rotate)
    await page.getByLabel('Vehicle Subtype').click();
    const firstSubtype = page.getByRole('option').first();
    const subtypeName = await firstSubtype.textContent();
    await firstSubtype.click();
    console.log('Selected subtype:', subtypeName?.trim());

    // -- Service Status — leave as Available (default)
    await expect(page.getByLabel('Service Status')).toHaveValue('Available');

    // -- Operational Facility → first option
    await page.getByLabel('Operational Facility').click();
    const firstFacility = page.getByRole('option').first();
    const facilityName = await firstFacility.textContent();
    await firstFacility.click();
    console.log('Selected facility:', facilityName?.trim());

    // -- Tare Weight
    const tareWeightInput = page.getByLabel('Tare Weight');
    await tareWeightInput.fill(String(vehicle.tareWeight));
    await expect(tareWeightInput).toHaveValue(String(vehicle.tareWeight));

    // -- Maximum Load Weight
    const maxLoadInput = page.getByLabel('Maximum Load Weight');
    await maxLoadInput.fill(String(vehicle.maxLoadWeight));
    await expect(maxLoadInput).toHaveValue(String(vehicle.maxLoadWeight));

    // -- Maximum Vehicle Weight (auto-calculated)
    const maxVehicleWeightInput = page.getByLabel('Maximum Vehicle Weight (Loaded)');
    await expect(maxVehicleWeightInput).toHaveValue(String(vehicle.maxVehicleWeight));

    // -- Fuel Type → Regular gasoline
    await page.getByLabel('Fuel Type').click();
    await page.getByRole('option', { name: 'Regular gasoline' }).click();
    await expect(page.getByLabel('Fuel Type')).toHaveValue('Regular gasoline');

    // -- Fuel Tank Capacity
    const fuelCapInput = page.getByLabel('Fuel Tank Capacity');
    await fuelCapInput.fill(String(vehicle.fuelTankCapacity));
    await expect(fuelCapInput).toHaveValue(String(vehicle.fuelTankCapacity));

    // -- Device ID
    const deviceIdInput = page.getByLabel('Device ID');
    await deviceIdInput.fill(vehicle.deviceId);
    await expect(deviceIdInput).toHaveValue(vehicle.deviceId);

    // -- Device Manufacturer → CalAmp (first option)
    await page.getByLabel('Device Manufacturer').click();
    const firstManufacturer = page.getByRole('option').first();
    await firstManufacturer.click();

    // -- Camera ID
    const cameraIdInput = page.getByLabel('Camera ID');
    await cameraIdInput.fill(vehicle.cameraId);
    await expect(cameraIdInput).toHaveValue(vehicle.cameraId);

    // -- Save
    await page.getByRole('button', { name: 'Save' }).click();

    // -- Assert success toast and redirect
    await expect(page.getByText('Vehicle was saved successfully.')).toBeVisible({ timeout: 10000 });
    await page.waitForURL('**/fleet/vehicles**');
    await expect(page).toHaveTitle(/Vehicles/);

    // -----------------------------------------------------------------------
    // Phase 3: Search for created vehicle
    // -----------------------------------------------------------------------
    const searchInput = page.getByPlaceholder('Search');
    await searchInput.fill(vehicle.name);
    await page.waitForURL(`**searchTerm=${vehicle.name}**`);

    // Assert vehicle appears in the list
    const vehicleRow = page.getByRole('row').filter({ hasText: vehicle.name });
    await expect(vehicleRow).toBeVisible({ timeout: 10000 });

    // Assert key columns in the row
    await expect(vehicleRow.getByText('Commercial')).toBeVisible();
    await expect(vehicleRow.getByText('Active')).toBeVisible();
    await expect(vehicleRow.getByText('Available')).toBeVisible();
    await expect(vehicleRow.getByText(vehicle.deviceId.substring(0, 7), { exact: false })).toBeVisible();

    console.log(`✅ Vehicle '${vehicle.name}' found in list.`);

    // -----------------------------------------------------------------------
    // Phase 4: Open vehicle detail and click Edit
    // -----------------------------------------------------------------------
    // Click the details icon (first icon in OPTIONS column)
    await vehicleRow.getByRole('button').first().click();
    await page.waitForURL('**/fleet/vehicles/**');
    await expect(page).toHaveTitle(/Vehicle Details/);

    // Assert detail page shows correct data
    await expect(page.getByText(vehicle.name)).toBeVisible();
    await expect(page.getByText('Commercial')).toBeVisible();
    await expect(page.getByText('Rotate')).toBeVisible();
    await expect(page.getByText(vehicle.deviceId)).toBeVisible();
    await expect(page.getByText(vehicle.cameraId)).toBeVisible();
    await expect(page.getByText(`${vehicle.tareWeight.toLocaleString()} kg`)).toBeVisible();
    await expect(page.getByText(`${vehicle.maxLoadWeight.toLocaleString()} kg`)).toBeVisible();
    await expect(page.getByText('Regular gasoline')).toBeVisible();
    await expect(page.getByText(`175 L`, { exact: false })).toBeVisible();

    // Click Edit
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.waitForURL('**/fleet/vehicles/**/edit');
    await expect(page).toHaveTitle(/Edit Vehicle/);

    // -- Update Tare Weight
    const newTareWeight = vehicle.tareWeight + 100;
    const editTareInput = page.getByLabel('Tare Weight');
    await editTareInput.clear();
    await editTareInput.fill(String(newTareWeight));
    await expect(editTareInput).toHaveValue(String(newTareWeight));

    // -- Update Camera ID
    const editedCameraId = `${vehicle.cameraId}_edited`;
    const editCameraInput = page.getByLabel('Camera ID');
    await editCameraInput.clear();
    await editCameraInput.fill(editedCameraId);
    await expect(editCameraInput).toHaveValue(editedCameraId);

    // -- Save edit
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Vehicle was saved successfully.')).toBeVisible({ timeout: 10000 });
    await page.waitForURL('**/fleet/vehicles/**');
    await expect(page).toHaveTitle(/Vehicle Details/);

    // Assert updated values on detail page
    await expect(page.getByText(`${newTareWeight.toLocaleString()} kg`)).toBeVisible();
    await expect(page.getByText(editedCameraId, { exact: false })).toBeVisible();

    console.log(`✅ Vehicle updated — Tare Weight: ${vehicle.tareWeight} → ${newTareWeight}, Camera ID: ${vehicle.cameraId} → ${editedCameraId}`);

    // -----------------------------------------------------------------------
    // Phase 5: Delete vehicle
    // -----------------------------------------------------------------------
    // Navigate back to vehicles list and search again
    await page.getByRole('link', { name: /← back|Vehicles/i }).first().click();
    await page.waitForURL('**/fleet/vehicles**');

    // Re-search to confirm still present
    const deleteSearchInput = page.getByPlaceholder('Search');
    await deleteSearchInput.fill(vehicle.name);
    await page.waitForURL(`**searchTerm=${vehicle.name}**`);

    const vehicleRowBeforeDelete = page.getByRole('row').filter({ hasText: vehicle.name });
    await expect(vehicleRowBeforeDelete).toBeVisible({ timeout: 10000 });

    // Click the trash/delete icon (last button in OPTIONS column)
    const optionButtons = vehicleRowBeforeDelete.getByRole('button');
    const deleteBtn = optionButtons.last();
    await deleteBtn.click();

    // Confirm deletion dialog
    const confirmDialog = page.getByRole('dialog');
    await expect(confirmDialog).toBeVisible();
    await expect(confirmDialog.getByText('Are you sure you want to delete this vehicle?')).toBeVisible();
    await confirmDialog.getByRole('button', { name: 'Yes' }).click();

    // Assert vehicle is removed
    await expect(page.getByText('No Vehicles Found.')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('row').filter({ hasText: vehicle.name })).toHaveCount(0);

    console.log(`✅ Vehicle '${vehicle.name}' successfully deleted and confirmed removed.`);
  });

  // -------------------------------------------------------------------------
  // Negative: duplicate vehicle name (optional guard test)
  // -------------------------------------------------------------------------
  test('Create vehicle form requires a name', async ({ page }) => {
    await navigateToVehicles(page);
    await page.getByRole('button', { name: 'Create Vehicle' }).click();
    await page.waitForURL('**/fleet/vehicles/create');

    // Attempt to save with no name filled
    await page.getByRole('button', { name: 'Save' }).click();

    // Should remain on the create page (no redirect)
    await expect(page).toHaveURL(/\/fleet\/vehicles\/create/);

    // There should be a validation error visible somewhere
    const pageContent = await page.content();
    const hasError =
      (await page.getByText(/required|cannot be blank|must not be empty/i).count()) > 0 ||
      (await page.locator('input:invalid').count()) > 0;
    expect(hasError, 'Expected a validation error when saving without a vehicle name').toBe(true);
  });
});
}
