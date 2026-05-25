import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

test('Deve realizar o login e logout com sucesso usando credenciais e OTP (2FA)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    const email = "e2e-super-teacher-26@example.com";
    const password = "password";

    await loginPage.goToLoginPage();
    await loginPage.login(email, password);
    await loginPage.otpCodePage();

    await dashboardPage.userIsLogged();
    await dashboardPage.userLogout();
    await dashboardPage.userIsLoggedOut();
});
