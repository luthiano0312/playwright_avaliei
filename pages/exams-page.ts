import { Page, expect } from '@playwright/test';

interface ExamData {
    descricao: string;
    turma: string;
    marcador: string;
    ordenacao?: string;
    qtdOrdenacoes?: string | null;
    data: string;
    area: string;
    professor: string;
    disciplina: string;
    qtdQuestoes: string;
}

export class ExamsPage {
    constructor(private page: Page) {}

    async createExam(data: ExamData) {
        await this.page.getByRole('button', { name: 'Criar Avaliação' }).click();
        await this.page.getByRole('textbox', { name: 'Descrição da avaliação: *' }).fill(data.descricao);
        await this.page.getByRole('combobox', { name: 'Turmas' }).click();
        await this.page.getByRole('option', { name: data.turma }).click();
        await this.page.getByRole('combobox', { name: 'Marcadores' }).click();
        await this.page.getByRole('option', { name: data.marcador }).click();
        await this.page.getByText('Selecionar marcadores').click();
        if (data.ordenacao) {
            await this.page.getByRole('combobox', { name: 'Forma ordenação: campo' }).click();
            await this.page.getByRole('option', { name: data.ordenacao, exact: true }).click();
        }
        if (data.qtdOrdenacoes) {
            await this.page.getByRole('combobox', { name: 'Qtd. ordenações: campo' }).click();
            await this.page.getByLabel(data.qtdOrdenacoes).getByText(data.qtdOrdenacoes).click();
        }
        await this.page.getByRole('button', { name: 'Abrir seletor de data para Data de aplicação' }).click();
        await this.page.getByRole('button', { name: data.data }).click();
        await this.page.getByRole('combobox', { name: 'Áreas' }).click();
        await this.page.getByRole('option', { name: data.area }).click();
        await this.page.getByRole('button', { name: 'Professor' }).click();
        await this.page.getByRole('option', { name: data.professor }).click();
        await this.page.getByRole('combobox', { name: 'Selecionar disciplina para' }).click();
        await this.page.getByRole('option', { name: data.disciplina }).click();
        await this.page.getByRole('spinbutton', { name: 'Quantidade de questões para' }).fill(data.qtdQuestoes);
        await this.page.getByRole('button', { name: 'Salvar avaliação' }).click();
    }

    async updateExam(data: { qtdOrdenacoes?: string; modo?: string; data?: string }) {
        await this.page.getByRole('button', { name: 'Mais Ações' }).click();
        await this.page.getByRole('menuitem', { name: 'Editar' }).click();
        if (data.qtdOrdenacoes) {
            await this.page.getByRole('combobox', { name: 'Qtd. ordenações: campo' }).click();
            await this.page.getByRole('option', { name: data.qtdOrdenacoes }).click();
        }
        if (data.modo) {
            await this.page.getByRole('combobox', { name: 'Modo: campo obrigatório' }).click();
            await this.page.getByRole('option', { name: data.modo }).click();
        }
        if (data.data) {
            await this.page.getByRole('button', { name: 'Abrir seletor de data para Data de aplicação' }).click();
            await this.page.getByRole('button', { name: data.data }).click();
        }
        await this.page.getByRole('button', { name: 'Salvar Alterações' }).click();
    }

    async deleteExam() {
        await this.page.getByRole('button', { name: 'Mais Ações' }).click();
        await this.page.getByRole('menuitem', { name: 'Excluir' }).click();
        await this.page.getByRole('button', { name: 'Excluir' }).click();
    }

    async createExamWithoutDescription(data: { turma: string; marcador: string }) {
        await this.page.getByRole('button', { name: 'Criar Avaliação' }).click();
        await this.page.getByRole('combobox', { name: 'Turmas' }).click();
        await this.page.getByRole('option', { name: data.turma }).click();
        await this.page.getByRole('combobox', { name: 'Marcadores' }).click();
        await this.page.getByRole('option', { name: data.marcador }).click();
        await this.page.getByRole('button', { name: 'Salvar avaliação' }).click();
    }

    async createExamWithoutClass(data: { descricao: string; marcador: string }) {
        await this.page.getByRole('button', { name: 'Criar Avaliação' }).click();
        await this.page.getByRole('textbox', { name: 'Descrição da avaliação: *' }).fill(data.descricao);
        await this.page.getByRole('combobox', { name: 'Marcadores' }).click();
        await this.page.getByRole('option', { name: data.marcador }).click();
        await this.page.getByRole('button', { name: 'Salvar avaliação' }).click();
    }

    async createExamWithBlankDescription(data: { turma: string; marcador: string }) {
        await this.page.getByRole('button', { name: 'Criar Avaliação' }).click();
        await this.page.getByRole('textbox', { name: 'Descrição da avaliação: *' }).fill('     ');
        await this.page.getByRole('combobox', { name: 'Turmas' }).click();
        await this.page.getByRole('option', { name: data.turma }).click();
        await this.page.getByRole('combobox', { name: 'Marcadores' }).click();
        await this.page.getByRole('option', { name: data.marcador }).click();
        await this.page.getByRole('button', { name: 'Salvar avaliação' }).click();
    }

    async createExamWithHugeQuestionCount(data: {
        descricao: string;
        turma: string;
        marcador: string;
        data: string;
        area: string;
        qtdQuestoes: string;
    }) {
        await this.page.getByRole('button', { name: 'Criar Avaliação' }).click();
        await this.page.getByRole('textbox', { name: 'Descrição da avaliação: *' }).fill(data.descricao);
        await this.page.getByRole('combobox', { name: 'Turmas' }).click();
        await this.page.getByRole('option', { name: data.turma }).click();
        await this.page.getByRole('combobox', { name: 'Marcadores' }).click();
        await this.page.getByRole('option', { name: data.marcador }).click();
        await this.page.getByRole('button', { name: 'Abrir seletor de data para Data de aplicação' }).click();
        await this.page.getByRole('button', { name: data.data }).click();
        await this.page.getByRole('combobox', { name: 'Áreas' }).click();
        await this.page.getByRole('option', { name: data.area }).click();
        await this.page.getByRole('spinbutton', { name: 'Quantidade de questões para' }).fill(data.qtdQuestoes);
        await this.page.getByRole('button', { name: 'Salvar avaliação' }).click();
    }

    async expectRequiredFieldError() {
        await expect(this.page.getByRole('button', { name: 'Salvar avaliação' })).toBeVisible();
    }

    async closeModal() {
        await this.page.getByRole('button', { name: 'Close' }).click();
    }
}