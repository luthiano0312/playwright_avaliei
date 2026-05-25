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
}