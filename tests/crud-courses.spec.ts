import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { CoursesPage } from '../pages/courses-page';

const email = "e2e-super-teacher-26@example.com";
const password = "password";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goToLoginPage();
    await loginPage.login(email, password);
    await loginPage.otpCodePage();

    await dashboardPage.userIsLogged();
    await dashboardPage.goToCourses();
});

//Caso Feliz 1
test('happyPath_crudCourse', async ({ page }) => {
    const coursesPage = new CoursesPage(page);

    await test.step("createCourse", async () => {
        await coursesPage.createCourse('Massoterapia', 'Técnico');
    });

    await test.step("updateCourse", async () => {
        await coursesPage.updateCourse('Informática', 'Tecnólogo');
    });

    await test.step("deleteCourse", async () => {
        await coursesPage.deleteCourse();
    });
});

//Caso Feliz 2
test('happyPath_crudCourse_longName', async ({ page }) => {
    const coursesPage = new CoursesPage(page);

    await test.step("createCourse", async () => {
        await coursesPage.createCourse('Tecnologia em Análise e Desenvolvimento de Sistemas', 'Tecnólogo');
    });

    await test.step("updateCourse", async () => {
        await coursesPage.updateCourse('Tecnologia em Análise e Desenvolvimento de Sistemas Atualizado', 'Extensão');
    });

    await test.step("deleteCourse", async () => {
        await coursesPage.deleteCourse();
    });
});

//Caso Triste 1
test('sadPath_createCourseWithoutName', async ({ page }) => {
    const coursesPage = new CoursesPage(page);

    await test.step("tentarCriarCursoSemNome", async () => {
        await coursesPage.createCourseWithoutName('Extensão');
    });

    await test.step("validarErroDeNomeObrigatorio", async () => {
        await coursesPage.expectRequiredFieldError();
    });
});

//Caso Triste 2
test('sadPath_createCourseWithoutLevel', async ({ page }) => {
    const coursesPage = new CoursesPage(page);

    await test.step("tentarCriarCursoSemNivel", async () => {
        await coursesPage.createCourseWithoutLevel('Contabilidade');
    });

    await test.step("validarErroDeNivelObrigatorio", async () => {
        await coursesPage.expectRequiredFieldError();
    });
});

//Caso de Borda 1
test('edgeCase_createCourseWithDuplicateName', async ({ page }) => {
    const coursesPage = new CoursesPage(page);

    await test.step("criarPrimeiroCurso", async () => {
        await coursesPage.createCourse('Desenvolvimento de sistemas', 'Técnico');
    });

    await test.step("tentarCriarCursoDuplicado", async () => {
        await coursesPage.createCourse('Desenvolvimento de sistemas', 'Técnico');
    });

    await test.step("validarErroOuComportamento", async () => {
        await coursesPage.expectRequiredFieldError();
    });
});

//Caso de Borda 2
test('edgeCase_createCourseWithBlankName', async ({ page }) => {
    const coursesPage = new CoursesPage(page);

    await test.step("tentarCriarCursoComEspacosEmBranco", async () => {
        await coursesPage.createCourseWithBlankName('Licenciatura');
    });

    await test.step("validarErroDeNomeEmBranco", async () => {
        await coursesPage.expectRequiredFieldError();
        await coursesPage.closeModal();
    });
});