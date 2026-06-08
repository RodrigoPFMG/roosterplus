import { test, expect } from '@playwright/test'

test.describe('Autenticação', () => {

  test('deve fazer login com sucesso', async ({ page }) => {
    await page.goto('/login')

    // Preenche o formulário
    await page.fill('input[type="email"]', 'leo@email.com')
    await page.fill('input[type="password"]', '123456')
    await page.click('button[type="submit"]')

    // Após login, deve ir para /home
    await expect(page).toHaveURL(/\/home/)
  })

  test('deve mostrar erro com credenciais inválidas', async ({ page }) => {
    await page.goto('/login')

    await page.fill('input[type="email"]', 'errado@email.com')
    await page.fill('input[type="password"]', 'senhaerrada')
    await page.click('button[type="submit"]')

    // Deve mostrar mensagem de erro
    await expect(page.locator('.error')).toBeVisible()
  })

  test('deve redirecionar para login se não estiver autenticado', async ({ page }) => {
    // Tenta acessar rota protegida sem token
    await page.goto('/home')

    // Deve redirecionar para login
    await expect(page).toHaveURL(/\/login/)
  })

  test('deve cadastrar novo usuário', async ({ page }) => {
    await page.goto('/register')

    await page.fill('input[placeholder="Nome"]', 'Usuário Teste')
    await page.fill('input[type="email"]', `teste${Date.now()}@email.com`)
    await page.fill('input[type="password"]', '123456')
    await page.click('button[type="submit"]')

    // Após cadastro, deve ir para /profiles
    await expect(page).toHaveURL(/\/profiles/)
  })

})