import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ClassesPage } from '../pages/classes-page';

const email = "e2e-super-teacher-26@example.com";
const password = "password";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goToLoginPage();
    await loginPage.login(email, password);
    await loginPage.otpCodePage();

    await dashboardPage.userIsLogged();
    await dashboardPage.goToClasses();
});

//Caso Feliz 1
test('happyPath_crudClasses', async ({ page }) => {
    const classesPage = new ClassesPage(page);

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

//Caso Feliz 2
test('happyPath_crudClasses_noturno', async ({ page }) => {
    const classesPage = new ClassesPage(page);

    const courseId = "Desenvalvimento de sistemas";
    const classData = {
        ano: '2025',
        serie: '1ª Série / 1º Semestre',
        turno: 'Noturno',
        sala: '3',
        descricao: 'B',
    };
    const updatedClassData = {
        ano: '2025',
        serie: '1ª Série / 2º Semestre',
        turno: 'Noturno',
        sala: '5',
        descricao: 'B',
    };

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

//Caso Triste 1
test('sadPath_createClassWithoutCourse', async ({ page }) => {
    const classesPage = new ClassesPage(page);

    await test.step("tentarCriarTurmaSemCurso", async () => {
        await classesPage.createClassWithoutCourse({
            ano: '2025',
            serie: 'ª Série / 2º Semestre',
            turno: 'Integral',
        });
    });

    await test.step("validarErroDeCursoObrigatorio", async () => {
        await classesPage.expectRequiredFieldError();
        await classesPage.closeModal();
    });
});

//Caso Triste 2
test('sadPath_createClassWithoutYear', async ({ page }) => {
    const classesPage = new ClassesPage(page);

    await test.step("tentarCriarTurmaSemAno", async () => {
        await classesPage.createClassWithoutYear({
            courseId: 'Desenvalvimento de sistemas',
            serie: 'ª Série / 2º Semestre',
            turno: 'Noturno',
            descricao: 'C',
        });
    });

    await test.step("validarErroDeAnoObrigatorio", async () => {
        await classesPage.expectRequiredFieldError();
        await classesPage.closeModal();
    });
});

//Caso de Borda 1
test('edgeCase_createClassWithYearInThePast', async ({ page }) => {
    const classesPage = new ClassesPage(page);

    const courseId = "Desenvalvimento de sistemas";
    const classData = {
        ano: '1800',
        serie: '1ª Série / 1º Semestre',
        turno: 'Integral',
        sala: '7',
        descricao: 'C',
    };

    await test.step("tentarCriarTurmaComAnoNoPassado", async () => {
        await classesPage.createClass(courseId, classData);
    });

    await test.step("validarErroOuComportamento", async () => {
        await classesPage.expectRequiredFieldError();
        await classesPage.closeModal();
    });
});

//Caso de Borda 2
test('edgeCase_createClassWithLongDescription', async ({ page }) => {
    const classesPage = new ClassesPage(page);

    const courseId = "Desenvalvimento de sistemas";
    const classData = {
        ano: '2025',
        serie: '1ª Série / 1º Semestre',
        turno: 'Integral',
        sala: '7',
        descricao: 'A'.repeat(500),
    };

    await test.step("criarTurmaComDescricaoMuitoLonga", async () => {
        await classesPage.createClass(courseId, classData);
    });

    await test.step("validarErroOuTruncamento", async () => {
        await classesPage.expectRequiredFieldError();
        await classesPage.closeModal();
    });
});