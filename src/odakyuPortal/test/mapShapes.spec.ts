import test, { expect } from '../fixtures/baseTest';
import { userRoleAccessMatrix } from '../../testUserStates';

for (const userRole of userRoleAccessMatrix.adminOnly) {
  test.describe(`Fleet -- Map Shapes tab`, () => {
    test.use({ storageState: `userStates/${userRole}UserStorageState.json` });
    test.beforeEach(async ({ routePlannerPage }) => {
      await routePlannerPage.goto();
    });
    test(`TC_01: should allow ${userRole} to access Map Shapes - Fleet `, async ({
      mapShapesPage,
    }) => {
      await mapShapesPage.navigateToMapShapes('Map Shapes');
      await expect(mapShapesPage.elements.addPolygonLayerBtn).toBeVisible();
      await expect(mapShapesPage.elements.mapShapesHeaderText).toBeVisible();
    });
    test(`TC_02: should allow ${userRole} to create Map Shapes alyer`, async ({
      mapShapesPage,
    }) => {
      await mapShapesPage.navigateToMapShapes('Map Shapes');
      await expect(mapShapesPage.elements.searchByLayerName).toBeVisible();
      const layerName:string=`TestAutomation-${Date.now()}`;
      await mapShapesPage.clickAddLayerButton(layerName);
      await expect(mapShapesPage.elements.clickEditMapLayerText).toBeVisible();
      //await expect(mapShapesPage.elements.editModeIcon).toBeVisible();
      await mapShapesPage.clickEditIcon();
      await expect(mapShapesPage.elements.mapLayersBtn.nth(0)).toBeVisible();
      await expect(mapShapesPage.elements.mapLayersBtn.nth(1)).toBeVisible();
      await expect(mapShapesPage.elements.mapLayersBtn.nth(2)).toBeVisible();
      await expect(mapShapesPage.elements.mapLayersBtn.nth(3)).toBeVisible();
      await mapShapesPage.addMapShapesLayers();
      await expect(mapShapesPage.shapesOptions('Draw line')).toBeVisible();
      await expect(mapShapesPage.shapesOptions('Arrow line')).toBeVisible();
      await expect(mapShapesPage.shapesOptions('Circle')).toBeVisible();
      await expect(mapShapesPage.shapesOptions('Draw polygon')).toBeVisible();
      //await mapShapesPage.drawShapesAndSave();
      await mapShapesPage.addEDit();
  
    });
  });
}
