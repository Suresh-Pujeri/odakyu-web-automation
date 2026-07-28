import { test as baseTest } from '@playwright/test';
import LoginPage from '../../login';
import RoutePlannerPage from '../models/RoutePlanner';
import DispatchBoardPage from '../models/DispatchBoard';
import MapShapesPage from '../models/MapShapes';
import InsightsDataExportPage from '../models/InsightsDataExport';


const test = baseTest.extend<{
  loginPage: LoginPage;
  routePlannerPage: RoutePlannerPage;
  dispatchBoardPage: DispatchBoardPage;
  mapShapesPage: MapShapesPage;
  insightsDataExportPage:InsightsDataExportPage
 
}>({
  loginPage: async ({ page }, use, testInfo) => {
    const loggedInState = `userStates/${testInfo.title}UserStorageState.json`;
    const loggedOutState = `userStates/${testInfo.title}LoggedOutStorageState.json`;
    const loginPage = new LoginPage(page, loggedInState, loggedOutState);
    await use(loginPage);
  },
  routePlannerPage: async ({ page }, use) => {
    const routePlannerPage = new RoutePlannerPage(page);
    await use(routePlannerPage);
  },
  dispatchBoardPage: async ({ page }, use) => {
    const dispatchBoardPage = new DispatchBoardPage(page);
    await use(dispatchBoardPage);
  },
  mapShapesPage: async ({ page }, use) => {
    const mapShapesPage = new MapShapesPage(page);
    await use(mapShapesPage);
  },
  insightsDataExportPage:async({page},use)=>{
    const insightsDataExportPage=new InsightsDataExportPage(page);
    await use(insightsDataExportPage);
  },
  
});
export default test;
export const expect = test.expect;
