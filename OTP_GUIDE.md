# Guia de Configuração do OTP (2FA) para Testes Automáticos (TypeScript & Otplib v11)

Este guia explica como configurar seu teste E2E do Playwright com **TypeScript** para gerar automaticamente o código OTP (2FA) de 6 dígitos necessário para fazer login no sistema **Avaliei**.

## Como o OTP Automatizado Funciona?

O aplicativo de autenticação (como o Google Authenticator) gera os códigos baseado em duas coisas: o horário atual e uma **Chave Secreta (Secret Key)** compartilhada. 

Para automatizar esse processo:
1. Nós usamos a biblioteca `otplib` na versão **v11**.
2. Nós configuramos a **Chave Secreta** nas variáveis de ambiente do arquivo `.env`.
3. No teste, a biblioteca usa a Chave Secreta para calcular e digitar o código de 6 dígitos correto de forma instantânea.

> [!NOTE]
> Optamos pela versão **v11.0.1** do `otplib` porque ela permite usar chaves secretas de qualquer tamanho (por exemplo, segredos menores de 16 bytes que são gerados por alguns sistemas), enquanto a v12+ bloqueia de forma rígida a execução com erro.

---

## Passo a Passo para Obter a Chave Secreta

Como a sua conta `e2e-super-teacher-26@example.com` já está com o 2FA ativo, precisamos de uma forma de capturar a Chave Secreta. Siga um dos métodos descritos na resposta do chat:

*   **Opção A:** Criar uma nova conta de testes no site (caso o cadastro esteja aberto) e copiar a Chave Secreta na primeira ativação do 2FA.
*   **Opção B:** Exportar a conta atual pelo Google Authenticator, ler o QR Code de migração gerado e decodificar a Chave Secreta usando uma ferramenta segura como o [Google Authenticator Migration Decoder](https://lucasfcosta.com/google-authenticator-migration-decoder/).

---

## Configurando seu Projeto Local

1. Abra o arquivo chamado `.env` na raiz da pasta `playwright_avaliei`.
2. Cole a chave que você copiou na variável `E2E_OTP_SECRET`:

```env
E2E_EMAIL=e2e-super-teacher-26@example.com
E2E_PASSWORD=password
E2E_OTP_SECRET=COLE_AQUI_A_SUA_CHAVE_SECRETA
```

---

## Estrutura do Teste de Login e OTP em TypeScript (Otplib v11)

O teste completo está estruturado em [tests/login.spec.ts](file:///c:/Users/lu/projetos/playwright_avaliei/tests/login.spec.ts):

```typescript
import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

test('Deve realizar o login com sucesso usando credenciais e OTP (2FA)', async ({ page }) => {
  // 1. Carrega as variáveis de ambiente
  const email = process.env.E2E_EMAIL;
  const password = process.env.E2E_PASSWORD;
  const otpSecret = process.env.E2E_OTP_SECRET;

  if (!email || !password || !otpSecret || otpSecret === 'sua_chave_secreta_aqui') {
    throw new Error('Por favor, configure as chaves no seu arquivo .env');
  }

  // 2. Acessa a página do Avaliei
  await page.goto('https://app.avaliei.com.br/');

  // 3. Preenche Email e Senha
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.locator('button[type="submit"]:has-text("Entrar")').click();

  // 4. Aguarda a tela de OTP ser exibida
  await expect(page).toHaveURL(/.*2fa-codigo/);
  await expect(page.locator('text=Autenticação em Dois Fatores')).toBeVisible();

  // 5. Gera o OTP de 6 dígitos dinamicamente
  const otpCode = authenticator.generate(otpSecret);

  // 6. Preenche o código de verificação
  await page.locator('#code').fill(otpCode);
  
  // 7. Clica em Verificar Código
  await page.locator('button:has-text("Verificar Código")').click();

  // 8. Valida que o login foi concluído com sucesso e redirecionou para o painel principal
  await expect(page).toHaveURL(/.*(dashboard|home|painel)/);
});
```
