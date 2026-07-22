import test, { expect } from '../fixtures/baseTest';
import { userRoleAccessMatrix } from '../../testUserStates';
import path from 'path';
import fs from 'fs';
import moment from 'moment';

for (const userRole of userRoleAccessMatrix.adminOnly) {
    test.describe('Insights Data Export', () => {
        test.use({ storageState: `userStates/${userRole}UserStorageState.json` });
        test.beforeEach(async ({ routePlannerPage }) => {
            await routePlannerPage.goto();
        });
        test('TC_01 : Verify Data exports for all reports under Insights tab (happy path- Customer Export)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Customer Export';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);

            // const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);

            // // Dynamically poll the text content and automatically reload if not completed
            // await expect.poll(async () => {
            //     const status = await statusLocator.textContent();

            //     if (status?.trim() === 'Completed') {
            //         await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate)).toBeVisible();
            //         return true;
            //     }

            //     // Trigger reload if status is not completed yet
            //     await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            //     return false;
            // }, {
            //     // Options for the dynamic wait
            //     message: 'Report status did not change to Completed.',
            //     intervals: [15000, 15000, 25000], // Wait intervals between retries (2s, then 5s, then 10s)
            //     timeout: 60000 // Maximum total time to wait (e.g., 60 seconds)
            // }).toBe(true);

            // // Final visibility verification
            // await expect(statusLocator).toBeVisible();
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();

        });
        test('TC_02 : Verify Data exports for all reports under Insights tab (happy path- Daily Commercial Route Summary)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Daily Commercial Route Summary';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });
        test('TC_03 : Verify Data exports for all reports under Insights tab (happy path- Daily Residential Route Summary)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Daily Residential Route Summary';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });
        test('TC_04 : Verify Data exports for all reports under Insights tab (happy path- Daily Route Details)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Daily Route Details';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });
        test('TC_05 : Verify Data exports for all reports under Insights tab (happy path- Delivery Utility Job History)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Delivery Utility Job History';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });

        test('TC_07 : Verify Data exports for all reports under Insights tab (happy path- Disposals Report)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Disposals Report';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });
        test('TC_08 : Verify Data exports for all reports under Insights tab (happy path- Fuel Tickets)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Fuel Tickets';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });
        test('TC_09 : Verify Data exports for all reports under Insights tab (happy path- Insight History)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Insight History';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });
        test('TC_10 : Verify Data exports for all reports under Insights tab (happy path- Location Alerts)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Location Alerts';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });
        test('TC_11 : Verify Data exports for all reports under Insights tab (happy path- Pickup Report)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Pickup Report';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });
        test('TC_12 : Verify Data exports for all reports under Insights tab (happy path- Pre / Post Trip)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Pre / Post Trip';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });
        test('TC_13 : Verify Data exports for all reports under Insights tab (happy path- Residential Route Confirmation)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Residential Route Confirmation';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });
        test('TC_14 : Verify Data exports for all reports under Insights tab (happy path- Unserviced Stops For Residential)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Unserviced Stops For Residential';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });
        test('TC_15 : Verify Data exports for all reports under Insights tab (happy path- Snow Route Summary)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Snow Route Summary';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });
        test('TC_16 : Verify Data exports for all reports under Insights tab (happy path- Safety)', async ({ page, insightsDataExportPage }) => {
            const reportType = 'Safety';
            // Navigate to the Customers / Locations view
            await insightsDataExportPage.navigateToDataExportPage('Data Export');
            await insightsDataExportPage.switchToNewLink();
            //await expect(insightsDataExportPage.elements.createExportText).toBeVisible();
            await insightsDataExportPage.slectReportType(reportType);
            const reportDate = moment().format('MM/DD/YYYY');
            //await insightsDataExportPage.verifyReportExportedStatusCompleted1(reportType, reportDate);
            const statusLocator = insightsDataExportPage.reportTypeStatus(reportType, reportDate).nth(2);
            const maxStartTime = Date.now();
            const timeout = 60000;
            let isCompleted = false;

            while (Date.now() - maxStartTime < timeout) {
                const status = await statusLocator.textContent();

                if (status?.trim() === 'Completed') {
                    isCompleted = true;
                    break;
                }

                // Dynamic wait before reloading
                await insightsDataExportPage.page.reload({ waitUntil: 'domcontentloaded' });
            }

            // Assert the final expected outcomes
            expect(isCompleted).toBe(true);
            await expect(insightsDataExportPage.reportTypeDownloadIcon(reportType, reportDate).first()).toBeVisible();
        });

    });
}