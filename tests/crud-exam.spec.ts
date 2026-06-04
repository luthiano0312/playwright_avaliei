import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ExamsPage } from '../pages/exams-page';

const email = "e2e-super-teacher-48@example.com";
const password = "password";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goToLoginPage();
    await loginPage.login(email, password);
    await loginPage.otpCodePage();

    await dashboardPage.userIsLogged();
    await dashboardPage.goToExams();
});

//Caso Feliz 1
test('happyPath_crudExam', async ({ page }) => {
    const examsPage = new ExamsPage(page);

    await test.step("createExam", async () => {
        await examsPage.createExam({
            descricao: 'Prova bimestral 2 bimestre e naturezas',
            turma: '2º A | informatica | Noturno',
            marcador: '2º Bimestre',
            ordenacao: 'Misturar questões do bloco',
            qtdOrdenacoes: '(Azul | Branco | Rosa | Verde)',
            data: 'terça-feira, 23 de junho de',
            area: 'Ciências da natureza e suas',
            professor: 'E2e Super Teacher',
            disciplina: 'Biologia',
            qtdQuestoes: '10',
        });
    });

    await test.step("updateExam", async () => {
        await examsPage.updateExam({
            qtdOrdenacoes: '(Azul | Branco | Rosa)',
        });
    });

    await test.step("deleteExam", async () => {
        await examsPage.deleteExam();
    });
});

//Caso Feliz 2
test('happyPath_crudExam_2', async ({ page }) => {
    const examsPage = new ExamsPage(page);

    await test.step("createExam", async () => {
        await examsPage.createExam({
            descricao: 'Avaliação parcial 1 bimestre',
            turma: '2º A | informatica | Noturno',
            marcador: '1º Bimestre',
            ordenacao: 'Misturar questões do bloco',
            qtdOrdenacoes: null,
            data: 'sábado, 27 de junho de',
            area: 'Ciências da natureza e suas',
            professor: 'E2e Super Teacher',
            disciplina: 'Biologia',
            qtdQuestoes: '15',
        });
    });

    await test.step("updateExam", async () => {
        await examsPage.updateExam({
            modo: 'Convencional',
            data: 'terça-feira, 30 de junho de',
        });
    });

    await test.step("deleteExam", async () => {
        await examsPage.deleteExam();
    });
});

//Caso Triste 1
test('sadPath_createExamWithoutDescription', async ({ page }) => {
    const examsPage = new ExamsPage(page);

    await test.step("tentarCriarAvaliacaoSemDescricao", async () => {
        await examsPage.createExamWithoutDescription({
            turma: '2º A | informatica | Noturno',
            marcador: '1º Bimestre',
        });
    });

    await test.step("validarErroDeDescricaoObrigatoria", async () => {
        await examsPage.expectRequiredFieldError();
    });
});

//Caso Triste 2
test('sadPath_createExamWithoutClass', async ({ page }) => {
    const examsPage = new ExamsPage(page);

    await test.step("tentarCriarAvaliacaoSemTurma", async () => {
        await examsPage.createExamWithoutClass({
            descricao: 'Avaliação sem turma',
            marcador: '1º Bimestre',
        });
    });

    await test.step("validarErroTurmaObrigatoria", async () => {
        await examsPage.expectRequiredFieldError();
    });
});

//Caso de Borda 1
test('edgeCase_createExamWithBlankDescription', async ({ page }) => {
    const examsPage = new ExamsPage(page);

    await test.step("tentarCriarAvaliacaoComDescricaoEmBranco", async () => {
        await examsPage.createExamWithBlankDescription({
            turma: '1º C | Desenvalvimento de',
            marcador: '1º Bimestre',
        });
    });

    await test.step("validarErroDeDescricaoObrigatoria", async () => {
        await examsPage.expectRequiredFieldError();
    });
});

//Caso de Borda 2
test('edgeCase_createExamWithHugeQuestionCount', async ({ page }) => {
    const examsPage = new ExamsPage(page);

    await test.step("tentarCriarAvaliacaoComQuantidadeAbsurda", async () => {
        await examsPage.createExamWithHugeQuestionCount({
            descricao: 'Avaliação bimestral',
            turma: '1º C | Desenvalvimento de',
            marcador: '1º Bimestre',
            data: 'terça-feira, 23 de junho de',
            area: 'Ciências da natureza e suas',
            qtdQuestoes: '999999999',
        });
    });

    await test.step("validarErroDeQuantidadeExcessiva", async () => {
        await examsPage.expectRequiredFieldError();
    });
});