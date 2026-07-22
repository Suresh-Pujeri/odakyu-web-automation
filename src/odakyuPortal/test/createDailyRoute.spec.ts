import { Page } from '@playwright/test';
import test, { expect } from '../fixtures/baseTest';
import { userRoleAccessMatrix } from '../../testUserStates';


// ----------------------------------------------------------------------------
// Config — edit these to match your environment / desired values.
// ----------------------------------------------------------------------------


const stamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, '')
    .slice(0, 14); // YYYYMMDDHHmmss-ish

const ROUTE = {
    name: `DailyRoute_${stamp}`,
    description: 'Test',
    vehicleType: 'Commercial',            // Commercial | Delivery / Utility | Residential
    vehicle: 'Andrei CH Comm 1 Y',        // must exist under the chosen Vehicle Type
    wasteType: '雑がみ',                   // stops below MUST carry this waste type
    startingLocation: '4101 calloway drive',
    endingLocation: 'FacilityTestSVPQA',
    serviceZone: 'Zone 1',
    driver: 'John Cena',
    supervisor: 'Andrei Supervisor 1',
    helper: 'Assisting Crew',             // optional; set to '' to skip
};

const routeDate = new Date();                         // today
const rescheduleDate = new Date(Date.now() + 864e5);  // tomorrow

// Stops to add during create. Each `search` is typed; `option` is the exact
// option text that appears. Keep the waste type equal to ROUTE.wasteType.
const STOPS = [
    { search: '***', option: '1BG - HPU - 雑がみ' },
];

// One extra stop added during the Edit phase.
const EDIT_ADD_STOP = { search: '***', option: '1BG - HPU - 雑がみ' };

// Destructive: clicks the final "Yes" on the delete dialog. Leave false unless
// you really want the route removed at the end of the run.
const DO_DELETE = false;

// ----------------------------------------------------------------------------
// Auth — reuse a saved logged-in session.
// ----------------------------------------------------------------------------
test.use({ storageState: 'auth.json' });

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

/** "Friday, 26 June 2026" — matches the calendar gridcell aria-label. */
function dayLabel(d: Date): string {
    return new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(d);
}

/**
 * Open a react-select by clicking its placeholder/label text (the field shows
 * the label until a value is chosen), then click the option by exact text.
 * Re-reads the option from the live listbox, so it tolerates async loading.
 */
async function chooseDropdown(page: Page, label: string, option: string) {
    await page.getByText(label, { exact: true }).first().click();
    const opt = page.getByText(option, { exact: true });
    await opt.first().waitFor({ state: 'visible' });
    await opt.first().click();
    // Confirm the field committed the value.
    await expect(page.getByText(option, { exact: true }).first()).toBeVisible();
}

/** Pick a date from the open react-datepicker calendar grid by aria-label. */
async function pickDate(page: Page, openLabelOrTrigger: () => Promise<void>, d: Date) {
    await openLabelOrTrigger();
    const cell = page.getByRole('gridcell', { name: dayLabel(d) });
    await cell.waitFor({ state: 'visible' });
    await cell.click();
}

/**
 * Add one stop: type to search the Customer/Location combobox, pick the option
 * (must match the route waste type), then click Add Stop.
 */
async function addStop(page: Page, search: string, option: string) {
    const combo = page.getByText('Customer / Location', { exact: true }).first();
    await combo.click();
    await expect(page.locator('//button[text()="Add Stop"]')).toBeDisabled(); // disabled until a stop is selected
    // The combobox input is the focused element; clear it robustly then type.
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(search);

    const opt = page.getByText(option, { exact: true });
    await opt.first().waitFor({ state: 'visible' }); // waits past "Loading…"
    await opt.first().click();
    await expect(page.locator('//button[text()="Add Stop"]')).toBeEnabled(); // enabled once a stop is selected
    await page.locator('//button[text()="Add Stop"]').click();
    await expect(page.locator(`//*[text()='1 stop successfully added. Please save the route to complete the add process.']`).first()).toBeVisible();
}

// ----------------------------------------------------------------------------
// The lifecycle
// ----------------------------------------------------------------------------
for (const userRole of userRoleAccessMatrix.adminOnly) {
    test.use({ storageState: `userStates/${userRole}UserStorageState.json` });
    test.beforeEach(async ({ routePlannerPage }) => {
        await routePlannerPage.goto();
    });
    test('Daily Route — full lifecycle', async ({ page }) => {
        test.setTimeout(180_000);

        // --- Phase 1: open the Create Daily Route form ---------------------------
        await test.step('navigate to Create Daily Route', async () => {
            //await page.goto(`${BASE_URL}/dashboard/all-ops`);
            await expect(page.getByRole('link', { name: 'Dispatch' })).toBeVisible(); // not logged out
            await page.getByRole('link', { name: 'Dispatch' }).click();
            await page.getByRole('link', { name: 'Route Planner' }).click();
            await page.getByRole('button', { name: 'Plan A Route' }).click();
            await page.getByText('Daily Route', { exact: true }).click();
            await expect(page).toHaveURL(/\/routes\/route-tracker\/create/);
        });

        // --- Phase 2: fill the route header --------------------------------------
        await test.step('fill route header', async () => {
            await page.locator('input[name="routeName"]').fill(ROUTE.name);

            // Click the calendar input to open the date picker
            await page.locator('input[name="routeDate"]').click();
            // Select the current day matching today's date number
            const today = new Date().getDate().toString();
            await page.locator('.DayPicker-Week .DayPicker-Day.DayPicker-Day--today', { hasText: today }).click();

            await page.locator('input[name="description"]').fill(ROUTE.description);
            await page.locator(`//label[contains(text(),'Vehicle Type')]/parent::div/descendant::input[@id="vehicleTypeId"]`).click();
            await page.locator(`//div[contains(@id, 'react-select')]`).filter({ hasText: ROUTE.vehicleType }).click();
            await page.locator(`//label[contains(text(),'Vehicle')]/parent::div/descendant::input[@id="vehicleId"]`).click();
            await page.locator(`//div[contains(@id, 'react-select')]`).nth(3).click();
            await page.locator(`//label[contains(text(),'Waste Type')]/parent::div/descendant::input[@id="wasteMaterialTypeId"]`).click();
            await page.locator(`//div[contains(@id, 'react-select')]`).nth(2).click();
            await page.locator(`//label[contains(text(),'Starting location')]/parent::div/descendant::input[@id="startingLocationId"]`).click();
            await page.locator(`//div[contains(@id, 'react-select')]`).nth(1).click();
            //await page.locator(`//label[contains(text(),'Ending Location')]/parent::div/descendant::input[@id="endingLocationId"]`).click();
            //await page.locator(`//div[contains(@id, 'react-select')]`).nth(3).click();
            await page.locator(`//label[contains(text(),'Service Zone')]/parent::div/descendant::input[@id="vendorServiceZoneId"]`).click();
            await page.locator(`//div[contains(@id, 'react-select')]`).nth(3).click();

            await page.locator(`//label[contains(text(),'')]/parent::div/descendant::input[@id="driverId"]`).click();
            await page.locator(`//div[contains(@id, 'react-select')]`).nth(4).click();

            await page.locator(`//label[contains(text(),'')]/parent::div/descendant::input[@id="supervisorId"]`).click();
            await page.locator(`//div[contains(@id, 'react-select')]`).first().click();

            await page.locator(`//*[@name="workerIds"]`).click();
            await page.locator(`//*[@name="workerIds"]/parent::div/descendant::label`).last().click();
            await page.locator(`//button[contains(text(),'Apply')]`).click();
            await page.keyboard.press('Escape');
            await expect(page.locator(`//label[contains(.,'This is a test route')]`)).toBeVisible();
            await page.locator(`//label[contains(.,'This is a test route')]`).click();
        });

        // --- Phase 3: add stops ---------------------------------------------------
        await test.step('add stops', async () => {
            for (const s of STOPS) {
                await addStop(page, s.search, s.option);
            }
            // Verify at least one stop landed (empty list shows this text).
            await expect(page.getByText('There are no route stops')).toHaveCount(0);
        });

        // --- Phase 4: save --------------------------------------------------------
        let routeId = '';
        await test.step('save route', async () => {
            await page.locator('#route-save-button').click();
            await expect(page).toHaveURL(/\/routes\/route-tracker\/\d+/);
            routeId = page.url().match(/route-tracker\/(\d+)/)?.[1] ?? '';
            expect(routeId).not.toBe('');
            console.log(`Saved route id: ${routeId}`);
        });

        // --- Phase 5: edit stops (add one, delete one) ---------------------------
        await test.step('edit stops — add', async () => {
            await page.getByRole('button', { name: 'Edit Stops' }).click();
            await addStop(page, EDIT_ADD_STOP.search, EDIT_ADD_STOP.option);
            await expect(page.locator(`button span svg[preserveAspectRatio="xMidYMid meet"] path[fill="currentColor"]`).last()).toBeVisible(); // dropdown is open

            await page.locator(`button span svg[preserveAspectRatio="xMidYMid meet"] path[fill="currentColor"]`).last().click(); // close the dropdown
            await expect(page.locator(`//*[text()='1 stop successfully deleted. Please save the route to complete the deletion process.']`)).toBeVisible();
            //await page.getByRole('button', { name: 'Edit Stops' }).click();
            await addStop(page, EDIT_ADD_STOP.search, EDIT_ADD_STOP.option);
            await expect(page.locator(`//button[text()='Save']`)).toBeVisible();
            await page.locator(`//button[text()='Save']`).click();
            await expect(page.locator(`//*[text()='The stops were saved successfully.']`)).toBeVisible();
        });

        // --- Phase 6: sequence ----------------------------------------------------
        await test.step('sequence route', async () => {
            await page.locator('#more-button-more-button').click();
            await page.locator('#sequence-route-button').click();
            await page.getByRole('button', { name: 'Yes' }).click();
            await page.locator('#confirm-sequence-route-button').click();
            await expect(page.locator(`//*[text()='Route Sequence Request is Processing']`)).toBeVisible();
            await page.locator(`button g[fill-rule="evenodd"]`).click(); // close the modal
        });

        // --- Phase 7: reschedule --------------------------------------------------
        await test.step('reschedule route', async () => {
            await page.getByPlaceholder('Search').fill(ROUTE.name);
            await page.locator('#search-route-button').click();
            await expect(page.locator(`//input[contains(@id,'route')]/parent::label/span`).first()).toBeVisible();
            await page.locator(`//input[contains(@id,'route')]/parent::label/span`).first().click();

            await expect(page.locator('#delete-route-button')).toBeVisible();
            await expect(page.locator('#reschedule-route-button')).toBeVisible();

            // Open the row's delete control, then confirm.
            await page.locator('#delete-route-button').click();
            await expect(page.locator(`//span[text()='Are you sure you want to delete these routes?']`)).toBeVisible();
            await page.getByRole('button', { name: 'Yes' }).click();

            // Verify removal.
            await page.locator('#search-route-button').click();
            await expect(page.getByText(ROUTE.name)).toHaveCount(0);
        });

    });
}