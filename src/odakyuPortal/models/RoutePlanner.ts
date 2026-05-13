import { Locator, Page } from '@playwright/test';
import { ActionUtils } from '../../helpers/ActionUtils';
import moment from 'moment';

const elements = {
  planARouteBtn: '#route-plan-button',
  dailyRoute: '#plan-daily-route-button',
  routeTemplate: '#plan-template-route-button',
  createRouteTemplateHeaderText: '//h1[contains(text(),"Create route template")]',
  routeTemplateSaveBtn: '#route-save-button',
  addStopsCustomerLocationTextField: '//div[contains(text(),"Customer / Location")]/parent::div//input',
  selectStopsFromDropdownList:
    '//div[contains(text(),"test")]//ancestor::div/following-sibling::div//div[@display="flex"]',
  lastStopText: '//div[contains(text(),"Last")]',
  lastStopInputField: 'input[id="positionTypeId"]',
  routeAddStopBtn: '#route-add-stop-button',
  routeSeeUnassignedBtn: 'route-see-unassigned-button',
  routeAddStopPopUpWindow: '//span[contains(text(),"Selected service does not cover all scheduled days.")]',
  routeAddStopPopUpCancelOkBtn: '//button[contains(text(),"Ok")]',
  routeAddStopSuccessMessage: 'div[color="success"] div',
  routeAddStopCheckBox: '//div[contains(text(),"Stop #")]/parent::div//label',
  daysOfServcieApplyButton: '//label[contains(text(),"Days of Service")]/parent::div//button[contains(text(),"Apply")]',
  routeStopStartDateField: '//label[contains(text(),"Start Date")]',
  routeStopStartDateCanlendarDays: 'div[role="grid"] div[role="rowgroup"] div.DayPicker-Day[aria-disabled="false"]',
  routeStopHelpersOption:
    '//label[contains(text(),"Helpers")]/parent::div/descendant::div//label/span[@class="sc-dlVxhl kLqcqY"]',
  routeStopHelpersApplyBtn: '//label[contains(text(),"Helpers")]/parent::div/descendant::button',
  routeStopAddStopsHeaderText: '//*[contains(text(),"Add Stops")]',
  thereArenoRouteStopsMessage: '//*[contains(text(),"There are no route stops")]',
  routeStopDeleteBtn: '//button[contains(@id, "delete-button")]//*[name()="svg"]',
  routeStopEditServiceBtn: '//button[contains(@id, "edt-service-button")]//*[name()="svg"]',
  routeTemplateMoreBtn: '#more-button-more-button',
  editRouteTemplateBtn: '#edit-route-template-button',
  changeServiceScheduleBtn: '//button[contains(.,"Change Service Schedule")]',
  routeNameHeaderText: '//div/h1',
  backButton: '#back-button',
  searchRouteTemplateNameTextField: 'input[name="routeTemplateName"]',
  routeConfirmationTypeId: '#routeConfirmationTypeId',
  routeConfirmationTypeOption:
    '//label[contains(text(),"Confirmation Type")]/parent::div//div[contains(@id, "react-select")]',
  routePlannerScheduleBtn: '#schedule-route-button',
  routePlannerScheduleDateInputField: 'input[placeholder="Date"]',
  routePlannerScheduleSaveBtn: '//h2[text()="Schedule"]/parent::div/following-sibling::form//button[@type="submit"]',
  schedulePopUpWindowText:
    '//span[contains(., "Do you want to create the route(s) for Friday? You have selected a route originally scheduled for a different service day.")]',
};

type Elements = Record<keyof typeof elements, Locator>;

export default class RoutePlannerPage {
  readonly actionUtils: ActionUtils;
  readonly page: Page;
  readonly elements: Elements;
  readonly dispatchTab: (text: string) => Locator;
  readonly routeNameTextField: (attributeLabel: string, text: string) => Locator;
  readonly routeTemplateToggleBtn: (buttonName: string) => Locator;
  readonly lastStopOptions: (optionName: string) => Locator;
  readonly routeStopTableColumnHeader: (columnName: string) => Locator;
  readonly daysOfServiceCheckbox: (day: string) => Locator;
  readonly vehicleTypeDropdownOption: (optionName: string) => Locator;
  readonly wasteTypeDropdownOption: (optionName: string) => Locator;
  readonly startingLocationDisposalFacilityOption: (optionName: string) => Locator;
  readonly serviceZoneDropDownOption: (optionName: string) => Locator;
  readonly createdRouteTemplateName: (routeName: string) => Locator;
  readonly routePlannerRouteTemplateCheckbox: (routeName: string) => Locator;
  readonly selectScheduleDate: (role: string, date: string) => Locator;
  readonly scheduleCancelYesBtn: (labelName: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.actionUtils = new ActionUtils(this.page);
    this.elements = {} as Elements;
    Object.entries(elements).forEach(([key, value]) => {
      this.elements[key as keyof typeof elements] = page.locator(value);
    });
    this.dispatchTab = (text: string) => page.locator(`//div[@id="root"]//a[contains(text(),'${text}')]`);
    this.routeNameTextField = (attributeLabel: string, text: string) =>
      page.locator(`input[${attributeLabel}="${text}"]`);
    this.routeTemplateToggleBtn = (buttonName: string) =>
      page.locator(`//span[contains(text(),"${buttonName}")]/parent::div/div/div`);
    this.lastStopOptions = (optionName: string) =>
      page.locator(`//div[contains(text(),'Last')]//ancestor::div/descendant::div[contains(text(),'${optionName}')]`);
    this.routeStopTableColumnHeader = (columnName: string) => page.locator(`//div[contains(text(),'${columnName}')]`);
    this.daysOfServiceCheckbox = (day: string) => page.locator(`//label/span[contains(text(),'${day}')]`);
    this.vehicleTypeDropdownOption = (optionName: string) => page.locator(`//div[contains(text(),'${optionName}')]`);
    this.wasteTypeDropdownOption = (optionName: string) =>
      page.locator(
        `//input[@id="wasteMaterialTypeId"]//ancestor::div//descendant::div[contains(text(),'${optionName}')]`,
      );
    this.startingLocationDisposalFacilityOption = (optionName: string) =>
      page.locator(`//div[contains(text(),'${optionName}')]/parent::div/div/div`);
    this.serviceZoneDropDownOption = (optionName: string) =>
      page.locator(`//label[contains(text(),"${optionName}")]/parent::div/descendant::div//div`);
    this.createdRouteTemplateName = (routeName: string) => page.locator(`//div[contains(text(),"${routeName}")]`);
    this.routePlannerRouteTemplateCheckbox = (routeName: string) =>
      page.locator(`//div[contains(text(),"${routeName}")]/parent::div//label/span`);
    this.selectScheduleDate = (role: string, date: string) => page.getByRole(role as any, { name: date });
    this.scheduleCancelYesBtn = (labelName: string) => page.locator(`//button[contains(.,'${labelName}')]`);
  }
  async goto(): Promise<void> {
    await this.page.goto('https://hauler.qa.ap.odakyu.smartcity.routeware.com/dispatch/route-planner');
  }
  async navigateToRoutePlanner(tabName: string): Promise<void> {
    await this.dispatchTab('Dispatch').first().click();
    await this.dispatchTab(tabName).click();
  }
  async createARoute(): Promise<void> {
    await this.elements.planARouteBtn.click();
  }
  async createDailyRoute(): Promise<void> {
    await this.elements.dailyRoute.click();
  }
  async createRouteTemplate(): Promise<void> {
    await this.elements.routeTemplate.click();
  }
  async fillRouteTemplateDetails(
    routeName: string,
    vehicleType: string,
    wasteType: string,
    startingLocationOption: string,
    endingLocationOption: string,
    serviceZoneOption: string,
    supervisorOption: string,
    driverOption: string,
    vehicleOption: string,
  ): Promise<void> {
    await this.routeNameTextField('name', 'routeTemplateName').fill(routeName);
    await this.routeNameTextField('name', 'scheduledDays').click();
    await this.daysOfServiceCheckbox('All').click();
    await this.elements.daysOfServcieApplyButton.click();
    await this.routeNameTextField('id', 'vehicleTypeId').click();

    const isResidential = vehicleType === 'Residential';
    const isCommercial = vehicleType === 'Commercial';

    await this.vehicleTypeDropdownOption(vehicleType).click();
    if (isResidential || isCommercial) {
      await this.routeNameTextField('id', 'wasteMaterialTypeId').click();
      await this.routeNameTextField('id', 'wasteMaterialTypeId').fill(wasteType);
      await this.wasteTypeDropdownOption(wasteType).last().click();
    }

    //await this.wasteTypeDropdownOption(wasteType).last().click();
    const day = moment().date();
    //await this.elements.routeStopStartDateField.click();
    //await this.elements.routeStopStartDateCanlendarDays.nth(day).click();
    await this.routeNameTextField('name', 'description').fill(`Route template created for ${routeName.split('-')[0]}`);
    await this.routeNameTextField('id', 'startingLocationId').click();
    await this.startingLocationDisposalFacilityOption('Operational Facility: Fueling Station')
      .filter({ hasText: startingLocationOption })
      .click();
    await this.routeNameTextField('id', 'endingLocationId').click();
    await this.startingLocationDisposalFacilityOption('Operational Facility: Fueling Station')
      .filter({ hasText: endingLocationOption })
      .click();
    await this.routeNameTextField('id', 'vendorServiceZoneId').click();
    await this.serviceZoneDropDownOption('Service Zone').filter({ hasText: serviceZoneOption }).last().click();

    if (isResidential) {
      await this.elements.routeConfirmationTypeId.click();
      await this.elements.routeConfirmationTypeOption.filter({ hasText: 'Exception' }).click();
    }

    await this.routeNameTextField('id', 'supervisorId').click();
    await this.serviceZoneDropDownOption('Supervisor').filter({ hasText: supervisorOption }).last().click();
    await this.routeNameTextField('id', 'driverId').click();
    await this.serviceZoneDropDownOption('Driver').filter({ hasText: driverOption }).last().click();
    await this.routeNameTextField('id', 'vehicleId').click();
    await this.serviceZoneDropDownOption('Vehicle').filter({ hasText: vehicleOption }).last().click();
    await this.routeNameTextField('name', 'workerIds').click();
    await this.elements.routeStopHelpersOption.first().click();
    await this.elements.routeStopHelpersOption.last().click();
    await this.elements.routeStopHelpersApplyBtn.click();
  }

  async addStopsToRoute(index: number, stopOption: string): Promise<void> {
    await this.elements.addStopsCustomerLocationTextField.fill('test');
    await this.elements.selectStopsFromDropdownList.nth(index).click({ delay: 2000 });
    //await this.elements.lastStopInputField.click();
    //await this.lastStopOptions(stopOption).click();
    await this.elements.routeAddStopBtn.click();
    const isPopUpVisible = await this.elements.routeAddStopPopUpWindow.isVisible({ timeout: 3000 }).catch(() => false);
    if (isPopUpVisible) {
      await this.elements.routeAddStopPopUpCancelOkBtn.click();
    }
    await this.elements.routeAddStopSuccessMessage.waitFor({ state: 'visible' });
  }
  async goBackToTheRoutePlannerPage(): Promise<void> {
    await this.elements.backButton.click();
  }
  async searchCreatedRouteTemplate(routeName: string): Promise<void> {
    await this.elements.searchRouteTemplateNameTextField.fill(routeName);
    await this.elements.searchRouteTemplateNameTextField.press('Enter');
    await this.createdRouteTemplateName(routeName).waitFor({ state: 'visible' });
  }
  async clickOnCreatedRouteTemplate(routeName: string): Promise<void> {
    await this.createdRouteTemplateName(routeName).click();
  }
  async scheduleRouteTemplate(): Promise<void> {
    await this.elements.routePlannerScheduleBtn.click();
    await this.selectScheduleDate('textbox', 'Date').click();
    const currentDate = moment().format('dddd, D MMMM');
    await this.selectScheduleDate('gridcell', currentDate).click();
    await this.selectScheduleDate('button', 'Save').click();
  }
  async confirmScheduleCreation(): Promise<void> {
    const isPopUpVisible = await this.elements.schedulePopUpWindowText.isVisible({ timeout: 3000 }).catch(() => false);
    if (isPopUpVisible) {
      await this.scheduleCancelYesBtn('Yes').click();
    }
  }
}
