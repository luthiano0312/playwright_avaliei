import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { SubjectsPage } from '../pages/subjects-pages';


test('crudSubjects', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const subjectsPage = new SubjectsPage(page);

    const email = "e2e-super-teacher-26@example.com";
    const password = "password";

    const uniqueId = Date.now();
    const areaName = "Formação técnica e profissional";
    const subjectName = `Tecnologia E2E - ${uniqueId}`;
    const subjectNameEdgeCase = `${uniqueId}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
    const updatedSubjectName = `Tecnologia E2E - ${uniqueId} (Editada)`;

    await test.step("loginAndGoToSubjectsPage", async () => {
        await loginPage.goToLoginPage();
        await loginPage.login(email, password);
        await loginPage.otpCodePage();

        await dashboardPage.userIsLogged();
        await dashboardPage.goToSubjects();
    });

    await test.step("createSubject", async () => {
        await subjectsPage.createSubject(subjectName, areaName);
    });

    await test.step("updateSubject", async () => {
        await subjectsPage.updateSubject(subjectName, updatedSubjectName);
    });
    
    await test.step("deleteSubject", async () => {
        await subjectsPage.deleteSubject(updatedSubjectName);
    });

    await test.step("createSubjectSad", async () => {
        await subjectsPage.createSubjectSad(subjectName, areaName);
    });

    await test.step("updateSubjectSad", async () => {
        await subjectsPage.createSubject(subjectName, areaName);
        await subjectsPage.updateSubjectSad(subjectName);
        await subjectsPage.deleteSubject(subjectName);
    });

    await test.step("createSubjectEdgeCases255Chars", async () => {
        await subjectsPage.createSubjectEdgeCases(subjectNameEdgeCase, areaName);
    });

    await test.step("createSubjectEdgeCasesDoubleSubmit", async () => {
        await subjectsPage.createSubjectEdgeCasesDoubleSubmit(subjectName, areaName);
    });
});
