import { Locator, Page } from '@playwright/test';
import config from 'config';
import { expect } from './odakyuPortal/fixtures/baseTest';

const elements = {
  emailTextField: 'input[name="email"]',
  passwordTextField: 'input[name="password"]',
  loginButton: 'button[type="submit"]',
  vendorDropDown: '#vendorId',
  applyButton: '#select-vendor-button',
  vendorDropDownField: 'div',
  vendorSearchResult: `//input[@id='vendorId']//ancestor::div//descendant::div[contains(text(),'Odakyu Premier SmartCity')]`,
};
export default class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly vendorDropDownField: Locator;
  readonly vendorDropDown: Locator;
  readonly applyButton: Locator;
  readonly vendorResult: Locator;
  readonly applyBtn: Locator;
  readonly user!: object;

  constructor(page: Page, loggedInState: string, loggedOutState: string) {
    this.page = page;
    this.userName = this.page.locator(elements.emailTextField);
    this.password = this.page.locator(elements.passwordTextField);
    this.loginButton = this.page.locator(elements.loginButton);
    this.vendorDropDownField = this.page.locator(elements.vendorDropDownField);
    this.vendorDropDown = this.page.locator(elements.vendorDropDown);
    this.applyButton = this.page.locator(elements.applyButton);
    this.vendorResult = this.page.locator(elements.vendorSearchResult);
    this.applyBtn = page.getByRole('button', { name: 'Apply' });
  }
  async goto(): Promise<void> {
    await this.page.goto('https://hauler.qa.ap.odakyu.smartcity.routeware.com/account/login');
  }
  async loginWithUserRole(userRole: string): Promise<void> {
    const user: { email: string; password: string; vendorName: string } = config.get(userRole);
    const userName = user.email || '';
    const password = user.password || '';
    const vendorName = user.vendorName || '';
    if (!userName || !password) {
      throw new Error(`${userRole}: User credentials don't exist`);
    }
    await this.login(userName, password, vendorName);
  }
  async login(userName: string, password: string, vendorName: string) {
    await this.userName.fill(userName);
    await this.password.fill(password);
    await Promise.all([
      //this.page.waitForNavigation(),
      this.loginButton.click(),
    ]);
    await this.selectVendor(vendorName);
  }
  async selectVendor(vendorName: string): Promise<void> {
    await this.vendorDropDownField
      .filter({ hasText: /^Vendor$/ })
      .nth(3)
      .click();
    await this.vendorDropDown.fill(vendorName);
    await this.vendorResult.filter({ hasText: vendorName }).last().click();
    await this.applyBtn.click();
  }
}
