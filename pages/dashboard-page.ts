import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async userIsLogged(){
        return await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    }

    async userLogout(){
        await this.page.getByRole('img', { name: 'avatar' }).click();
        await this.page.getByRole('button', { name: 'Logout' }).click();
    }

    async userIsLoggedOut(){
        return await expect(this.page.getByText('Entrar')).toBeVisible();
    }

    async goToAreas(){
        await this.page.goto('https://app.avaliei.com.br/areas');
    }

    async goToSubjects(){
        await this.page.goto('https://app.avaliei.com.br/disciplinas');
    }

    async goToClasses(){
    await this.page.goto('https://app.avaliei.com.br/turmas');
    }

    async goToCourses(){
    await this.page.goto('https://app.avaliei.com.br/cursos');
    }
}