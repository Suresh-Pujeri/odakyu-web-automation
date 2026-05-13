import test, { expect } from '../fixtures/baseTest';
import { userRoleAccessMatrix } from '../../testUserStates';

for (const userRole of userRoleAccessMatrix.adminOnly) {
  test.describe(`Dispatch -- Dispatch Board tab`, () => {
    test.use({ storageState: `userStates/${userRole}UserStorageState.json` });
    test.beforeEach(async ({ routePlannerPage }) => {
      await routePlannerPage.goto();
    });
    test(`TC_01: should allow ${userRole} to access Dispatch Board`, async ({
      routePlannerPage,
      dispatchBoardPage,
    }) => {
      await routePlannerPage.navigateToRoutePlanner('Dispatch Board');
      await expect(dispatchBoardPage.jobsRoutesSection('Jobs')).toBeVisible();
      await expect(dispatchBoardPage.jobsRoutesSection('Routes')).toBeVisible();
    });
    test(`TC_02: should allow ${userRole} to access Dispatch Board`, async ({
      routePlannerPage,
      dispatchBoardPage,
    }) => {
      await routePlannerPage.navigateToRoutePlanner('Dispatch Board');
      await expect(dispatchBoardPage.jobsRoutesSection('Jobs')).toBeVisible();
      await expect(dispatchBoardPage.jobsRoutesSection('Routes')).toBeVisible();
    });
  });
}
