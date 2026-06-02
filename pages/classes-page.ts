import { Page, expect } from '@playwright/test';

interface ClassData {
    ano: string;
    serie: string;
    turno: string;
    sala: string;
    descricao: string;
}

export class ClassesPage {
    constructor(private page: Page) {}

    async createClass(courseId: string, data: ClassData) {
        await this.page.getByRole('button', { name: 'Adicionar nova turma' }).click();
        await this.page.getByRole('button', { name: 'Curso' }).click();
        await this.page.getByLabel('Suggestions').getByText(courseId).click();
        await this.page.getByRole('textbox', { name: 'Ano: *' }).fill(data.ano);
        await this.page.getByRole('combobox', { name: 'Série ou semestre da turma:' }).click();
        await this.page.getByText(data.serie).click();
        await this.page.getByRole('combobox', { name: 'Turno: campo obrigatório' }).click();
        await this.page.getByRole('option', { name: data.turno }).click();
        await this.page.getByRole('textbox', { name: 'Sala:' }).fill(data.sala);
        await this.page.getByRole('textbox', { name: 'Descrição:' }).fill(data.descricao);
        await this.page.getByRole('button', { name: 'Salvar' }).click();
    }

    async updateClass(data: ClassData) {
        await this.page.locator('#radix-_r_1j_').click();
        await this.page.getByRole('menuitem', { name: 'Editar' }).click();
        await this.page.getByRole('textbox', { name: 'Ano: *' }).fill(data.ano);
        await this.page.getByRole('combobox', { name: 'Turno: campo obrigatório' }).click();
        await this.page.getByRole('option', { name: data.turno }).click();
        await this.page.getByRole('combobox', { name: 'Série ou semestre da turma:' }).click();
        await this.page.getByText(data.serie).click();
        await this.page.getByRole('textbox', { name: 'Sala:' }).fill(data.sala);
        await this.page.getByRole('textbox', { name: 'Descrição:' }).fill(data.descricao);
        await this.page.getByRole('button', { name: 'Salvar' }).click();
    }

    async deleteClass() {
        await this.page.locator('#radix-_r_1j_').click();
        await this.page.getByRole('menuitem', { name: 'Excluir' }).click();
        await this.page.getByRole('button', { name: 'Excluir' }).click();
    }

    async createClassWithoutCourse(data: { ano: string; serie: string; turno: string }) {
        await this.page.getByRole('button', { name: 'Adicionar nova turma' }).click();
        await this.page.getByRole('textbox', { name: 'Ano: *' }).fill(data.ano);
        await this.page.getByRole('combobox', { name: 'Série ou semestre da turma:' }).click();
        await this.page.getByRole('option', { name: data.serie }).click();
        await this.page.getByRole('combobox', { name: 'Turno: campo obrigatório' }).click();
        await this.page.getByLabel('Integral').getByText(data.turno).click();
        await this.page.getByRole('button', { name: 'Salvar' }).click();
    }

    async createClassWithoutYear(data: { courseId: string; serie: string; turno: string; descricao: string }) {
        await this.page.getByRole('button', { name: 'Adicionar nova turma' }).click();
        await this.page.getByRole('button', { name: 'Curso' }).click();
        await this.page.getByLabel('Suggestions').getByText(data.courseId).click();
        await this.page.getByRole('combobox', { name: 'Série ou semestre da turma:' }).click();
        await this.page.getByRole('option', { name: data.serie }).click();
        await this.page.getByRole('combobox', { name: 'Turno: campo obrigatório' }).click();
        await this.page.getByRole('option', { name: data.turno }).click();
        await this.page.getByRole('textbox', { name: 'Descrição:' }).fill(data.descricao);
        await this.page.getByRole('button', { name: 'Salvar' }).click();
    }

    async expectRequiredFieldError() {
        await expect(this.page.getByRole('button', { name: 'Close' })).toBeVisible();
    }

    async closeModal() {
        await this.page.getByRole('button', { name: 'Close' }).click();
    }
}