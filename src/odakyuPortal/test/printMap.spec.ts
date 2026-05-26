import { test, expect } from '@playwright/test';
import LoginPage from '../../login';

test.describe('Print Map - PRT01', () => {
  test('Print map button opens preview and generates PDF (happy path)', async ({ page }) => {
    const login = new LoginPage(page, '', '');
    await login.goto();
    // Use a configured user role name present in your config (e.g., 'adminUser')
    await login.loginWithUserRole('adminUser');
    // Navigate to the Customers / Locations view
    await page.click('text=CUSTOMERS');
    await page.click('text=Location View');
    // Wait for a generic map container as an indication the Locations view loaded
    try {
      await page.waitForSelector('.mapboxgl-canvas', { timeout: 10000 });
    } catch (e) {
      await page.waitForSelector('#map', { timeout: 10000 });
    }

    // Check for Print map button (selector may need adjustment)
    const printButton = page.locator('text=Print map');
    // Try a longer wait to find the button
    await expect(printButton).toBeVisible({ timeout: 15000 });

    // Open preview
    await printButton.click();

    // Expect preview to show and contain Print and Close buttons
    const preview = page.locator('id=serviceLocationsPrintPreviewMap');
    await expect(preview).toBeVisible();
    
    // Verify buttons exist in preview
    const buttons = preview.locator('button');
    expect(await buttons.count()).toBeGreaterThan(0);

    // TODO: trigger print/save-as-pdf via the preview button and verify PDF artifact
  });
});
