import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ClassesPage } from '../pages/classes-page';

test('crudClasses', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const classesPage = new ClassesPage(page);

    const email = "e2e-super-teacher-08@example.com";
    const password = "password";

    const courseId = "Desenvalvimento de sistemas";
    const classData = {
        ano: '2024',
        serie: '1ª Série / 1º Semestre',
        turno: 'Integral',
        sala: '7',
        descricao: 'C',
    };
    const updatedClassData = {
        ano: '2026',
        serie: '1ª Série / 2º Semestre',
        turno: 'Matutino',
        sala: '11',
        descricao: 'A',
    };

    await test.step("loginAndGoToClassesPage", async () => {
        await loginPage.goToLoginPage();
        await loginPage.login(email, password);
        await loginPage.otpCodePage();

        await dashboardPage.userIsLogged();
        await dashboardPage.goToClasses();
    });

    await test.step("createClass", async () => {
        await classesPage.createClass(courseId, classData);
    });

    await test.step("updateClass", async () => {
        await classesPage.updateClass(updatedClassData);
    });

    await test.step("deleteClass", async () => {
        await classesPage.deleteClass();
    });
});