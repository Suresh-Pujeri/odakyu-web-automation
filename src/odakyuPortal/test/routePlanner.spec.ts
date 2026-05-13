import test, { expect } from '../fixtures/baseTest';
import { userRoleAccessMatrix } from '../../testUserStates';

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
    test.beforeEach(async ({ routePlannerPage }) => {
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
      await routePlannerPage.addStopsToRoute(5, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
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
      await expect(routePlannerPage.elements.schedulePopUpWindowText).toBeVisible();
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
      await routePlannerPage.addStopsToRoute(5, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
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
      await expect(routePlannerPage.elements.schedulePopUpWindowText).toBeVisible();
      await routePlannerPage.confirmScheduleCreation();
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
    });
    test.only(`TC_04: should allow ${userRole} to create a route template for Delivery / Utility`, async ({
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
      await routePlannerPage.addStopsToRoute(5, 'Last');
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toBeVisible();
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
      await expect(routePlannerPage.elements.schedulePopUpWindowText).toBeVisible();
      await routePlannerPage.confirmScheduleCreation();
      await expect(routePlannerPage.elements.routeAddStopSuccessMessage).toContainText(
        'Route Templates were scheduled successfully.',
      );
    });
  });
}
