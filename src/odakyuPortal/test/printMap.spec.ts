import test, { expect } from '../fixtures/baseTest';
import { userRoleAccessMatrix } from '../../testUserStates';
for (const userRole of userRoleAccessMatrix.adminOnly) {
    test.describe('Print Map - PRT01', () => {
        test.use({ storageState: `userStates/${userRole}UserStorageState.json` });
        test.beforeEach(async ({ routePlannerPage }) => {
            await routePlannerPage.goto();
        });
        test('Print map button opens preview and generates PDF (happy path)', async ({ page }) => {
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
            const printPDF = page.locator('//div/button[contains(text(),"Print PDF")]');
            await printPDF.click();

            // TODO: trigger print/save-as-pdf via the preview button and verify PDF artifact
        });
        test('Print map - No location selected (Happy path)', async ({ page }) => {
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
            const printPDF = page.locator('//div/button[contains(text(),"Print PDF")]');
            await printPDF.click();

            // TODO: trigger print/save-as-pdf via the preview button and verify PDF artifact
        });
        test('Print map - one location selected (Happy path)', async ({ page }) => {
            // Navigate to the Customers / Locations view
            await page.click('text=CUSTOMERS');
            await page.click('text=Location View');
            // Wait for a generic map container as an indication the Locations view loaded
            try {
                await page.waitForSelector('.mapboxgl-canvas', { timeout: 10000 });
            } catch (e) {
                await page.waitForSelector('#map', { timeout: 10000 });
            }
            const addLocation = page.locator('input[name="searchTerm"]');
            await expect(addLocation).toBeVisible();
            await addLocation.fill('Japan, 〒175-0092 Tokyo, Itabashi City, Akatsuka, 1-chōme−8−６ 上野ビル');
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
            const printPDF = page.locator('//div/button[contains(text(),"Print PDF")]');
            await printPDF.click();

            // TODO: trigger print/save-as-pdf via the preview button and verify PDF artifact
        });
        test('Print map - map filters for Map Layer added (Happy path)', async ({ page }) => {
            await page.click('text=CUSTOMERS');
            await page.click('text=Location View');
            // Wait for a generic map container as an indication the Locations view loaded
            try {
                await page.waitForSelector('.mapboxgl-canvas', { timeout: 10000 });
            } catch (e) {
                await page.waitForSelector('#map', { timeout: 10000 });
            }
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).press('ArrowDown');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).press('ArrowDown');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).press('ArrowDown');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).press('ArrowDown');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).press('ArrowDown');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).press('ArrowDown');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).press('ArrowDown');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).press('ArrowDown');
            await page.locator('div:nth-child(7) > .sc-bGIgrQ > .sc-nBRWj > .sc-lajtew').click();
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('label:nth-child(21) > .sc-hGPBjI').click();
            await page.getByRole('button', { name: 'Apply' }).click();
            await page.getByRole('textbox', { name: 'Address', exact: true }).click();
            await page.getByRole('textbox', { name: 'Address', exact: true }).fill('sobudai');
            await page.locator('span').filter({ hasText: 'Sōbudai' }).first().click();
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).press('ArrowDown');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).press('ArrowDown');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).press('ArrowDown');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).press('ArrowDown');
            await page.getByRole('region', { name: 'Map' }).click({
                position: {
                    x: 387,
                    y: 428
                }
            });
            await page.getByRole('region', { name: 'Map' }).press('ArrowDown');
            await page.getByRole('region', { name: 'Map' }).press('ArrowDown');
            await page.getByRole('region', { name: 'Map' }).press('ArrowDown');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).press('ArrowLeft');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).press('ArrowLeft');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).press('ArrowLeft');
            await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).press('ArrowLeft');
            await page.getByRole('region', { name: 'Map' }).click({
                position: {
                    x: 453,
                    y: 386
                }
            });
            await page.getByRole('region', { name: 'Map' }).press('ArrowLeft');
            await page.getByRole('region', { name: 'Map' }).press('ArrowLeft');
            await page.getByRole('region', { name: 'Map' }).press('ArrowLeft');
            await page.locator('.sc-ctqQKy.cYaJTh').click();
            await page.locator('body').press('ArrowUp');
            await page.locator('body').press('ArrowUp');
            await page.locator('body').press('ArrowUp');
            await page.locator('body').press('ArrowUp');
            await page.locator('body').press('ArrowUp');
            await page.locator('body').press('ArrowUp');
            await page.locator('body').press('ArrowUp');
            await page.getByRole('button', { name: 'Print map' }).click();
            const downloadPromise = page.waitForEvent('download');
            await page.getByRole('button', { name: 'Print PDF' }).click();
            const download = await downloadPromise;
        });
    });
}