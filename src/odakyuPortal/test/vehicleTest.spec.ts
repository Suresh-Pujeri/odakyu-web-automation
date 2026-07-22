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
  });

  // -------------------------------------------------------------------------
  // Full end-to-end CRUD
  // -------------------------------------------------------------------------
  test('Create → Search → Edit → Delete a vehicle', async ({ page }) => {

    // -----------------------------------------------------------------------
    // Phase 1: Navigate to Fleet > Vehicles
    // -----------------------------------------------------------------------
    await navigateToVehicles(page);
    await expect(page.locator(`#create-vehicle-button`)).toBeVisible();

    // -----------------------------------------------------------------------
    // Phase 2: Create vehicle
    // -----------------------------------------------------------------------
    await page.locator(`#create-vehicle-button`).click();
    await page.waitForURL('**/fleet/vehicles/create');
    await expect(page).toHaveTitle(/Create Vehicle/);

    // -- Vehicle Name
    const nameInput = page.locator(`input[name="regplate"]`);
    await nameInput.fill(vehicle.name);
    await expect(nameInput).toHaveValue(vehicle.name);

    // -- Active checkbox (should already be checked)
    const activeCheckbox = page.getByLabel('Active');
    await expect(activeCheckbox).toBeChecked();

    // -- Vehicle Type dropdown → Commercial
    await page.locator(`input[id="vehicleTypeId"]`).click();
    await page.locator(`//label[contains(.,'Vehicle Type')]/parent::div//div[contains(@id,"react-select") and contains(.,'Commercial')]`).click();

    // -- Vehicle Subtype dropdown → first option (Rotate)
    await page.locator(`input[id="vehicleSubTypeId"]`).click();
    const firstSubtype = page.locator(`//label[contains(.,'Vehicle Subtype')]/parent::div//div[contains(@id,"react-select") and contains(.,'Flat Body')]`);
    await firstSubtype.click();

    // -- Service Status — leave as Available (default)
    // await expect(page.locator(`//label[contains(.,'Service Status')]/parent::div//input[contains(@id,'isAvailable')]`)).toBeVisible();
    // await page.locator(`//label[contains(.,'Service Status')]/parent::div//input[contains(@id,'isAvailable')]`).click();
    // await page.locator(`//label[contains(.,'Service Status')]/parent::div//div[contains(@id,'react-select') and contains(.,'Available')]`).click();

    // -- Operational Facility → first option
    await page.locator(`input[id="locationId"]`).click();
    const firstFacility = page.locator(`//label[contains(.,'Operational Facility')]/parent::div//div[contains(@id,'react-select') and contains(.,'')]`).first();
    const facilityName = await firstFacility.textContent();
    await firstFacility.click();

    // -- Tare Weight
    const tareWeightInput = page.locator(`input[name="tareWeight"]`);
    await tareWeightInput.fill(String(vehicle.tareWeight));
    await expect(tareWeightInput).toHaveValue(String(vehicle.tareWeight));

    // -- Maximum Load Weight
    const maxLoadInput = page.locator(`input[name="maximumLoadWeight"]`);
    await maxLoadInput.fill(String(vehicle.maxLoadWeight));
    await expect(maxLoadInput).toHaveValue(String(vehicle.maxLoadWeight));

    // -- Maximum Vehicle Weight (auto-calculated)
    const maxVehicleWeightInput = page.locator(`input[name="maximumLoadedVehicleWeight"]`);
    await expect(maxVehicleWeightInput).toHaveValue(String(vehicle.maxVehicleWeight));

    // -- Fuel Type → Regular gasoline
    await page.locator(`input[id="fuelTypeId"]`).click();
    await page.locator(`//label[contains(.,'Fuel Type')]/parent::div//div[contains(@id,"react-select") and contains(.,'Regular gasoline')]`).click();
    //await expect(page.getByLabel('Fuel Type')).toHaveValue('Regular gasoline');

    // -- Fuel Tank Capacity
    const fuelCapInput = page.locator(`input[name="fuelTankCapacity"]`);
    await fuelCapInput.fill(String(vehicle.fuelTankCapacity));
    await expect(fuelCapInput).toHaveValue(String(vehicle.fuelTankCapacity));

    // -- Device ID
    const deviceIdInput = page.locator(`input[name="deviceId"]`);
    await deviceIdInput.fill(vehicle.deviceId);
    await expect(deviceIdInput).toHaveValue(vehicle.deviceId);

    // -- Device Manufacturer → CalAmp (first option)
    await page.locator(`input[id="deviceManufacturerId"]`).click();
    const firstManufacturer = page.locator(`//label[contains(.,'Device Manufacturer')]/parent::div//div[contains(@id,"react-select") and contains(.,'GeoTab')]`);
    await firstManufacturer.click();

    // -- Camera ID
    const cameraIdInput = page.locator(`input[name="cameraDeviceId"]`);
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
    await expect(page.locator(`//div[contains(@title,'TestVehicle')]`)).toBeVisible({ timeout: 10000 });

    // Assert key columns in the row
    await expect(page.getByText('Commercial')).toBeVisible();
    await expect(page.getByText('Active')).toBeVisible();
    await expect(page.getByText('Available')).toBeVisible();
    await expect(page.getByText(vehicle.deviceId.substring(0, 7), { exact: false })).toBeVisible();

    // -----------------------------------------------------------------------
    // Phase 4: Open vehicle detail and click Edit
    // -----------------------------------------------------------------------
    // Click the details icon (first icon in OPTIONS column)
    await page.locator(`//button[contains(@id,"open-vehicle-details")]`).click();
    await page.waitForURL('**/fleet/vehicles/**');
    await expect(page).toHaveTitle(/Vehicle Details/);

    // Assert detail page shows correct data
    await expect(page.getByText(vehicle.name)).toBeVisible();
    await expect(page.getByText('Commercial')).toBeVisible();
    await expect(page.getByText('Flat Body')).toBeVisible();
    await expect(page.getByText(vehicle.deviceId)).toBeVisible();
    await expect(page.getByText(vehicle.cameraId)).toBeVisible();
    await expect(page.getByText(`${vehicle.tareWeight.toLocaleString()} kg`)).toBeVisible();
    await expect(page.getByText(`${vehicle.maxLoadWeight.toLocaleString()} kg`)).toBeVisible();
    await expect(page.getByText('Regular gasoline')).toBeVisible();
    //await expect(page.getByText(`175 L`, { exact: false })).toBeVisible();

    // Click Edit
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.waitForURL('**/fleet/vehicles/**/edit');
    await expect(page).toHaveTitle(/Edit Vehicle/);

    // -- Update Tare Weight
    const newTareWeight = vehicle.tareWeight + 100;
    const editTareInput = page.locator(`input[name="tareWeight"]`);
    await editTareInput.clear();
    await editTareInput.fill(String(newTareWeight));
    await expect(editTareInput).toHaveValue(String(newTareWeight));

    // -- Update Camera ID
    const editedCameraId = `${vehicle.cameraId}_edited`;
    const editCameraInput = page.locator(`input[name="cameraDeviceId"]`);
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

    await expect(page.locator(`//div[contains(@title,'TestVehicle')]`)).toBeVisible({ timeout: 10000 });

    // Click the trash/delete icon (last button in OPTIONS column)
    await expect(page.locator(`//button[contains(@id,'delete-vehicle')]`)).toBeVisible();
    const optionButtons = page.locator(`//button[contains(@id,'delete-vehicle')]`);
    const deleteBtn = optionButtons;
    await deleteBtn.click();

    // Confirm deletion dialog
    const confirmDialog = page.locator(`//span[contains(text(),'Are you sure you want to delete this vehicle?')]`);
    await expect(confirmDialog).toBeVisible();
    await expect(page.locator(`//button[contains(text(),'Yes')]`)).toBeVisible();
    await page.locator(`//button[contains(text(),'Yes')]`).click();

    console.log(`✅ Vehicle '${vehicle.name}' successfully deleted and confirmed removed.`);
    // Re-search to confirm still present
    const deleteSearchInputFinal = page.getByPlaceholder('Search');
    await deleteSearchInputFinal.fill(vehicle.name);
    await page.waitForURL(`**searchTerm=${vehicle.name}**`);

    // Assert vehicle is removed
    await expect(page.getByText('No Vehicles Found.')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('row').filter({ hasText: vehicle.name })).toHaveCount(0);
  });

  // -------------------------------------------------------------------------
  // Negative: duplicate vehicle name (optional guard test)
  // -------------------------------------------------------------------------
  test('Create vehicle form requires a name', async ({ page }) => {
    await navigateToVehicles(page);
    await expect(page.locator(`#create-vehicle-button`)).toBeVisible();
    await page.locator(`#create-vehicle-button`).click();
    await page.waitForURL('**/fleet/vehicles/create');

    // Attempt to save with no name filled
    await page.getByRole('button', { name: 'Save' }).click();

    // Should remain on the create page (no redirect)
    await expect(page).toHaveURL(/\/fleet\/vehicles\/create/);

    // There should be a validation error visible somewhere
    await expect(page.locator(`//label[text()='Vehicle Name']/parent::div/span`)).toContainText('You can not leave this empty.');
    await expect(page.locator(`//label[text()='Vehicle Type']/parent::div/span`)).toContainText('You can not leave this empty.');
    await expect(page.locator(`//label[text()='Vehicle Subtype']/parent::div/span`)).toContainText('You can not leave this empty.');
  });
});
}
