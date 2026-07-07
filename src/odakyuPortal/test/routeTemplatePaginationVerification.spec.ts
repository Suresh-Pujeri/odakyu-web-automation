import { Page } from '@playwright/test';
import { userRoleAccessMatrix } from '../../testUserStates';
import test, { expect } from '../fixtures/baseTest';

/**
 * Route Planner (route-templates) navigation smoke test — DEV environment.
 * Generated from a recorded click-through. Stable element IDs captured by the
 * recorder are preferred over text/class selectors.
 *
 * Omitted as recorder noise: the accidental header clicks on
 * `div.sc-fpyFWH.hKyZPM` (auto-generated styled-components class) and the stray
 * "Press Shift" — they carry no assertion value and the class is unstable.
 *
 * Auth: needs a logged-in DEV session. Generate one with:
 *   npx playwright codegen --save-storage=auth.dev.json \
 *     https://hauler.dev.ap.odakyu.smartcity.routeware.com/routes/route-tracker
 * then point HAULER_DEV_STORAGE_STATE at it (or rename to auth.json).
 */

// const DEV_BASE =
//   process.env.HAULER_DEV_BASE_URL ??
//   'https://hauler.dev.ap.odakyu.smartcity.routeware.com';

// test.use({
//   baseURL: DEV_BASE,
//   storageState: process.env.HAULER_DEV_STORAGE_STATE ?? 'auth.json',
// });

// ---- helpers ---------------------------------------------------------------

/** Open a route template by its captured name element id, assert the detail URL. */
async function openTemplate(page: Page, nameId: string, templateId: number) {
    await page.locator(`#${nameId}`).click();
    await expect(page).toHaveURL(
        new RegExp(`/routes/route-templates/${templateId}(?:[/?#]|$)`),
    );
}

/** Click the back-button svg and assert we returned to the expected URL. */
async function goBack(page: Page, expected: RegExp) {
    await page.locator('#back-button').click();
    await expect(page).toHaveURL(expected);
}

/** Click a pagination link by its label and assert the ?page=N query. */
async function gotoPage(page: Page, label: string, pageNum: number) {
    await page.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`[?&]page=${pageNum}(?:[&#]|$)`));
}

// ---- test ------------------------------------------------------------------
for (const userRole of userRoleAccessMatrix.adminOnly) {
    test.describe('Route Planner navigation (DEV)', () => {
        test.use({ storageState: `userStates/${userRole}UserStorageState.json` });
        test.beforeEach(async ({ routePlannerPage }) => {
            await routePlannerPage.goto();
        });
        test('paginate route templates, open/edit, and go back', async ({ page, routePlannerPage }) => {
            test.slow();

            await test.step('Open site and go to Route Planner', async () => {
                await routePlannerPage.navigateToRoutePlanner('Route Planner');
                await expect(page).toHaveURL(/\/routes\/route-templates(?:[/?#]|$)/);
            });

            await test.step('Page 2 -> open "Andrei Location Pin 1" -> Edit -> back', async () => {
                // 4. Next -> page 2
                await gotoPage(page, 'Next', 2);
                await expect(page.locator(`//div[contains(@id, 'route-template-') and contains(@id, '-name')]`).nth(6)).toBeVisible();
                // 5. Open route template 15166
                await page.locator(`//div[contains(@id, 'route-template-') and contains(@id, '-name')]`).nth(6).click();
                const url = page.url();
                const match = url.match(/\d+/);
                const number = match ? match[0] : null;

                // 6. Edit
                await page.locator('#edit-route-template-button').click();
                await expect(page).toHaveURL(new RegExp(`/routes\/route-templates\/${number}\/edit$`));
                // 7. Back to the detail page
                await goBack(page, new RegExp(`/routes\/route-templates\/${number}`));
                await page.locator('#back-button').click();
                await expect(page).toHaveURL(/\/routes\/route-templates(?:[/?#]|$)/);
            });

            await test.step('Page 7 -> open "Oradea Comm Home" -> back', async () => {
                // 8. Page 7
                await gotoPage(page, '7', 7);
                
                await expect(page.locator(`//div[contains(@id, 'route-template-') and contains(@id, '-name')]`).nth(6)).toBeVisible();
                // 5. Open route template 15166
                await page.locator(`//div[contains(@id, 'route-template-') and contains(@id, '-name')]`).nth(6).click();
                const url = page.url();
                const match = url.match(/\d+/);
                const number = match ? match[0] : null;

                // 6. Edit
                await page.locator('#edit-route-template-button').click();
                await expect(page).toHaveURL(new RegExp(`/routes\/route-templates\/${number}\/edit$`));
                // 7. Back to the detail page
                await goBack(page, new RegExp(`/routes\/route-templates\/${number}`));
                await page.locator('#back-button').click();
                await expect(page).toHaveURL(/\/routes\/route-templates(?:[/?#]|$)/);
            });

            await test.step('Page 10 -> open "Shatan-B-MonMihai" -> Edit -> back', async () => {
                // 13. Page 10
                await gotoPage(page, '10', 10);
                await expect(page.locator(`//div[contains(@id, 'route-template-') and contains(@id, '-name')]`).nth(6)).toBeVisible();
                // 5. Open route template 15166
                await page.locator(`//div[contains(@id, 'route-template-') and contains(@id, '-name')]`).nth(6).click();
                const url = page.url();
                const match = url.match(/\d+/);
                const number = match ? match[0] : null;

                // 6. Edit
                await page.locator('#edit-route-template-button').click();
                await expect(page).toHaveURL(new RegExp(`/routes\/route-templates\/${number}\/edit$`));
                // 7. Back to the detail page
                await goBack(page, new RegExp(`/routes\/route-templates\/${number}`));
                await page.locator('#back-button').click();
                await expect(page).toHaveURL(/\/routes\/route-templates(?:[/?#]|$)/);
 
            });
        });
    });
}