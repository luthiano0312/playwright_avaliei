import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class AreasPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async createArea(name: string){
        await this.page.getByRole('button', { name: 'Adicionar área' }).click();
        await this.page.getByRole('textbox', { name: 'Nome da Área:' }).fill(name);
        await this.page.getByRole('button', { name: 'Salvar' }).click();
        return await expect(this.page.getByText('Área salva com sucesso')).toBeVisible();
    }

    async updateArea(oldName: string, newName: string){
        await this.page.getByRole('textbox', { name: 'Pesquisar área...' }).fill(oldName);
        await this.page.locator('tr').filter({ hasText: oldName }).getByRole('button', { name: 'Editar', exact: true }).click();
        await this.page.getByRole('textbox', { name: 'Nome da Área:' }).fill(newName);
        await this.page.getByRole('button', { name: 'Salvar' }).click();
        return await expect(this.page.getByText('Área salva com sucesso')).toBeVisible();
    }

    async deleteArea(name: string){
        await this.page.getByRole('textbox', { name: 'Pesquisar área...' }).fill(name);
        await this.page.locator('tr').filter({ hasText: name }).getByRole('button', { name: 'Excluir' }).click();
        await this.page.getByRole('button', { name: 'Excluir' }).click();
        return await expect(this.page.getByText('Área excluída com sucesso')).toBeVisible();
    }


    async createAreaSad(){
        await this.page.getByRole('button', { name: 'Adicionar área' }).click();
        await this.page.getByRole('button', { name: 'Salvar' }).click();
        await expect(this.page.getByText('Este campo é obrigatório')).toBeVisible();
        return await this.page.getByRole('button', { name: 'Close' }).click();
    }

    async updateAreaSad(oldName: string){
        await this.page.getByRole('textbox', { name: 'Pesquisar área...' }).fill(oldName);
        await this.page.locator('tr').filter({ hasText: oldName }).getByRole('button', { name: 'Editar', exact: true }).click();
        await this.page.getByRole('textbox', { name: 'Nome da Área:' }).clear();
        await this.page.getByRole('button', { name: 'Salvar' }).click();
        await expect(this.page.getByText('Este campo é obrigatório')).toBeVisible();
        return await this.page.getByRole('button', { name: 'Close' }).click();
    }


    async createAreaEdgeCases(name: string){
        await this.page.getByRole('button', { name: 'Adicionar área' }).click();
        await this.page.getByRole('textbox', { name: 'Nome da Área:' }).fill(name);
        await this.page.getByRole('button', { name: 'Salvar' }).click();
        return await expect(this.page.getByText('O campo nome da área não pode ser superior a 125 caracteres.')).toBeVisible();
    }

    async updateAreaEdgeCases(oldName: string, newName: string){
        await this.page.getByRole('textbox', { name: 'Pesquisar área...' }).fill(oldName);
        await this.page.locator('tr').filter({ hasText: oldName }).getByRole('button', { name: 'Editar'}).click();
        await this.page.getByRole('textbox', { name: 'Nome da Área:' }).fill(newName);
        await this.page.getByRole('button', { name: 'Salvar' }).click();
        return await expect(this.page.getByText('O campo nome da área não pode ser superior a 125 caracteres.')).toBeVisible();
    }
}