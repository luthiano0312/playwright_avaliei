import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class SubjectsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async createSubject(name: string, area: string){
        await this.page.getByRole('button', { name: 'Adicionar disciplina' }).click();
        await this.page.getByRole('textbox', { name: 'Nome da disciplina:' }).fill(name);
        await this.page.getByRole('button', { name: 'Selecione a área da disciplina' }).click();
        await this.page.getByRole('option', { name: area }).click();
        await this.page.getByRole('button', { name: 'Salvar' }).click();
        return await expect(this.page.getByText('Disciplina salva com sucesso')).toBeVisible();
    }

    async updateSubject(oldName: string, newName: string){
        await this.page.getByRole('textbox', { name: 'Pesquisar disciplina...' }).fill(oldName);
        await this.page.locator('tr').filter({ hasText: oldName }).getByRole('button', { name: 'Editar', exact: true }).click();
        await this.page.getByRole('textbox', { name: 'Nome da disciplina:' }).fill(newName);
        await this.page.getByRole('button', { name: 'Salvar' }).click();
        return await expect(this.page.getByText('Disciplina salva com sucesso')).toBeVisible();
    }

    async deleteSubject(name: string){
        await this.page.getByRole('textbox', { name: 'Pesquisar disciplina...' }).fill(name);
        await this.page.locator('tr').filter({ hasText: name }).getByRole('button', { name: 'Excluir' }).click();
        await this.page.getByRole('button', { name: 'Excluir' }).click();
        return await expect(this.page.getByText('Disciplina excluída com sucesso')).toBeVisible();
    }
}