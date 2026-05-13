import { Locator, Page } from '@playwright/test';
import { ActionUtils } from '../../helpers/ActionUtils';
import moment from 'moment';

const elements = {
  addPolygonLayerBtn:'#add-polygon-layer-button',
  mapShapesHeaderText:'//h1[contains(text(),"Map Shapes")]',
  searchByLayerName:'input[placeholder="Search by layer name"]',
  layerNamePlaceholderText:'//label[contains(text(),"Layer name")]',
  layerNameInputField:'//label[contains(text(),"Layer name")]/parent::div//input',
  clickEditMapLayerText:`//div/span[contains(text(),"Click 'Edit map' to start adding shapes to this layer.")]`,
  colorPickerForMapLayer:'input[name="colorPickerColor"]',
  editIcon:'//button[@color="secondary"]//*[name()="svg"]',
  editModeIcon:'button[color="primary"] svg',
  mapLayersBtn:'svg.sc-fotOHu.hYTmhz',

};

type Elements = Record<keyof typeof elements, Locator>;

export default class MapShapesPage {
  readonly actionUtils: ActionUtils;
  readonly page: Page;
  readonly elements: Elements;
  readonly dispatchTab: (text: string) => Locator;
  readonly jobsRoutesSection: (labelName: string) => Locator;
  readonly fleetTab:(tabName: string) => Locator;
  readonly addMapLayerText:(text:string)=>Locator;
  readonly shapesOptions:(textLabel:string)=>Locator;

  constructor(page: Page) {
    this.page = page;
    this.actionUtils = new ActionUtils(this.page);
    this.elements = {} as Elements;
    Object.entries(elements).forEach(([key, value]) => {
      this.elements[key as keyof typeof elements] = page.locator(value);
    });
    this.dispatchTab = (text: string) => page.locator(`//div[@id="root"]//a[contains(text(),'${text}')]`);
    this.jobsRoutesSection = (labelName: string) => page.locator(`//h2[text()='${labelName}']`);
    this.fleetTab = (tabName: string) => page.locator(`//div[@id="root"]//a[contains(text(),'${tabName}')]`);
    this.addMapLayerText=(text:string)=>page.locator(`//span[contains(text(),'${text}')]`);
    this.shapesOptions=(textLabel:string)=>page.locator(`//span[contains(text(),'${textLabel}')]`);
  }

  async navigateToMapShapes(tabName: string): Promise<void> {
    await this.fleetTab('Fleet').click();
    await this.dispatchTab(tabName).click();
  }
  async clickAddLayerButton(layerName:string):Promise<void>{
    await this.elements.addPolygonLayerBtn.last().click();
    await this.elements.layerNameInputField.fill(layerName);
  }
  async clickEditIcon():Promise<void>{
    await this.elements.editIcon.last().click();
  }
  async addMapShapesLayers():Promise<void>{
    await this.elements.mapLayersBtn.nth(2).click();
  }
  async drawShapesAndSave():Promise<void>{
    await this.page.getByText('Circle', { exact: true }).click();
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 529,
      y: 152
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 578,
      y: 211
    }
  });
  await this.page.locator('.sc-hBUSln.hwhVQL').click();
  await this.page.getByText('Draw polygon').click();
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 609,
      y: 41
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 746,
      y: 59
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 971,
      y: 20
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 1003,
      y: 288
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 993,
      y: 287
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 993,
      y: 287
    }
  });
  await this.page.locator('.sc-gLvsDy').click();
  await this.page.locator('.hue-vertical').click();
  await this.page.locator('div').nth(1).click();
  await this.page.locator('div:nth-child(5) > .sc-hBUSln').click();
  await this.page.getByRole('button', { name: 'Save' }).click();
/*
  await page.locator('#edit-map-layer-5').click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
  await page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 732,
      y: 185
    }
  });
  await page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 732,
      y: 185
    }
  });
  await page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 732,
      y: 185
    }
  });
  await page.locator('div:nth-child(5) > .sc-hBUSln').click();
  await page.getByText('Shape note').click();
  await page.getByText('Shape note').click();
  await page.getByText('Edit map layerSave').click();
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.getByRole('textbox', { name: 'Shape note' }).click();
  await page.getByRole('textbox', { name: 'Shape note' }).fill('PolygonTestComments');
  await page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 743,
      y: 379
    }
  });
  await page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 463,
      y: 303
    }
  });
  await page.locator('div:nth-child(5) > .sc-hBUSln').click();
  await page.getByRole('textbox', { name: 'Shape note' }).click();
  await page.getByRole('textbox', { name: 'Shape note' }).fill('Circle Comment');
  await page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 827,
      y: 349
    }
  });
  await page.locator('div:nth-child(5) > .sc-hBUSln').click();
  await page.locator('div').filter({ hasText: 'Shape edits applied. Click' }).nth(1).click();*/
  }

  async addEDit():Promise<void>{
    await this.page.getByText('Draw line').click();
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 220,
      y: 114
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 397,
      y: 126
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 397,
      y: 126
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 587,
      y: 203
    }
  });
  await this.page.locator('.sc-hBUSln.hwhVQL').click();
  await this.page.getByText('Arrow line').click();
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 388,
      y: 190
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 789,
      y: 75
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 789,
      y: 75
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 789,
      y: 75
    }
  });
  await this.page.locator('.sc-hBUSln.hwhVQL').click();
  await this.page.getByText('Circle').click();
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 109,
      y: 155
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 188,
      y: 198
    }
  });
  await this.page.locator('.sc-hBUSln.hwhVQL').click();
  await this.page.getByText('Draw polygon').click();
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 417,
      y: 284
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 509,
      y: 326
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 553,
      y: 286
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 926,
      y: 37
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 715,
      y: 17
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 554,
      y: 20
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 546,
      y: 119
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 518,
      y: 230
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 491,
      y: 293
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 491,
      y: 293
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 518,
      y: 277
    }
  });
  await this.page.locator('div:nth-child(5) > .sc-hBUSln').click();
  await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
  await this.page.locator('.ant-dropdown-trigger > .sc-eSRRmr > .sc-hBUSln').click();
  await this.page.getByText('Arrow line').click();
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 570,
      y: 62
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 973,
      y: 76
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 974,
      y: 73
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 974,
      y: 73
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 866,
      y: 69
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 866,
      y: 69
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 843,
      y: 72
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 843,
      y: 70
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 927,
      y: 73
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 890,
      y: 73
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 864,
      y: 36
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 933,
      y: 65
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 946,
      y: 35
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 946,
      y: 35
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 980,
      y: 36
    }
  });
  await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(5).click();
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 913,
      y: 56
    }
  });
  await this.page.locator('.sc-dRtGhb > div:nth-child(3) > .sc-hBUSln').click();
  await this.page.locator('div:nth-child(5) > .sc-hBUSln').click();
  await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 715,
      y: 191
    }
  });
  await this.page.locator('div:nth-child(5) > .sc-hBUSln').click();
  await this.page.getByText('Add map layerSave').click();
  await this.page.locator('body').press('ArrowDown');
  await this.page.locator('body').press('ArrowDown');
  await this.page.locator('body').press('ArrowDown');
  await this.page.getByRole('textbox', { name: 'Shape note' }).click();
  await this.page.getByRole('textbox', { name: 'Shape note' }).fill('PolygonTesting');
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 403,
      y: 364
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 309,
      y: 242
    }
  });
  await this.page.locator('div:nth-child(5) > .sc-hBUSln').click();
  await this.page.getByRole('textbox', { name: 'Shape note' }).click();
  await this.page.getByRole('textbox', { name: 'Shape note' }).fill('TestCommentsCircle');
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 428,
      y: 357
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 833,
      y: 108
    }
  });
  await this.page.locator('div:nth-child(5) > .sc-hBUSln').click();
  await this.page.getByRole('textbox', { name: 'Shape note' }).click();
  await this.page.getByRole('textbox', { name: 'Shape note' }).fill('ArrowComments');
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 462,
      y: 380
    }
  });
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 664,
      y: 342
    }
  });
  await this.page.locator('div:nth-child(5) > .sc-hBUSln').click();
  await this.page.getByRole('textbox', { name: 'Shape note' }).click();
  await this.page.getByRole('textbox', { name: 'Shape note' }).fill('Line comments');
  await this.page.getByRole('region', { name: 'Map' }).click({
    position: {
      x: 577,
      y: 403
    }
  });
  await this.page.locator('div:nth-child(6) > .sc-hBUSln').click();
  await this.page.getByText('Shape edits applied. Click').click();
  await this.page.getByRole('button', { name: 'Save' }).click();
  await this.page.getByText('Map ShapesAdd layer').click();
  await this.page.locator('body').press('ArrowDown');
  await this.page.locator('#edit-map-layer-7').click();
  await this.page.locator('#fleet-map-layer-back').getByRole('img').click();
  }
}
