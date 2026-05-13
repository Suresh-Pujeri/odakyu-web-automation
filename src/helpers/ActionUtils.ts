/// <reference types="node" />
import { Page } from '@playwright/test'; // Ensure correct import
import path from 'path';
import fs from 'fs';

export class ActionUtils {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async downLoadFile(locator: string): Promise<string> {
    const [download] = await Promise.all([this.page.waitForEvent('download'), this.page.locator(locator).click()]);

    // FIX: Use backticks (`) for template literals, not single quotes
    const fileName = `${Date.now()}-${download.suggestedFilename()}`;
    const filePath = path.join(__dirname, '../../downloads', fileName);

    await download.saveAs(filePath);
    return fileName;
  }

  async uploadFile(fileName: string): Promise<void> {
    // FIX: Ensure you point to the full path of the downloaded file
    const filePath = path.join(__dirname, '../../downloads', fileName);
    await this.page.setInputFiles('input[type="file"]', filePath);
  }

  clearFile(fileName: string): void {
    const filePath = path.join(__dirname, '../../downloads', fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
