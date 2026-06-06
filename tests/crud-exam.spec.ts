import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ExamsPage } from '../pages/exams-page';

test('crudExams', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const examsPage = new ExamsPage(page);

    const email = "e2e-super-teacher-26@example.com";
    const password = "password";
    const uniqueId = Date.now();
    const descriptionExamName = `Prova E2E - ${uniqueId}`;

    await test.step("loginAndGoToExamsPage", async () => {
        await loginPage.goToLoginPage();
        await loginPage.login(email, password);
        await loginPage.otpCodePage();

        await dashboardPage.userIsLogged();
        await dashboardPage.goToExams();
    });

    await test.step("createExamHappy", async () => {
        await examsPage.createExam({
            descricao: descriptionExamName,
            turma: '2º A | informatica | Noturno',
            marcador: '2º Bimestre',
            ordenacao: 'Misturar questões do bloco',
            qtdOrdenacoes: '(Azul | Branco | Rosa | Verde)',
            data: 'terça-feira, 23 de junho de',
            area: 'Ciências da natureza e suas',
            professor: 'E2e Super Teacher 09',
            disciplina: 'Biologia',
            qtdQuestoes: '10',
        });
    });

    await test.step("updateExamHappy", async () => {
        await examsPage.updateExam({
            descricao: descriptionExamName,
            qtdOrdenacoes: '(Azul | Branco | Rosa)',
        });
    });

    await test.step("deleteExamHappy", async () => {
        await examsPage.deleteExam({
            descricao: descriptionExamName,
        });
    });

    await test.step("createExamSadWithoutDescription", async () => {
        await examsPage.createExamWithoutDescription({
            turma: '2º A | informatica | Noturno',
            marcador: '1º Bimestre',
        });
        await examsPage.expectRequiredFieldError();
        await examsPage.closeModal();
    });

    await test.step("createExamSadWithoutClass", async () => {
        await examsPage.createExamWithoutClass({
            descricao: 'Avaliação sem turma',
            marcador: '1º Bimestre',
        });
        await examsPage.expectRequiredFieldError();
        await examsPage.closeModal();
    });

    await test.step("createExamEdgeCaseBlankDescription", async () => {
        await examsPage.createExamWithBlankDescription({
            turma: '1º C | Desenvalvimento de',
            marcador: '1º Bimestre',
        });
        console.log("SELETOR NOVO");
        await examsPage.closeModal();
    });

    await test.step("createExamEdgeCaseHugeQuestionCount", async () => {
        await examsPage.createExamWithHugeQuestionCount({
            descricao: 'Avaliação bimestral',
            turma: '1º C | Desenvalvimento de',
            marcador: '1º Bimestre',
            data: 'terça-feira, 23 de junho de',
            area: 'Ciências da natureza e suas',
            qtdQuestoes: '999999999',
        });
        await examsPage.expectRequiredFieldError();
        await examsPage.closeModal();
    });
});