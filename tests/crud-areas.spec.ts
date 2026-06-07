import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { AreasPage } from '../pages/areas-page';


test('crudAreas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const areasPage = new AreasPage(page);

    const email = "e2e-super-teacher-26@example.com";
    const password = "password";

    const uniqueId = Date.now();
    const areaName = `Tecnologia E2E - ${uniqueId}`;
    const areaNameEdgeCase = `${uniqueId}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
    const updatedAreaName = `Tecnologia E2E - ${uniqueId} (Editada)`;

    await test.step("loginAndGoToAreasPage", async () => {
        await loginPage.goToLoginPage();
        await loginPage.login(email, password);
        await loginPage.otpCodePage();

        await dashboardPage.userIsLogged();
        await dashboardPage.goToAreas();
    });

    await test.step("createAreaHappy", async () => {
        await areasPage.createArea(areaName);
    });

    await test.step("updateAreaHappy", async () => {
        await areasPage.updateArea(areaName, updatedAreaName);
    });
    
    await test.step("deleteAreaHappy", async () => {
        await areasPage.deleteArea(updatedAreaName);
    });


    await test.step("createAreaSad", async () => {
        await areasPage.createAreaSad();
    });

    await test.step("updateAreaSad", async () => {
        await areasPage.createArea(areaName);
        await areasPage.updateAreaSad(areaName);
        await areasPage.deleteArea(areaName);
    });


    await test.step("createAreaEdgeCase255Chars", async () => {
        await areasPage.createAreaEdgeCases(areaNameEdgeCase);
    });

    await test.step("createAreaEdgeCaseDoubleSubmit", async () => {
        await areasPage.createAreaDoubleSubmit(areaName);
    });
});
