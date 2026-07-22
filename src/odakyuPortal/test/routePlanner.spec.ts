import test, { expect } from '../fixtures/baseTest';
import { userRoleAccessMatrix } from '../../testUserStates';
import path from 'path';
import { ActionUtils } from '../../helpers/ActionUtils';

let routeName = `Commercial-${Date.now()}`;
const startingLocationOption = '4101 calloway drive';
let vehicleType = 'Commercial';
const wasteType = 'Test new waste 2';
const endingLocationOption = 'Fuel Satelitului GF';
const serviceZoneOption = 'Andrei Muresanu';
const supervisorOption = 'Chintan 123Sup';
const driverOption = 'QA driver edit Aftermerge';
let vehicleOption = 'Andrei CH Comm 1 Y';

for (const userRole of userRoleAccessMatrix.adminOnly) {
  test.describe(`Dispatch -- Route Planner tab`, () => {
    test.use({ storageState: `userStates/${userRole}UserStorageState.json` });
    test.beforeEach(async ({ routePlannerPage, loginPage }) => {
      await routePlannerPage.goto();
    });
    test(`TC_01: should allow ${userRole} to access Route Planner`, async ({ routePlannerPage }) => {
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await expect(routePlannerPage.elements.planARouteBtn).toContainText('Plan a Route');
    });
    test(`TC_02: should allow ${userRole} to create a route template for Commercial`, async ({ routePlannerPage }) => {
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.createARoute();
      await expect(routePlannerPage.elements.dailyRoute).toContainText('Daily Route');
      await expect(routePlannerPage.elements.routeTemplate).toContainText('Route Template');
      await routePlannerPage.createRouteTemplate();
      await expect(routePlannerPage.routeTemplateToggleBtn('Activate Route Template')).toBeVisible();
      await expect(routePlannerPage.routeTemplateToggleBtn('Create as daily route with 0 stops')).toBeVisible();
      await routePlannerPage.fillRouteTemplateDetails(
        routeName,
        vehicleType,
        wasteType,
        startingLocationOption,
        endingLocationOption,
        serviceZoneOption,
        supervisorOption,
        driverOption,
        vehicleOption,
      );
      await expect(routePlannerPage.elements.routeStopAddStopsHeaderText).toBeVisible();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).toBeVisible();
      await routePlannerPage.addStopsToRoute(4, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(5, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(8, 'First');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).not.toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Stop #')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Customer').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Account Status')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Service').first()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Day of Service').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Options')).toBeVisible();
      await routePlannerPage.elements.routeTemplateSaveBtn.click();
      const successMessage = await routePlannerPage.elements.routeAddStopSuccessMessage.textContent();
      expect(successMessage).toBe('The route was saved successfully.');
      await expect(routePlannerPage.elements.routeTemplateMoreBtn).toBeVisible();
      await expect(routePlannerPage.elements.editRouteTemplateBtn).toBeVisible();
      await expect(routePlannerPage.elements.changeServiceScheduleBtn).toBeVisible();
      const routeNameCopy = await routePlannerPage.elements.routeNameHeaderText.textContent();
      expect(routeNameCopy).toBe(routeName);
      await routePlannerPage.goBackToTheRoutePlannerPage();
      await routePlannerPage.searchCreatedRouteTemplate(routeName);
      //await routePlannerPage.clickOnCreatedRouteTemplate(routeName);
      await routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).click();
      await expect(routePlannerPage.routePlannerRouteTemplateCheckbox(routeName)).toBeChecked();
      //await expect(routePlannerPage.elements.routeNameHeaderText).toHaveText(routeName);
      await expect(routePlannerPage.elements.routePlannerScheduleBtn).toBeVisible();
      await routePlannerPage.scheduleRouteTemplate();
      //await expect(routePlannerPage.elements.schedulePopUpWindowText).toBeVisible();
      await routePlannerPage.confirmScheduleCreation();
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toContainText(
        'Route Templates were scheduled successfully.',
      );
    });
    test(`TC_03: should allow ${userRole} to create a route template for Residential`, async ({ routePlannerPage }) => {
      routeName = `Residential-${Date.now()}`;
      vehicleType = 'Residential';
      vehicleOption = 'Andrei CH Resi 1 Y';
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.createARoute();
      await expect(routePlannerPage.elements.dailyRoute).toContainText('Daily Route');
      await expect(routePlannerPage.elements.routeTemplate).toContainText('Route Template');
      await routePlannerPage.createRouteTemplate();
      await expect(routePlannerPage.routeTemplateToggleBtn('Activate Route Template')).toBeVisible();
      await expect(routePlannerPage.routeTemplateToggleBtn('Create as daily route with 0 stops')).toBeVisible();
      await routePlannerPage.fillRouteTemplateDetails(
        routeName,
        vehicleType,
        wasteType,
        startingLocationOption,
        endingLocationOption,
        serviceZoneOption,
        supervisorOption,
        driverOption,
        vehicleOption,
      );
      await expect(routePlannerPage.elements.routeStopAddStopsHeaderText).toBeVisible();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).toBeVisible();
      await routePlannerPage.addStopsToRoute(4, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(5, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(8, 'First');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).not.toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Stop #')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Customer').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Account Status')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Service').first()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Day of Service').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Options')).toBeVisible();
      await routePlannerPage.elements.routeTemplateSaveBtn.click();
      const successMessage = await routePlannerPage.elements.routeAddStopSuccessMessage.textContent();
      expect(successMessage).toBe('The route was saved successfully.');
      await expect(routePlannerPage.elements.routeTemplateMoreBtn).toBeVisible();
      await expect(routePlannerPage.elements.editRouteTemplateBtn).toBeVisible();
      await expect(routePlannerPage.elements.changeServiceScheduleBtn).toBeVisible();
      const routeNameCopy = await routePlannerPage.elements.routeNameHeaderText.textContent();
      expect(routeNameCopy).toBe(routeName);
      await routePlannerPage.goBackToTheRoutePlannerPage();
      await routePlannerPage.searchCreatedRouteTemplate(routeName);
      //await routePlannerPage.clickOnCreatedRouteTemplate(routeName);
      await routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).click();
      await expect(routePlannerPage.routePlannerRouteTemplateCheckbox(routeName)).toBeChecked();
      //await expect(routePlannerPage.elements.routeNameHeaderText).toHaveText(routeName);
      await expect(routePlannerPage.elements.routePlannerScheduleBtn).toBeVisible();
      await routePlannerPage.scheduleRouteTemplate();
      //await expect(routePlannerPage.elements.schedulePopUpWindowText).toBeVisible();
      await routePlannerPage.confirmScheduleCreation();
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
    });
    test(`TC_04: user should allow ${userRole} to create a route template for Delivery / Utility `, async ({
      routePlannerPage,
    }) => {
      routeName = `Delivery / Utility-${Date.now()}`;
      vehicleType = 'Delivery / Utility';
      vehicleOption = 'AprilTestSuresh';
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.createARoute();
      await expect(routePlannerPage.elements.dailyRoute).toContainText('Daily Route');
      await expect(routePlannerPage.elements.routeTemplate).toContainText('Route Template');
      await routePlannerPage.createRouteTemplate();
      await expect(routePlannerPage.routeTemplateToggleBtn('Activate Route Template')).toBeVisible();
      await expect(routePlannerPage.routeTemplateToggleBtn('Create as daily route with 0 stops')).toBeVisible();
      await routePlannerPage.fillRouteTemplateDetails(
        routeName,
        vehicleType,
        wasteType,
        startingLocationOption,
        endingLocationOption,
        serviceZoneOption,
        supervisorOption,
        driverOption,
        vehicleOption,
      );
      await expect(routePlannerPage.elements.routeStopAddStopsHeaderText).toBeVisible();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).toBeVisible();
      //await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(4, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(5, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(8, 'First');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).not.toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Stop #')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Customer').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Account Status')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Service').first()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Day of Service').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Options')).toBeVisible();
      await routePlannerPage.elements.routeTemplateSaveBtn.click();
      const successMessage = await routePlannerPage.elements.routeAddStopSuccessMessage.last().textContent();
      //expect(successMessage).toBe('The route was saved successfully.');
      expect(successMessage).toContain('1 stop successfully added. Please save the route to complete the add process.');
      await expect(routePlannerPage.elements.routeTemplateMoreBtn).toBeVisible();
      await expect(routePlannerPage.elements.editRouteTemplateBtn).toBeVisible();
      await expect(routePlannerPage.elements.changeServiceScheduleBtn).toBeVisible();
      const routeNameCopy = await routePlannerPage.elements.routeNameHeaderText.textContent();
      expect(routeNameCopy).toBe(routeName);
      await routePlannerPage.goBackToTheRoutePlannerPage();
      await routePlannerPage.searchCreatedRouteTemplate(routeName);
      //await routePlannerPage.clickOnCreatedRouteTemplate(routeName);
      await routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).click();
      await expect(routePlannerPage.routePlannerRouteTemplateCheckbox(routeName)).toBeChecked();
      //await expect(routePlannerPage.elements.routeNameHeaderText).toHaveText(routeName);
      await expect(routePlannerPage.elements.routePlannerScheduleBtn).toBeVisible();
      await routePlannerPage.scheduleRouteTemplate();
      //await expect(routePlannerPage.elements.schedulePopUpWindowText).toBeVisible();
      await routePlannerPage.confirmScheduleCreation();
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toContainText(
        'Route Templates were scheduled successfully.',
      );
    });
    test(`TC_05: should allow ${userRole} to create a route template for Delivery / Utility and add Route alert for it`, async ({
      routePlannerPage,
    }) => {
      routeName = `Delivery / Utility-${Date.now()}`;
      vehicleType = 'Delivery / Utility';
      vehicleOption = 'AprilTestSuresh';
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.createARoute();
      await expect(routePlannerPage.elements.dailyRoute).toContainText('Daily Route');
      await expect(routePlannerPage.elements.routeTemplate).toContainText('Route Template');
      await routePlannerPage.createRouteTemplate();
      await expect(routePlannerPage.routeTemplateToggleBtn('Activate Route Template')).toBeVisible();
      await expect(routePlannerPage.routeTemplateToggleBtn('Create as daily route with 0 stops')).toBeVisible();
      await routePlannerPage.fillRouteTemplateDetails(
        routeName,
        vehicleType,
        wasteType,
        startingLocationOption,
        endingLocationOption,
        serviceZoneOption,
        supervisorOption,
        driverOption,
        vehicleOption,
      );
      await expect(routePlannerPage.elements.routeStopAddStopsHeaderText).toBeVisible();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).toBeVisible();
      await routePlannerPage.addStopsToRoute(4, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(5, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(8, 'First');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).not.toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Stop #')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Customer').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Account Status')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Service').first()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Day of Service').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Options')).toBeVisible();
      expect(await routePlannerPage.elements.routeTemplateSaveBtn.isEnabled()).toBeTruthy();
      await routePlannerPage.elements.routeTemplateSaveBtn.click();
      const successMessage = await routePlannerPage.elements.routeAddStopSuccessMessage.textContent();
      expect(successMessage).toBe('The route was saved successfully.');
      await expect(routePlannerPage.elements.routeTemplateMoreBtn).toBeVisible();
      await expect(routePlannerPage.elements.editRouteTemplateBtn).toBeVisible();
      await expect(routePlannerPage.elements.changeServiceScheduleBtn).toBeVisible();
      const routeNameCopy = await routePlannerPage.elements.routeNameHeaderText.textContent();
      expect(routeNameCopy).toBe(routeName);
      await routePlannerPage.page.getByRole('button', { name: 'More' }).click();
      await routePlannerPage.page.getByRole('button', { name: 'Add Route Alert' }).click();
      await routePlannerPage.page.locator('input[name="pinnedAddress"]').click();

      await routePlannerPage.page.getByRole('region', { name: 'Map' }).nth(1).click({
        position: {
          x: 449,
          y: 178
        }
      });
      await routePlannerPage.page.locator('input[name="pinnedAddress"]').fill('日本、〒194-0022 東京都町田市森野１丁目２２ 小田急シティビル町田');
      await routePlannerPage.page.locator(`//span[contains(.,'日本、〒194-0022 東京都町田市森野１')]`).click();
      await routePlannerPage.page.locator('div').filter({ hasText: 'ActiveTitleRoute Alert' }).nth(3).click();
      await routePlannerPage.page.locator('input[name="title"]').click();
      await routePlannerPage.page.locator('input[name="title"]').fill('Test Alerts validation');
      await routePlannerPage.page.getByRole('textbox', { name: 'Proximity' }).click();
      await routePlannerPage.page.getByRole('textbox', { name: 'Proximity' }).fill('100');
      await routePlannerPage.page.locator('//div[contains(text(),"Confirmation")]').last().click();
      await routePlannerPage.page.getByText('Require Driver Acknowledgement', { exact: true }).first().click();
      await routePlannerPage.page.locator('.sc-ciFQTS.bwvbDb > .sc-kJpAUB').click();
      await routePlannerPage.page.locator('textarea[name="description"]').click();
      await routePlannerPage.page.locator('textarea[name="description"]').fill('This is test alert validation for the created route template');
      await routePlannerPage.page.getByRole('button', { name: 'Save' }).click();
    });

    test(`TC_06: should allow ${userRole} to create a route template for Delivery / Utility and add Delete Location`, async ({
      routePlannerPage,
    }) => {
      routeName = `Delivery / Utility-${Date.now()}`;
      vehicleType = 'Delivery / Utility';
      vehicleOption = 'AprilTestSuresh';
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.createARoute();
      await expect(routePlannerPage.elements.dailyRoute).toContainText('Daily Route');
      await expect(routePlannerPage.elements.routeTemplate).toContainText('Route Template');
      await routePlannerPage.createRouteTemplate();
      await expect(routePlannerPage.routeTemplateToggleBtn('Activate Route Template')).toBeVisible();
      await expect(routePlannerPage.routeTemplateToggleBtn('Create as daily route with 0 stops')).toBeVisible();
      await routePlannerPage.fillRouteTemplateDetails(
        routeName,
        vehicleType,
        wasteType,
        startingLocationOption,
        endingLocationOption,
        serviceZoneOption,
        supervisorOption,
        driverOption,
        vehicleOption,
      );
      await expect(routePlannerPage.elements.routeStopAddStopsHeaderText).toBeVisible();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).toBeVisible();
      await routePlannerPage.addStopsToRoute(4, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(5, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(8, 'First');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).not.toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Stop #')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Customer').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Account Status')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Service').first()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Day of Service').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Options')).toBeVisible();
      await routePlannerPage.elements.routeTemplateSaveBtn.click();
      const successMessage = await routePlannerPage.elements.routeAddStopSuccessMessage.textContent();
      expect(successMessage).toBe('The route was saved successfully.');
      await expect(routePlannerPage.elements.routeTemplateMoreBtn).toBeVisible();
      await expect(routePlannerPage.elements.editRouteTemplateBtn).toBeVisible();
      await expect(routePlannerPage.elements.changeServiceScheduleBtn).toBeVisible();
      const routeNameCopy = await routePlannerPage.elements.routeNameHeaderText.textContent();
      expect(routeNameCopy).toBe(routeName);
      await routePlannerPage.page.locator(`#back-button`).click();
      await routePlannerPage.searchCreatedRouteTemplate(routeName);
      await routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).click();
      await expect(routePlannerPage.routePlannerRouteTemplateCheckbox(routeName)).toBeChecked();
      await expect(routePlannerPage.elements.routePlannerScheduleBtn).toBeVisible();
      await expect(routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`)).toBeVisible();
      await routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`).click();
      await expect(routePlannerPage.page.locator(`#edit-route-template-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#edit-route-template-button`).click();
      await expect(routePlannerPage.page.locator(`button span svg[preserveAspectRatio="xMidYMid meet"] path[fill="currentColor"]`).nth(0)).toBeVisible(); // dropdown is open

      await routePlannerPage.page.locator(`button span svg[preserveAspectRatio="xMidYMid meet"] path[fill="currentColor"]`).nth(0).click(); // close the dropdown
      await expect(routePlannerPage.page.locator(`//*[text()='1 stop successfully deleted. Please save the route to complete the deletion process.']`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[text()='Save']`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[text()='Save']`).click();
      await expect(routePlannerPage.page.locator(`//*[text()='The route was saved successfully.']`)).toBeVisible();

    });
    test(`TC_07: should allow ${userRole} to create a route template for Delivery / Utility and add Delete Service`, async ({
      routePlannerPage,
    }) => {
      routeName = `Delivery / Utility-${Date.now()}`;
      vehicleType = 'Delivery / Utility';
      vehicleOption = 'AprilTestSuresh';
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.createARoute();
      await expect(routePlannerPage.elements.dailyRoute).toContainText('Daily Route');
      await expect(routePlannerPage.elements.routeTemplate).toContainText('Route Template');
      await routePlannerPage.createRouteTemplate();
      await expect(routePlannerPage.routeTemplateToggleBtn('Activate Route Template')).toBeVisible();
      await expect(routePlannerPage.routeTemplateToggleBtn('Create as daily route with 0 stops')).toBeVisible();
      await routePlannerPage.fillRouteTemplateDetails(
        routeName,
        vehicleType,
        wasteType,
        startingLocationOption,
        endingLocationOption,
        serviceZoneOption,
        supervisorOption,
        driverOption,
        vehicleOption,
      );
      await expect(routePlannerPage.elements.routeStopAddStopsHeaderText).toBeVisible();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).toBeVisible();
      await routePlannerPage.addStopsToRoute(4, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(5, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(8, 'First');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).not.toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Stop #')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Customer').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Account Status')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Service').first()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Day of Service').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Options')).toBeVisible();
      await routePlannerPage.elements.routeTemplateSaveBtn.click();
      const successMessage = await routePlannerPage.elements.routeAddStopSuccessMessage.textContent();
      expect(successMessage).toBe('The route was saved successfully.');
      await expect(routePlannerPage.elements.routeTemplateMoreBtn).toBeVisible();
      await expect(routePlannerPage.elements.editRouteTemplateBtn).toBeVisible();
      await expect(routePlannerPage.elements.changeServiceScheduleBtn).toBeVisible();
      const routeNameCopy = await routePlannerPage.elements.routeNameHeaderText.textContent();
      expect(routeNameCopy).toBe(routeName);
      await routePlannerPage.page.locator(`#back-button`).click();
      await routePlannerPage.searchCreatedRouteTemplate(routeName);
      await routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).click();
      await expect(routePlannerPage.routePlannerRouteTemplateCheckbox(routeName)).toBeChecked();
      await expect(routePlannerPage.elements.routePlannerScheduleBtn).toBeVisible();
      await expect(routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`)).toBeVisible();
      await routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`).click();
      await expect(routePlannerPage.page.locator(`#edit-route-template-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#edit-route-template-button`).click();
      await expect(routePlannerPage.page.locator(`button span svg[preserveAspectRatio="xMidYMid meet"] path[fill="currentColor"]`).nth(0)).toBeVisible(); // dropdown is open

      await routePlannerPage.page.locator(`button span svg[preserveAspectRatio="xMidYMid meet"] path[fill="currentColor"]`).nth(0).click(); // close the dropdown
      await expect(routePlannerPage.page.locator(`//*[text()='1 stop successfully deleted. Please save the route to complete the deletion process.']`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[text()='Save']`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[text()='Save']`).click();
      await expect(routePlannerPage.page.locator(`//*[text()='The route was saved successfully.']`)).toBeVisible();

    });
    test(`TC_08: System should allow ${userRole} to edit, Save and Delete Service for existing route templates`, async ({
      routePlannerPage,
    }) => {
      routeName = `Delivery / Utility-${Date.now()}`;
      vehicleType = 'Delivery / Utility';
      vehicleOption = 'AprilTestSuresh';
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.createARoute();
      await expect(routePlannerPage.elements.dailyRoute).toContainText('Daily Route');
      await expect(routePlannerPage.elements.routeTemplate).toContainText('Route Template');
      await routePlannerPage.createRouteTemplate();
      await expect(routePlannerPage.routeTemplateToggleBtn('Activate Route Template')).toBeVisible();
      await expect(routePlannerPage.routeTemplateToggleBtn('Create as daily route with 0 stops')).toBeVisible();
      await routePlannerPage.fillRouteTemplateDetails(
        routeName,
        vehicleType,
        wasteType,
        startingLocationOption,
        endingLocationOption,
        serviceZoneOption,
        supervisorOption,
        driverOption,
        vehicleOption,
      );
      await expect(routePlannerPage.elements.routeStopAddStopsHeaderText).toBeVisible();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).toBeVisible();
      await routePlannerPage.addStopsToRoute(4, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(5, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await routePlannerPage.addStopsToRoute(8, 'First');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
      await routePlannerPage.elements.clsoeSuccessMessagewindow.click();
      await expect(routePlannerPage.elements.thereArenoRouteStopsMessage).not.toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Stop #')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Customer').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Account Status')).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Service').first()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Day of Service').last()).toBeVisible();
      await expect(routePlannerPage.routeStopTableColumnHeader('Options')).toBeVisible();
      await routePlannerPage.elements.routeTemplateSaveBtn.click();
      const successMessage = await routePlannerPage.elements.routeAddStopSuccessMessage.textContent();
      expect(successMessage).toBe('The route was saved successfully.');
      await expect(routePlannerPage.elements.routeTemplateMoreBtn).toBeVisible();
      await expect(routePlannerPage.elements.editRouteTemplateBtn).toBeVisible();
      await expect(routePlannerPage.elements.changeServiceScheduleBtn).toBeVisible();
      const routeNameCopy = await routePlannerPage.elements.routeNameHeaderText.textContent();
      expect(routeNameCopy).toBe(routeName);
      await routePlannerPage.page.locator(`#back-button`).click();
      await routePlannerPage.searchCreatedRouteTemplate(routeName);
      await routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).click();
      await expect(routePlannerPage.routePlannerRouteTemplateCheckbox(routeName)).toBeChecked();
      await expect(routePlannerPage.elements.routePlannerScheduleBtn).toBeVisible();
      await expect(routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`)).toBeVisible();
      await routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`).click();
      await expect(routePlannerPage.page.locator(`#edit-route-template-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#edit-route-template-button`).click();
      await expect(routePlannerPage.page.locator(`button span svg[preserveAspectRatio="xMidYMid meet"] path[fill="currentColor"]`).nth(1)).toBeVisible(); // dropdown is open

      await routePlannerPage.page.locator(`button span svg[preserveAspectRatio="xMidYMid meet"] path[fill="currentColor"]`).nth(1).click(); // close the dropdown
      await expect(routePlannerPage.page.locator(`//h2[contains(.,'Edit service')]`)).toBeVisible();
      await routePlannerPage.page.locator(`#edit-service-account-no`).fill('Updated edit service');
      await routePlannerPage.page.locator(`#edit-service-save-button`).click();
      await expect(routePlannerPage.page.locator(`//div[@color="success"]/div[contains(.,'Service saved.')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[text()='Save']`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[text()='Save']`).click();
      await expect(routePlannerPage.page.locator(`//*[text()='The route was saved successfully.']`)).toBeVisible();

    });
    test(`TC_09: Click on save Button for the new Route template without adding require field value and verify the mandatory error messages for the Route Name, Days of Service and waste Type`, async ({
      routePlannerPage,
    }) => {
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.createARoute();
      await expect(routePlannerPage.elements.dailyRoute).toContainText('Daily Route');
      await expect(routePlannerPage.elements.routeTemplate).toContainText('Route Template');
      await routePlannerPage.createRouteTemplate();
      await expect(routePlannerPage.routeTemplateToggleBtn('Activate Route Template')).toBeVisible();
      await expect(routePlannerPage.routeTemplateToggleBtn('Create as daily route with 0 stops')).toBeVisible();
      await routePlannerPage.elements.routeTemplateSaveBtn.click();
      const routeNameErrorMessage = await routePlannerPage.page.locator(`//label[contains(.,'Route Name')]/parent::div/span`).textContent();
      expect(routeNameErrorMessage).toBe('You can not leave this empty.');
      const wasteTypeErrorMessage = await routePlannerPage.page.locator(`//label[contains(.,'Waste Type')]/parent::div/span`).textContent();
      expect(wasteTypeErrorMessage).toBe('You can not leave this empty.');
      const daysOfServiceErrorMessage = await routePlannerPage.page.locator(`//label[contains(.,'Days of Service')]/parent::div/span`).textContent();
      expect(daysOfServiceErrorMessage).toBe('You can not leave this empty.');
      const vehicleTypeErrorMessage = await routePlannerPage.page.locator(`//label[contains(.,'Vehicle Type')]/parent::div/span`).textContent();
      expect(vehicleTypeErrorMessage).toBe('You can not leave this empty.');
    });
    test(`TC_10: Verify the Save button for the new Route Template with only mandatory field values `, async ({
      routePlannerPage,
    }) => {
      routeName = `Delivery / Utility-${Date.now()}`;
      vehicleType = 'Delivery / Utility';
      vehicleOption = 'AprilTestSuresh';
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.createARoute();
      await expect(routePlannerPage.elements.dailyRoute).toContainText('Daily Route');
      await expect(routePlannerPage.elements.routeTemplate).toContainText('Route Template');
      await routePlannerPage.createRouteTemplate();
      await expect(routePlannerPage.routeTemplateToggleBtn('Activate Route Template')).toBeVisible();
      await expect(routePlannerPage.routeTemplateToggleBtn('Create as daily route with 0 stops')).toBeVisible();
      await routePlannerPage.fillRouteTemplateDetailsFormandatory(
        routeName,
        vehicleType,
        wasteType,
      );

      await routePlannerPage.elements.routeTemplateSaveBtn.click();
      const successMessage = await routePlannerPage.elements.routeAddStopSuccessMessage.textContent();
      expect(successMessage).toBe('The route was saved successfully.');
    });
    test(`TC_11: Switch to different Vendor and validate Route Sequence functionality `, async ({
      routePlannerPage, loginPage
    }) => {
      await expect(routePlannerPage.page.locator(`#vendor-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#vendor-button`).click();
      await expect(loginPage.page.locator(`#select-default-vendor-field`)).toBeVisible();
      await loginPage.page.locator(`#select-default-vendor-field`).click();
      //await loginPage.page.locator(`#select-default-vendor-field`).fill('BelgaumSmartCityQAA')
      await loginPage.page.locator(`//div[contains(text(),'BelgaumSmartCityQAA')]`).click();
      await routePlannerPage.page.locator(`#select-vendor-button`).click();
      const routeName = 'BelgaumQARouteTemplate2';
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.searchCreatedRouteTemplateForSwitchedVendor(routeName);
      await routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).click();
      await expect(routePlannerPage.routePlannerRouteTemplateCheckbox(routeName)).toBeChecked();
      await expect(routePlannerPage.elements.routePlannerScheduleBtn).toBeVisible();

      // Verify route template visibility
      //await expect(routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`).first()).toBeVisible();
      // Click the stops indicator
      await routePlannerPage.page.locator(`//div[contains(@id,'route-template-15356-no-of-stops')]/span[contains(.,'27')]`).click();

      // Corrected condition: Evaluate visibility as a boolean
      const isSaveButtonVisible = await routePlannerPage.page.locator(`//button[text()='Save Stop Sequence']`).isVisible();

      if (isSaveButtonVisible) {
        // Handle saving the sequence
        await routePlannerPage.page.locator(`//button[text()='Save Stop Sequence']`).click();

        // Verify confirmation dialog and accept
        await expect(routePlannerPage.page.locator(`//span[text()='Do you want to regenerate the travel path based on the new sequence?']`)).toBeVisible();
        await expect(routePlannerPage.page.locator(`//button[text()='Yes']`)).toBeVisible();
        await routePlannerPage.page.locator(`//button[text()='Yes']`).click();

        // Verify success toast/message
        await expect(routePlannerPage.page.locator(`//*[text()='The route was saved successfully.']`)).toBeVisible();
      } else {
        // Fallback if save button is absent
        await routePlannerPage.page.locator(`#back-button`).click();
      }
      await expect(routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`)).toBeVisible();
      //await routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`).first().click();
      await routePlannerPage.page.locator(`//div[contains(@id,'route-template-15356-no-of-stops')]/span[contains(.,'27')]`).click();
      await routePlannerPage.page.reload();
      await expect(routePlannerPage.page.locator(`//span[contains(.,'Next Service Date:')]/parent::div//span`).last()).toBeVisible();
      await expect(routePlannerPage.page.locator(`//span[contains(.,'Next Service Date:')]/parent::div//div`)).toBeVisible();
      await routePlannerPage.page.locator(`//span[contains(.,'Next Service Date:')]/parent::div//div`).click();
      await expect(routePlannerPage.page.locator(`button g[fill-rule="evenodd"]`).last()).toBeVisible();
      await routePlannerPage.page.locator(`button g[fill-rule="evenodd"]`).last().click();

      await expect(routePlannerPage.page.locator('#more-button-more-button')).toBeVisible();
      await routePlannerPage.page.locator('#more-button-more-button').click();
      await expect(routePlannerPage.page.locator('#add-route-alert-button')).toBeVisible();
      await expect(routePlannerPage.page.locator('#export-route-template-xlsx-button')).toBeVisible();
      await expect(routePlannerPage.page.locator('#export-route-template-csv-button')).toBeVisible();
      await expect(routePlannerPage.page.locator('#sequence-route-button')).toBeVisible();
      await routePlannerPage.page.locator('#sequence-route-button').click();
      await expect(routePlannerPage.page.locator(`//span[contains(text(),'Triggering this action will mark your route up for sequencing. Do you wish to proceed?')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[text()='Yes']`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[text()='Yes']`).click();
      await expect(routePlannerPage.page.locator(`//h2[text()='Route Sequencing']`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//span[text()='Max Route Time (hours)']/parent::div/following-sibling::div//input[@value="10"]`)).toBeVisible();
      await expect(routePlannerPage.page.locator('#cancel-sequence-route-button')).toBeVisible();
      await expect(routePlannerPage.page.locator('#confirm-sequence-route-button')).toBeVisible();
      await routePlannerPage.page.locator('#confirm-sequence-route-button').click();
      await expect(routePlannerPage.page.locator(`//div[text()='Route Sequence Request is Processing']`)).toBeVisible();
      await routePlannerPage.searchCreatedRouteTemplateForSwitchedVendor(routeName);
      await routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).first().click();
      await expect(routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).first()).toBeChecked();
      await expect(routePlannerPage.elements.routePlannerScheduleBtn).toBeVisible();
      await expect(routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`).first()).toBeVisible();
      // 1. Define locators
      const pendingStatus = routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/button//span[text()='Route Sequence Pending']`);
      const completeStatus = routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/button//span[@color="success" and text()='Route Sequence Complete']`);

      // 2. Ensure the "Pending" status is initially visible
      await expect(pendingStatus).toBeEnabled();
      await routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`).first().click();
      await expect(routePlannerPage.page.locator(`//span[contains(.,'This route is currently being sequenced. If you continue to the route it will cancel the sequence request. Do you want to continue?')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[text()='No']`)).toBeVisible();
      expect(routePlannerPage.page.locator(`//button[text()='Yes']`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[text()='No']`).click();
      // 3. Dynamic do-while loop using flags
      const timeoutMs = 120000; // 60 seconds maximum wait time
      const startTime = Date.now();
      let isCompleteFound = false;
      let withinTimeLimit = true;

      do {
        // Check if the status has transitioned to complete
        isCompleteFound = await completeStatus.isVisible();

        // Evaluate if we still have time left
        withinTimeLimit = (Date.now() - startTime < timeoutMs);

        // Only reload if we haven't found the element AND we still have time left
        if (!isCompleteFound && withinTimeLimit) {
          await routePlannerPage.page.reload();
          await routePlannerPage.page.waitForLoadState('domcontentloaded');
          await routePlannerPage.page.waitForTimeout(1000); // 1-second throttle between reloads
        }

      } while (!isCompleteFound && withinTimeLimit);

      // 4. Final strict assertion to verify success
      await expect(completeStatus).toBeEnabled({ timeout: 1000 });
      await routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`).first().click();
      await expect(routePlannerPage.page.locator(`//button[text()='Cancel Sequence Updates']`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[text()='Save Stop Sequence']`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[text()='Save Stop Sequence']`).click();
      await expect(routePlannerPage.page.locator(`//span[text()='Do you want to regenerate the travel path based on the new sequence?']`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[text()='Yes']`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[text()='Yes']`).click();
      await expect(routePlannerPage.page.locator(`//*[text()='The route was saved successfully.']`)).toBeVisible();
    });
    test(`TC_11A: Move the collection points from original position to some other postions and save it Verify that modifying and saving the position of a collection waypoint updates its location data and successfully synchronizes all associated service contract locations. `, async ({
      routePlannerPage, loginPage
    }) => {
      await expect(routePlannerPage.page.locator(`#vendor-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#vendor-button`).click();
      await expect(loginPage.page.locator(`#select-default-vendor-field`)).toBeVisible();
      await loginPage.page.locator(`#select-default-vendor-field`).click();
      await loginPage.page.locator(`//div[contains(text(),'BelgaumSmartCityQAA')]`).click();
      await routePlannerPage.page.locator(`#select-vendor-button`).click();
      const routeName = 'BelgaumQARouteTemplate';
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.searchCreatedRouteTemplateForSwitchedVendor(routeName);
      await routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).first().click();
      await expect(routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).first()).toBeChecked();
      await expect(routePlannerPage.elements.routePlannerScheduleBtn).toBeVisible();

      await expect(routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`).first()).toBeVisible();
      await routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`).first().click();
      await routePlannerPage.page.reload();
      await expect(routePlannerPage.page.locator(`//a[contains(@id, 'edit-pickup-locations-button')]`)).toBeVisible();
      await routePlannerPage.page.locator(`//a[contains(@id, 'edit-pickup-locations-button')]`).click();
      await expect(routePlannerPage.page.locator(`//h1[contains(., 'Edit Pickup Locations')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(., 'Individual Points')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(., 'Collection Points')]`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[contains(., 'Collection Points')]`).click();
      await expect(routePlannerPage.page.locator(`//button[contains(., 'Hide Instructions')]`)).toBeVisible();
    });
    test(`TC_12: Verify the Map filters for the Route alerts, Geo fences, map layers on newly created Route template `, async ({
      routePlannerPage, loginPage
    }) => {
      await expect(routePlannerPage.page.locator(`#vendor-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#vendor-button`).click();
      await expect(loginPage.page.locator(`#select-default-vendor-field`)).toBeVisible();
      await loginPage.page.locator(`#select-default-vendor-field`).click();
      await loginPage.page.locator(`//div[contains(text(),'BelgaumSmartCityQAA')]`).click();
      await routePlannerPage.page.locator(`#select-vendor-button`).click();
      const routeName = 'BelgaumQARouteTemplate';
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.searchCreatedRouteTemplateForSwitchedVendor(routeName);
      await routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).first().click();
      await expect(routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).first()).toBeChecked();
      await expect(routePlannerPage.elements.routePlannerScheduleBtn).toBeVisible();

      await expect(routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`).first()).toBeVisible();
      await routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`).first().click();
      await routePlannerPage.page.reload();
      await expect(routePlannerPage.page.locator(`button g[fill-rule="evenodd"][stroke-linecap="square"]`)).toBeVisible();
      await routePlannerPage.page.locator(`button g[fill-rule="evenodd"][stroke-linecap="square"]`).click();
      await routePlannerPage.page.locator('.sc-lajtew').first().click();

      await routePlannerPage.page.getByText('Route Alerts').click();
      await routePlannerPage.page.getByText('Map Filters').click();

      await routePlannerPage.page.locator('//span[contains(.,"Travel Path")]').click();
      await routePlannerPage.page.getByRole('button').filter({ hasText: 'Edit Path' }).click();
      await routePlannerPage.page.locator('#travelPathEditorMap > div:nth-child(4) > .sc-cBsmfy.kJUIGB > .sc-eSRRmr > .sc-hBUSln').click();
      await routePlannerPage.page.locator('.sc-fKVqWL.kTpocF > .sc-hGPBjI').click();
      await routePlannerPage.page.locator('.sc-kJpAUB').click();
      //await routePlannerPage.page.locator('div:nth-child(5) > .sc-nBRWj > .sc-lajtew').click();
      await routePlannerPage.page.locator('.sc-hKAakq.frOSgg > .sc-llYSUQ > .sc-cxpSdN > label:nth-child(3) > .sc-hGPBjI').click();

      await routePlannerPage.page.getByRole('button', { name: 'Apply' }).nth(1).click();
      await routePlannerPage.page.locator('#travelPathEditorMap > div:nth-child(4) > .sc-cBsmfy.kJUIGB > .sc-eSRRmr > .sc-hBUSln').click();
      await routePlannerPage.page.getByRole('button', { name: 'Apply' }).nth(1).click();
      await routePlannerPage.page.goto('https://hauler.qa.ap.odakyu.smartcity.routeware.com/routes/route-templates/15347');
      await routePlannerPage.page.locator(`button g[fill-rule="evenodd"][stroke-linecap="square"]`).nth(1).click();
      await routePlannerPage.page.getByRole('button', { name: 'No' }).click();
      await routePlannerPage.page.getByRole('button', { name: 'Edit Segment Type' }).click();
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 722,
          y: 219
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 868,
          y: 130
        }
      });
      await routePlannerPage.page.locator(`button g[fill-rule="evenodd"][stroke-linecap="square"]`).nth(1).click();
      //await routePlannerPage.page.getByLabel('Close popup').click();
      await routePlannerPage.page.getByRole('button', { name: 'Edit Path' }).click();
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 755,
          y: 187
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 864,
          y: 131
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 741,
          y: 119
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 631,
          y: 246
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 557,
          y: 135
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 1051,
          y: 172
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 725,
          y: 477
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 699,
          y: 121
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 460,
          y: 144
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 902,
          y: 124
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 620,
          y: 228
        }
      });
      await routePlannerPage.page.getByText('Pickup', { exact: true }).click();
      await routePlannerPage.page.getByLabel('Close popup').click();

      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 670,
          y: 137
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 835,
          y: 313
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 606,
          y: 426
        }
      });

      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 471,
          y: 190
        }
      });

      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 618,
          y: 164
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 620,
          y: 170
        }
      });

      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 604,
          y: 81
        }
      });
      await routePlannerPage.page.getByRole('button', { name: 'Finish Selection' }).click();

      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 478,
          y: 298
        }
      });
      await routePlannerPage.page.locator('#travelPathEditorMap').getByRole('region', { name: 'Map' }).click({
        position: {
          x: 473,
          y: 300
        }
      });
      await routePlannerPage.page.getByRole('button', { name: 'Finish Selection' }).click();

      await routePlannerPage.page.getByRole('button', { name: 'Yes' }).click();
      await routePlannerPage.page.locator('.sc-cBsmfy.jXPOrm > div:nth-child(4) > .sc-hBUSln').click();
      await routePlannerPage.page.getByRole('button', { name: 'Yes' }).click();


      await routePlannerPage.page.getByRole('button').filter({ hasText: 'Build Path' }).click();
      await routePlannerPage.page.getByRole('button', { name: 'From Breadcrumbs', exact: true }).click();
      await routePlannerPage.page.locator('.css-1qaem2b').click();
      await routePlannerPage.page.getByText('06/08/2026', { exact: true }).click();
      await routePlannerPage.page.locator('div').filter({ hasText: /^06\/08\/2026$/ }).first().click();
      await routePlannerPage.page.getByText('06/03/2026', { exact: true }).click();
      await routePlannerPage.page.locator('div').filter({ hasText: /^06\/03\/2026$/ }).first().click();
      await routePlannerPage.page.getByText('06/17/2026', { exact: true }).click();
      await routePlannerPage.page.locator('div').filter({ hasText: /^06\/17\/2026$/ }).first().click();
      await routePlannerPage.page.getByText('06/22/2026', { exact: true }).click();
      await routePlannerPage.page.getByText('There are not enough').click();
      await routePlannerPage.page.locator('.sc-fyrocj').click();
      await routePlannerPage.page.getByRole('button', { name: 'Yes' }).click();

    });
    test(`TC_13: Verify export functionality for the both xlsx and CSV filed `, async ({
      routePlannerPage, loginPage
    }) => {
      await expect(routePlannerPage.page.locator(`#vendor-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#vendor-button`).click();
      await expect(loginPage.page.locator(`#select-default-vendor-field`)).toBeVisible();
      await loginPage.page.locator(`#select-default-vendor-field`).click();
      await loginPage.page.locator(`//div[contains(text(),'BelgaumSmartCityQAA')]`).click();
      await routePlannerPage.page.locator(`#select-vendor-button`).click();
      const routeName = 'BelgaumQARouteTemplate1';
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.searchCreatedRouteTemplateForSwitchedVendor(routeName);
      await routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).click();
      await expect(routePlannerPage.routePlannerRouteTemplateCheckbox(routeName)).toBeChecked();
      await expect(routePlannerPage.elements.routePlannerScheduleBtn).toBeVisible();

      await expect(routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`)).toBeVisible();
      await routePlannerPage.page.locator(`//div[contains(@id,'route-template')]/div[contains(.,'${routeName}')]`).click();
      await routePlannerPage.page.reload();
      await expect(routePlannerPage.page.locator(`//a[contains(@id, 'edit-pickup-locations-button')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator('#more-button-more-button')).toBeVisible();
      await routePlannerPage.page.locator('#more-button-more-button').click();
      await expect(routePlannerPage.page.locator('#add-route-alert-button')).toBeVisible();
      await expect(routePlannerPage.page.locator('#export-route-template-xlsx-button')).toBeVisible();
      await expect(routePlannerPage.page.locator('#sequence-route-button')).toBeVisible();
      await routePlannerPage.page.locator('#export-route-template-xlsx-button').click();
      await routePlannerPage.page.locator('#more-button-more-button').click();
      await expect(routePlannerPage.page.locator('#export-route-template-csv-button')).toBeVisible();
      await routePlannerPage.page.locator('#export-route-template-csv-button').click();
    });

    test(`TC_14: Verify the download of the exported XLSX file from the Route Planner page under More Options.`, async ({
      routePlannerPage, loginPage
    }) => {
      await expect(routePlannerPage.page.locator(`#vendor-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#vendor-button`).click();
      await expect(loginPage.page.locator(`#select-default-vendor-field`)).toBeVisible();
      await loginPage.page.locator(`#select-default-vendor-field`).click();
      await loginPage.page.locator(`//div[contains(text(),'BelgaumSmartCityQAA')]`).click();
      await routePlannerPage.page.locator(`#select-vendor-button`).click();
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Route Scheduler')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#undefined-more-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#undefined-more-button`).click();
      await expect(routePlannerPage.page.locator(`#upload-job-button`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#export-route-templates-button-xlsx`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#export-route-templates-button-csv`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#schedule-all-route-templates-button`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#service-zones-button`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#holiday-planner-button`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#route-template-builder-button`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#delay-upcoming-service-schedule-button`)).toBeVisible();
      const downloadPromise = routePlannerPage.page.waitForEvent('download');
      await routePlannerPage.page.locator(`#export-route-templates-button-xlsx`).click();
      const download = await downloadPromise;
      const fileName = download.suggestedFilename();
      const savePath = path.join(__dirname, 'downloads', fileName);
      await download.saveAs(savePath);
      await routePlannerPage.page.locator(`#undefined-more-button`).click();
      await routePlannerPage.page.locator(`#export-route-templates-button-csv`).click();
    });
    test(`TC_15: Verify the Route Scheduler functionality `, async ({
      routePlannerPage, loginPage
    }) => {
      await expect(routePlannerPage.page.locator(`#vendor-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#vendor-button`).click();
      await expect(loginPage.page.locator(`#select-default-vendor-field`)).toBeVisible();
      await loginPage.page.locator(`#select-default-vendor-field`).click();
      await loginPage.page.locator(`//div[contains(text(),'BelgaumSmartCityQAA')]`).click();
      await routePlannerPage.page.locator(`#select-vendor-button`).click();
      const routeName = 'BelgaumQARouteTemplate';
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await routePlannerPage.searchCreatedRouteTemplateForSwitchedVendor(routeName);
      await routePlannerPage.routePlannerRouteTemplateCheckbox(routeName).first().click();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Route Scheduler')]`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[contains(.,'Route Scheduler')]`).click();
      await expect(routePlannerPage.page.locator(`//h1[contains(.,'Route Scheduler')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#undefined-more-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#undefined-more-button`).click();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Service Zones')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Schedule All...')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Route Template Builder (Beta)')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Export Reoccurring Routes')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Export Daily Routes')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Job Upload')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Holiday Planner')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Operational View')]`)).toBeVisible();
      await routePlannerPage.page.locator(`#undefined-more-button`).click();
      await expect(routePlannerPage.page.locator(`//span[contains(.,'Active Routes Only')]`)).toBeVisible();

      await expect(routePlannerPage.page.locator(`//button[contains(.,'Route Planner')]`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[contains(.,'Route Planner')]`).click();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Route Scheduler')]`)).toBeVisible();
    });
    test(`TC_16: Verify the Upload Job functionality for Route Planner via Excel file and validate the uploaded jobs `, async ({
      routePlannerPage, loginPage
    }) => {
      await expect(routePlannerPage.page.locator(`#vendor-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#vendor-button`).click();
      await expect(loginPage.page.locator(`#select-default-vendor-field`)).toBeVisible();
      await loginPage.page.locator(`#select-default-vendor-field`).click();
      await loginPage.page.locator(`//div[contains(text(),'BelgaumSmartCityQAA')]`).click();
      await routePlannerPage.page.locator(`#select-vendor-button`).click();
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Route Scheduler')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#undefined-more-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#undefined-more-button`).click();
      await expect(routePlannerPage.page.locator(`#upload-job-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#upload-job-button`).click();
      //await expect(routePlannerPage.page.locator(`//h2[contains(.,'Job upload')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Choose File')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Download a sample file')]`)).toBeVisible();
      //download the sample file and upload it
      const downloadPromise = routePlannerPage.page.waitForEvent('download');
      await routePlannerPage.page.locator(`//button[contains(.,'Download a sample file')]`).click();
      const download = await downloadPromise;
      const fileName = download.suggestedFilename();
      const savePath = path.join(__dirname, 'downloads', fileName);
      await download.saveAs(savePath);
      //upload the downloaded file
      const filePath = path.join(__dirname, 'downloads', 'Job Upload Sample Template.xlsx');
      await routePlannerPage.page.setInputFiles('input[type="file"]', filePath);
      //verify the uploaded file name and status
      await routePlannerPage.page.locator(`#undefined-more-button`).click();
      await routePlannerPage.page.locator(`#upload-job-button`).click();
      await expect(routePlannerPage.page.locator(`//h2[contains(.,'Job upload')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Choose File')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Download a sample file')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//span[contains(.,'Job-Upload-Sample-Template.xlsx')]`).first()).toBeVisible();
      await expect(routePlannerPage.page.locator(`//span[contains(.,'Completed')]`).first()).toBeVisible();
      await expect(routePlannerPage.page.locator(`//a[contains(.,'Download')]`).first()).toBeVisible();

    });
    test(`TC_17: Verify the Schedule All functionality for Route Planner`, async ({
      routePlannerPage, loginPage
    }) => {
      await expect(routePlannerPage.page.locator(`#vendor-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#vendor-button`).click();
      await expect(loginPage.page.locator(`#select-default-vendor-field`)).toBeVisible();
      await loginPage.page.locator(`#select-default-vendor-field`).click();
      await loginPage.page.locator(`//div[contains(text(),'BelgaumSmartCityQAA')]`).click();
      await routePlannerPage.page.locator(`#select-vendor-button`).click();
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Route Scheduler')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#undefined-more-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#undefined-more-button`).click();
      await expect(routePlannerPage.page.locator(`#schedule-all-route-templates-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#schedule-all-route-templates-button`).click();
      await expect(routePlannerPage.page.locator(`//h2[contains(.,'Schedule All')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`button[type="submit"]`).last()).toBeVisible();
      // Click the calendar input to open the date picker
      await routePlannerPage.page.locator('input[placeholder="Date"]').click();
      // Select the current day matching today's date number
      const today = new Date().getDate().toString();
      await routePlannerPage.page.locator('.DayPicker-Week .DayPicker-Day.DayPicker-Day--today', { hasText: today }).click();
      await expect(routePlannerPage.page.locator(`//div[contains(.,'Vehicle Type')]/parent::div/descendant::input[@id="routeType"]`)).toBeVisible();
    });
    test(`TC_18: Verify the Service Zone functionality for Route Planner`, async ({
      routePlannerPage, loginPage
    }) => {
      await expect(routePlannerPage.page.locator(`#vendor-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#vendor-button`).click();
      await expect(loginPage.page.locator(`#select-default-vendor-field`)).toBeVisible();
      await loginPage.page.locator(`#select-default-vendor-field`).click();
      await loginPage.page.locator(`//div[contains(text(),'BelgaumSmartCityQAA')]`).click();
      await routePlannerPage.page.locator(`#select-vendor-button`).click();
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Route Scheduler')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#undefined-more-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#undefined-more-button`).click();
      await expect(routePlannerPage.page.locator(`#service-zones-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#service-zones-button`).click();
      await expect(routePlannerPage.page.locator(`#create-service-zone-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#create-service-zone-button`).click();
      await expect(routePlannerPage.page.locator(`//h2[contains(.,'Create Service Zone')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`input[name="name"]`)).toBeVisible();
      const serviceZoneName = `ServiceZone_${Date.now()}`;
      await routePlannerPage.page.locator(`input[name="name"]`).fill(serviceZoneName);
      await expect(routePlannerPage.page.locator(`#service-zone-save-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#service-zone-save-button`).click();
      await expect(routePlannerPage.page.locator(`//div[text()='The service zone was saved successfully.']`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//div[contains(.,'${serviceZoneName}')]/parent::div/div/button[contains(@id,'edit-service')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//div[contains(.,'${serviceZoneName}')]/parent::div/div/button[contains(@id,'delete-service')]`)).toBeVisible();
      await routePlannerPage.page.locator(`//div[contains(.,'${serviceZoneName}')]/parent::div/div/button[contains(@id,'delete-service')]`).click();
      await expect(routePlannerPage.page.locator(`//span[contains(.,'Are you sure you want to delete this service zone')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Yes')]`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[contains(.,'Yes')]`).click();
      await expect(routePlannerPage.page.locator(`//div[text()='The service zone was deleted']`)).toBeVisible();
    });
    test(`TC_19: Verify the Holiday Planner functionality for Route Planner`, async ({
      routePlannerPage, loginPage
    }) => {
      await expect(routePlannerPage.page.locator(`#vendor-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#vendor-button`).click();
      await expect(loginPage.page.locator(`#select-default-vendor-field`)).toBeVisible();
      await loginPage.page.locator(`#select-default-vendor-field`).click();
      await loginPage.page.locator(`//div[contains(text(),'BelgaumSmartCityQAA')]`).click();
      await routePlannerPage.page.locator(`#select-vendor-button`).click();
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Route Scheduler')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#undefined-more-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#undefined-more-button`).click();
      await expect(routePlannerPage.page.locator(`#holiday-planner-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#holiday-planner-button`).click();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Add New Holiday')]`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[contains(.,'Add New Holiday')]`).click();
      await routePlannerPage.page.locator(`input[name="name"]`).fill(`Holiday_${Date.now()}`);
      await routePlannerPage.page.locator(`//label[contains(.,'Holiday Date')]/parent::div//input`).click();
      /* const date = new Date();
      date.setDate(date.getDate() + 1);
      const today = date.getDate().toString();
      await routePlannerPage.page.locator('.DayPicker-Week .DayPicker-Day.DayPicker-Day--today', { hasText: today }).click();

      await expect(routePlannerPage.page.locator(`//label[contains(.,'Date type')]/parent::div//input[@id="isExactPostpone"]`)).toBeVisible();
      await routePlannerPage.page.locator(`//label[contains(.,'Date type')]/parent::div//input[@id="isExactPostpone"]`).click();
      await routePlannerPage.page.locator(`//div[contains(@id,'react-select') and contains(.,'Exact date')]`).click();

      await expect(routePlannerPage.page.locator(`//label[contains(.,'Select a Specific Date')]/parent::div//input`)).toBeVisible();
      await routePlannerPage.page.locator(`//label[contains(.,'Select a Specific Date')]/parent::div//input`).click();
      const today1 = new Date().getDate().toString();
      await routePlannerPage.page.locator('.DayPicker-Week .DayPicker-Day.DayPicker-Day--today', { hasText: today1 }).click();*/
      await routePlannerPage.page.locator(`button path[fill="currentColor"]`).click();
      await expect(routePlannerPage.page.locator(`//label[contains(.,'Holiday Date')]/parent::div//span`)).toBeVisible();
    });
    test(`TC_20: Verify the Route Template Builder(Beta) functionality for Route Planner`, async ({
      routePlannerPage, loginPage
    }) => {
      await expect(routePlannerPage.page.locator(`#vendor-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#vendor-button`).click();
      await expect(loginPage.page.locator(`#select-default-vendor-field`)).toBeVisible();
      await loginPage.page.locator(`#select-default-vendor-field`).click();
      await loginPage.page.locator(`//div[contains(text(),'BelgaumSmartCityQAA')]`).click();
      await routePlannerPage.page.locator(`#select-vendor-button`).click();
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Route Scheduler')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#undefined-more-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#undefined-more-button`).click();
      await expect(routePlannerPage.page.locator(`#route-template-builder-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#route-template-builder-button`).click();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Create Work Session')]`).first()).toBeVisible();
      await routePlannerPage.page.locator(`//button[contains(.,'Create Work Session')]`).first().click();
      await expect(routePlannerPage.page.locator(`//h2[contains(.,'Create Work Session')]`)).toBeVisible();
      await routePlannerPage.page.locator(`input[name="workSessionName"]`).fill(`WorkSession_${Date.now()}`);
      await expect(routePlannerPage.page.locator(`//button[@type='submit' and text()='Create']`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[@type='submit' and text()='Create']`).click();
      await expect(routePlannerPage.page.locator(`//button[text()='Exit Session']`)).toBeVisible();
      await routePlannerPage.page.locator(`//button[text()='Exit Session']`).click();
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Create Work Session')]`).first()).toBeVisible();
    });
    test(`TC_21: Verify the Delay Upcoming Service Schedule functionality for Route Planner`, async ({
      routePlannerPage, loginPage
    }) => {
      await expect(routePlannerPage.page.locator(`#vendor-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#vendor-button`).click();
      await expect(loginPage.page.locator(`#select-default-vendor-field`)).toBeVisible();
      await loginPage.page.locator(`#select-default-vendor-field`).click();
      await loginPage.page.locator(`//div[contains(text(),'BelgaumSmartCityQAA')]`).click();
      await routePlannerPage.page.locator(`#select-vendor-button`).click();
      await routePlannerPage.navigateToRoutePlanner('Route Planner');
      await expect(routePlannerPage.page.locator(`//button[contains(.,'Route Scheduler')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`#undefined-more-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#undefined-more-button`).click();
      await expect(routePlannerPage.page.locator(`#delay-upcoming-service-schedule-button`)).toBeVisible();
      await routePlannerPage.page.locator(`#delay-upcoming-service-schedule-button`).click();
      //await expect(routePlannerPage.page.locator(`//h2[contains(.,'Delay Upcoming Service Schedule')]`)).toBeVisible();
      await expect(routePlannerPage.page.locator(`input[name="routeTemplateName"]`)).toBeVisible();
      await routePlannerPage.page.locator(`input[name="routeTemplateName"]`).fill(`BelgaumQARouteTemplate`);
      const resultList = routePlannerPage.page.locator(`//span[contains(.,'Select the Routes to Delay')]/ancestor::form/following-sibling::div//descendant::div[contains(@id,'name') and contains(.,'BelgaumQARouteTemplate')]`);
      await expect(resultList.last()).toBeVisible();
    });
  });
}
