import test, { expect } from '../fixtures/baseTest';
import { userRoleAccessMatrix } from '../../testUserStates';

let vehicleName = `AutomationTest-${Date.now()}`;
const cameraID = `CameraID-${Date.now()}`;
let deviceID = `DeviceID-${Date.now()}`;


for (const userRole of userRoleAccessMatrix.adminOnly) {
    test.describe(`Dispatch -- Route Planner tab`, () => {
        test.use({ storageState: `userStates/${userRole}UserStorageState.json` });
        test.beforeEach(async ({ routePlannerPage }) => {
            await routePlannerPage.goto();
        });

        test(`TC_01: should allow ${userRole} to create a Vehicle for Fleet`, async ({ routePlannerPage, page }) => {
            await page.getByRole('link', { name: 'Fleet' }).click();
            await page.getByRole('link', { name: 'Create Vehicle' }).click();
            await page.locator('input[name="regplate"]').click();
            await page.locator('input[name="regplate"]').fill(vehicleName);
            await page.locator('.css-1ygby3e').first().click();
            await page.getByText('Commercial', { exact: true }).click();
            await page.locator('.css-1qaem2b > .css-1ygby3e').first().click();
            await page.getByText('Refrigerator Truck', { exact: true }).click();
            await page.locator('.sc-gsNilK.cDEvvt > .css-0 > .css-1qaem2b > .css-1ygby3e').click();
            await page.locator('#react-select-8-option-0').click();
            await page.locator('input[name="tareWeight"]').click();
            await page.locator('input[name="tareWeight"]').fill('5000');
            await page.locator('input[name="maximumLoadWeight"]').click();
            await page.locator('input[name="maximumLoadWeight"]').fill('2000');
            await page.locator('div').nth(1).click();
            await page.locator('.sc-gsNilK.fRLJZO > .css-0 > .css-1qaem2b > .css-1ygby3e').first().click();
            await page.getByText('Hydrogen', { exact: true }).click();
            await page.locator('input[name="fuelTankCapacity"]').click();
            await page.locator('input[name="fuelTankCapacity"]').click();
            await page.locator('input[name="fuelTankCapacity"]').fill('890');
            await page.locator('label:nth-child(2) > .sc-hGPBjI').click();
            await page.locator('label:nth-child(3) > .sc-hGPBjI').click();
            await page.locator('input[name="deviceId"]').click();
            await page.locator('input[name="deviceId"]').fill(deviceID);
            await page.locator('.sc-gsNilK.fRLJZO > .css-0 > .css-1qaem2b > .css-1ygby3e').click();
            await page.getByText('GeoTab', { exact: true }).click();
            await page.locator('input[name="cameraDeviceId"]').click();
            await page.locator('input[name="cameraDeviceId"]').fill(cameraID);
            await page.getByRole('button', { name: 'Save' }).click();
            await page.getByText('Vehicle was saved').click();
            await page.getByRole('textbox', { name: 'Search' }).click();
            await page.getByRole('textbox', { name: 'Search' }).fill(vehicleName);
            await page.getByText('VehiclesMoreCreate Vehicle').click();
            await page.locator('body').press('ArrowDown');
            await page.locator(`//div[@title="${vehicleName}"]/parent::div//label/span`).click();
            await page.locator('div').filter({ hasText: /^Set Status$/ }).nth(4).click();
            await page.getByText('Active', { exact: true }).click();
            await page.locator('div').nth(1).click();
            await page.getByRole('button', { name: 'Delete Vehicles' }).click();
            await page.getByRole('button', { name: 'Yes' }).click();
            await expect(page.getByText('Vehicles succesfully deleted.')).toBeVisible();
        });

    });
}
