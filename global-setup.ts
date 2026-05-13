import setup from './src/odakyuPortal/fixtures/baseTest';
import { userRoleAccessMatrix } from './src/testUserStates';
for (const userRole of userRoleAccessMatrix.allUsers) {
  setup(` setup for ${userRole}`, async ({ page, loginPage }) => {
    console.log(`----BASE URL ---- : https://hauler.qa.ap.odakyu.smartcity.routeware.com/account/login`);
    await loginPage.goto();
    await loginPage.loginWithUserRole(userRole);
    await page.context().storageState({ path: `userStates/${userRole}UserStorageState.json` });
  });
}
