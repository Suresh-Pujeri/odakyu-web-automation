import { Locator, Page } from '@playwright/test';
import { ActionUtils } from '../../helpers/ActionUtils';
import moment from 'moment';

const elements = {
    newOrPreviousLayout: '//h1[text()="Data Export"]/ancestor::div//following-sibling::div//button[@color="primary"]',
    createExportText: '//h2[text()="Create Export"]',
    reportTypeInputBox: 'input[id="reportType"]',
    reportTypeSearchResult: '//input[@id="reportType"]/ancestor::div/following-sibling::div//div[contains(@id,"react-select")]',
    exportBtn: '//button[contains(text(),"Export")]',

};

type Elements = Record<keyof typeof elements, Locator>;

export default class InsightsDataExportPage {
    readonly actionUtils: ActionUtils;
    readonly page: Page;
    readonly elements: Elements;
    readonly dispatchTab: (text: string) => Locator;
    readonly newLayoutLink: (text: string) => Locator;
    readonly reportTypeStatus: (reportType: string, reportDate: string) => Locator;
    readonly reportTypeDownloadIcon: (reportType: string, reportDate: string) => Locator;

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
        this.newLayoutLink = (text: string) => page.locator(`//button[contains(text(),"${text}")]`);
        this.reportTypeStatus = (reportType: string, reportDate: string) => page.locator(`//div[contains(text(),"${reportType}")]/parent::div/div[contains(text(),'${reportDate}')]/parent::div/div`);
        this.reportTypeDownloadIcon = (reportType: string, reportDate: string) => page.locator(`//div[contains(text(),"${reportType}")]/parent::div/div[contains(text(),'${reportDate}')]/parent::div/div/button/span `);


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
    async navigateToDataExportPage(tabName: string): Promise<void> {
        await this.dispatchTab('Insights').first().click();
        await this.dispatchTab(tabName).click();
    }
    async switchToNewLink(): Promise<void> {
        const newOrPreviousLayoutText = await this.elements.newOrPreviousLayout.first().textContent();
        if (newOrPreviousLayoutText?.includes('New Layout')) {
            await this.newLayoutLink('New Layout').click();
        }
        else if (newOrPreviousLayoutText?.includes('Previous Layout')) {
            await this.elements.createExportText.isVisible();
        }
        await this.elements.createExportText.isVisible();
    }
    async slectReportType(reportType: string): Promise<void> {
        await this.elements.reportTypeInputBox.fill(reportType);
        await this.elements.reportTypeSearchResult.isVisible();
        await this.elements.reportTypeSearchResult.click();
        await this.clickExportButton();
    }
    async clickExportButton(): Promise<void> {
        await this.elements.exportBtn.click();
    }
    
    async verifyReportExportedStatusCompleted1(reportType: string, reportDate: string, maxAttempts = 5): Promise<void> {
        const statusLocator = this.reportTypeStatus(reportType, reportDate).nth(2);
        let attempts = 0;

        while (attempts < maxAttempts) {
            // Fetch the current text status safely
            const statusType = await statusLocator.textContent().then(text => text?.trim());

            if (statusType === 'Completed') {
                // Confirm visibility and exit the function successfully
                await statusLocator.isVisible();
                return;
            }

            attempts++;

            if (attempts < maxAttempts) {
                // Reload page and wait for it to load completely before next check
                await this.page.reload({ waitUntil: 'domcontentloaded' });
            }
        }

        throw new Error(`Report status did not change to 'Completed' after ${maxAttempts} reloads.`);
    }

}
