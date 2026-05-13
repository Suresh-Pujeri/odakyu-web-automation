import { Locator, Page } from '@playwright/test';
import { ActionUtils } from '../../helpers/ActionUtils';
import moment from 'moment';

const elements = {
  dispatchBoardHeaderText: '//h1[text()="Dispatch Board"]',
  routesMoreBtn: '#undefined-more-button',
  routesAddRouteBtn: '#add-route-button',
  moreUploadJobBtn: '#upload-job-button',
  moreRouteBuilderBtn: '#route-builder-button',
};

type Elements = Record<keyof typeof elements, Locator>;

export default class DispatchBoardPage {
  readonly actionUtils: ActionUtils;
  readonly page: Page;
  readonly elements: Elements;
  readonly dispatchTab: (text: string) => Locator;
  readonly jobsRoutesSection: (labelName: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.actionUtils = new ActionUtils(this.page);
    this.elements = {} as Elements;
    Object.entries(elements).forEach(([key, value]) => {
      this.elements[key as keyof typeof elements] = page.locator(value);
    });
    this.dispatchTab = (text: string) => page.locator(`//div[@id="root"]//a[contains(text(),'${text}')]`);
    this.jobsRoutesSection = (labelName: string) => page.locator(`//h2[text()='${labelName}']`);
  }
  async verifyJobsSection(): Promise<void> {
    await this.elements.dispatchBoardHeaderText.waitFor();
  }
}
