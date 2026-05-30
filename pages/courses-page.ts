// pages/courses-page.ts
import { Page } from '@playwright/test';

export class CoursesPage {
    constructor(private page: Page) {}

    async createCourse(name: string, nivel: string) {
        await this.page.getByRole('button', { name: 'Adicionar Curso' }).click();
        await this.page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill(name);
        await this.page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
        await this.page.getByRole('option', { name: nivel }).click();
        await this.page.getByRole('button', { name: 'Salvar' }).click();
    }

    async updateCourse(name: string, nivel: string) {
        await this.page.getByRole('button', { name: 'Editar' }).nth(1).click();
        await this.page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill(name);
        await this.page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
        await this.page.getByRole('option', { name: nivel }).click();
        await this.page.getByRole('button', { name: 'Salvar' }).click();
    }

    async deleteCourse() {
        await this.page.getByRole('button', { name: 'Excluir' }).nth(1).click();
        await this.page.getByRole('button', { name: 'Excluir' }).click();
    }
}