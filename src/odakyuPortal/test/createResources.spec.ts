import test, { expect } from '../fixtures/baseTest';
import { userRoleAccessMatrix } from '../../testUserStates';

let vehicleName = `AutomationTest-${Date.now()}`;
const phoneNumber = `9900990099`;
let driverID = `DriverID-${Date.now()}`;


for (const userRole of userRoleAccessMatrix.adminOnly) {
    test.describe(`Fleet -- Create Resources tab`, () => {
        test.use({ storageState: `userStates/${userRole}UserStorageState.json` });
        test.beforeEach(async ({ routePlannerPage }) => {
            await routePlannerPage.goto();
        });

        test(`TC_01: should allow ${userRole} to create a Vehicle for Fleet`, async ({ routePlannerPage, page }) => {
            await page.getByRole('link', { name: 'Fleet' }).click();
            await page.getByRole('link', { name: 'Resources' }).click();
            await page.getByRole('link', { name: 'Create Resource' }).click();
            await page.locator('input[name="firstName"]').click();
            await page.locator('input[name="firstName"]').fill(driverID);
            await page.locator('input[name="phoneNumber"]').click();
            await page.locator('input[name="phoneNumber"]').fill(phoneNumber);
            await page.locator('input[name="homeAddress"]').click();
            await page.locator('input[name="homeAddress"]').fill('To');
            await page.getByText('日本').click();
            await page.locator('.sc-gsNilK.cDEvvt > .css-0 > .css-1qaem2b > .css-1ygby3e').click();
            await page.locator('input#locationId').click();
            await page.locator(`//label[contains(text(),'Operational Facility')]/parent::div/descendant::div[contains(@id,"react-select")]`).first().click();
            await expect(page.locator('//input[@name="isDriver"]/parent::label/span').last()).toBeVisible();
            await page.locator('//input[@name="isDriver"]/parent::label/span').first().click();
            await expect(page.locator('//input[@name="isWorker"]/parent::label/span').last()).toBeVisible();
            await page.locator('//input[@name="isWorker"]/parent::label/span').first().click();
            await expect(page.locator('//input[@name="isSupervisor"]/parent::label/span').last()).toBeVisible();
            await page.locator('//input[@name="isSupervisor"]/parent::label/span').first().click();
           
            await page.locator('input#linkedVehicleId').click();
            await page.locator(`//label[contains(text(),'Supervisor Vehicle')]/parent::div/descendant::div[contains(@id,"react-select")]`).first().click();
            await page.locator('input[name="linkedDriverIds"]').click();
            await page.locator(`//label[contains(text(),'Assigned Drivers')]/parent::div//div/label`).first().click();
            await page.locator(`//label[contains(text(),'Assigned Drivers')]/parent::div//div/label`).last().click();
    

            await page.getByRole('button', { name: 'Apply' }).click();
            await page.locator('input[name="linkedRouteTemplateIds"]').click();
            await page.locator(`//label[contains(text(),'Assigned Routes')]/parent::div/descendant::label/span`).nth(1).click();
            await page.locator(`//label[contains(text(),'Assigned Routes')]/parent::div/descendant::label/span`).nth(3).click();
            await page.getByRole('button', { name: 'Apply' }).click();
            await page.locator('input[name="linkedVehicleIds"]').click();
            await page.locator('label').filter({ hasText: 'A N D R E I - C O M E R C I A' }).click();
            await page.getByRole('button', { name: 'Apply' }).click();
            await page.getByRole('button', { name: 'Save' }).click();
            await expect(page.getByText('Resource saved successfully.')).toBeVisible();
            await page.getByRole('textbox', { name: 'Search' }).click();
            await page.getByRole('textbox', { name: 'Search' }).fill(driverID);
            await expect( page.locator(`//div[contains(.,'${driverID}')]/parent::div/descendant::button[contains(@id,"edit-driver")]`)).toBeVisible();
            await page.locator(`//div[contains(.,'${driverID}')]/parent::div/descendant::button[contains(@id,"edit-driver")]`).click();

            await page.locator('input[name="linkedVehicleIds"]').click();
            await page.locator(`//label[contains(text(),'Assigned Vehicles')]/parent::div/descendant::label/span`).last().click();
            await page.getByRole('button', { name: 'Apply' }).click();
            await page.getByRole('button', { name: 'Save' }).click();
            await page.getByRole('textbox', { name: 'Search' }).click();
            await page.getByRole('textbox', { name: 'Search' }).fill(driverID);
            await expect( page.locator(`//div[contains(.,'${driverID}')]/parent::div/descendant::button[contains(@id,"delete-driver")]`)).toBeVisible();
            await page.locator(`//div[contains(.,'${driverID}')]/parent::div/descendant::button[contains(@id,"delete-driver")]`).click();
            //await page.getByRole('button', { name: 'Delete Resources' }).click();
            await page.getByRole('button', { name: 'Yes' }).click();
            await expect(page.getByText('Resource deleted.')).toBeVisible();
        });

    });
}
