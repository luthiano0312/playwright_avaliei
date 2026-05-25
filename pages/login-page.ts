import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { authenticator } from 'otplib';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToLoginPage() {
        await this.page.goto('https://app.avaliei.com.br/login', { waitUntil: 'domcontentloaded' });
    }

    async login(user: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Email' }).fill(user);
        await this.page.getByRole('textbox', { name: 'Senha' }).fill(password);
        await this.page.getByRole('button', { name: 'Entrar' }).click();
    }

    async otpCodePage(){
        const otpSecret = process.env.E2E_OTP_SECRET;

        if (!otpSecret || otpSecret.trim() === '' || otpSecret === 'sua_chave_secreta_aqui') {
            throw new Error(
            'ERRO: Chave secreta de 2FA (E2E_OTP_SECRET) não configurada no arquivo .env! Consulte o arquivo OTP_GUIDE.md para ver como configurá-la.'
            );
        }

        let otpCode = '';
        try {
            otpCode = authenticator.generate(otpSecret);
        } catch (error: any) {
            throw new Error(
            `ERRO AO GERAR OTP: A chave E2E_OTP_SECRET no seu arquivo .env está no formato inválido. ` +
            `Detalhe do erro: ${error.message}`
            );
        }

        await expect(this.page.getByText('Autenticação em Dois Fatores')).toBeVisible();
        await this.page.getByRole('textbox', { name: 'Código de verificação de 6 dí' }).fill(otpCode);
        await this.page.getByRole('button', { name: 'Verificar código de autentica' }).click();
    }
}