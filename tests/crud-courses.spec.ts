import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { CoursesPage } from '../pages/courses-page';

test('crudCourses', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const coursesPage = new CoursesPage(page);

    const email = "e2e-super-teacher-26@example.com";
    const password = "password";

    await test.step("loginAndGoToCoursesPage", async () => {
        await loginPage.goToLoginPage();
        await loginPage.login(email, password);
        await loginPage.otpCodePage();

        await dashboardPage.userIsLogged();
        await dashboardPage.goToCourses();
    });

    await test.step("createCourseHappy", async () => {
        await coursesPage.createCourse('Massoterapia', 'Técnico');
    });

    await test.step("updateCourseHappy", async () => {
        await coursesPage.updateCourse('Informática', 'Tecnólogo');
    });

    await test.step("deleteCourseHappy", async () => {
        await coursesPage.deleteCourse();
    });

    await test.step("createCourseSadWithoutName", async () => {
        await coursesPage.createCourseWithoutName('Extensão');
        await coursesPage.expectRequiredFieldError();
        await coursesPage.closeModal();
    });

    await test.step("createCourseSadWithoutLevel", async () => {
        await coursesPage.createCourseWithoutLevel('Contabilidade');
        await coursesPage.expectRequiredFieldError();
        await coursesPage.closeModal();
    });

    await test.step("createCourseEdgeCaseDuplicateName", async () => {
        await coursesPage.createCourse('Desenvolvimento de sistemas', 'Técnico');
        await coursesPage.createCourse('Desenvolvimento de sistemas', 'Técnico');
        await coursesPage.expectRequiredFieldError();
        await coursesPage.closeModal();
        await coursesPage.deleteCourse();
    });

    await test.step("createCourseEdgeCaseBlankName", async () => {
        await coursesPage.createCourseWithBlankName('Licenciatura');
        await coursesPage.expectRequiredFieldError();
        await coursesPage.closeModal();
    });
});