import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { CoursesPage } from '../pages/courses-page';

test('crudCourses', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const coursesPage = new CoursesPage(page);

    const email = "e2e-super-teacher-08@example.com";
    const password = "password";

    const courseName = "Massoterapia";
    const updatedCourseName = "Informática";

    await test.step("loginAndGoToCoursesPage", async () => {
        await loginPage.goToLoginPage();
        await loginPage.login(email, password);
        await loginPage.otpCodePage();

        await dashboardPage.userIsLogged();
        await dashboardPage.goToCourses();
    });

    await test.step("createCourse", async () => {
        await coursesPage.createCourse(courseName, 'Técnico');
    });

    await test.step("updateCourse", async () => {
        await coursesPage.updateCourse(updatedCourseName, 'Tecnólogo');
    });

    await test.step("deleteCourse", async () => {
        await coursesPage.deleteCourse();
    });
});