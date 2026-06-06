import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ClassesPage } from '../pages/classes-page';

test('crudClasses', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const classesPage = new ClassesPage(page);

    const email = "e2e-super-teacher-26@example.com";
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
    const classDataPastYear = {
        ano: '1800',
        serie: '1ª Série / 1º Semestre',
        turno: 'Integral',
        sala: '7',
        descricao: 'C',
    };
    const classDataLongDesc = {
        ano: '2025',
        serie: '1ª Série / 1º Semestre',
        turno: 'Integral',
        sala: '7',
        descricao: 'A'.repeat(500),
    };

    await test.step("loginAndGoToClassesPage", async () => {
        await loginPage.goToLoginPage();
        await loginPage.login(email, password);
        await loginPage.otpCodePage();

        await dashboardPage.userIsLogged();
        await dashboardPage.goToClasses();
    });

    await test.step("createClassHappy", async () => {
        await classesPage.createClass(courseId, classData);
    });

    await test.step("updateClassHappy", async () => {
        await classesPage.updateClass(updatedClassData);
    });

    await test.step("deleteClassHappy", async () => {
        await classesPage.deleteClass(updatedClassData);
    });

    await test.step("createClassSadWithoutCourse", async () => {
        await classesPage.createClassWithoutCourse({
            ano: '2025',
            serie: 'ª Série / 2º Semestre',
            turno: 'Integral',
        });
        await classesPage.expectRequiredFieldError();
        await classesPage.closeModal();
    });

    await test.step("createClassSadWithoutYear", async () => {
        await classesPage.createClassWithoutYear({
            courseId: 'Desenvalvimento de sistemas',
            serie: 'ª Série / 2º Semestre',
            turno: 'Noturno',
            descricao: 'C',
        });
        await classesPage.expectRequiredFieldError();
        await classesPage.closeModal();
    });

    await test.step("createClassEdgeCasePastYear", async () => {
        await classesPage.createClass(courseId, classDataPastYear);
        await classesPage.expectRequiredFieldError();
        await classesPage.closeModal();
    });

    await test.step("createClassEdgeCaseLongDescription", async () => {
        await classesPage.createClass(courseId, classDataLongDesc);
        await classesPage.expectRequiredFieldError();
        await classesPage.closeModal();
    });
});