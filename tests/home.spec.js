import { test, expect } from '@playwright/test'

// Faz login antes de cada teste desse arquivo
test.beforeEach(async ({ page }) => {
  await page.goto('/login')
  await page.fill('input[type="email"]', 'leo@email.com')
  await page.fill('input[type="password"]', '123456')
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/home/)
})

test.describe('Home', () => {

  test('deve carregar os vídeos na home', async ({ page }) => {
    // Pelo menos um card de vídeo deve existir
    await expect(page.locator('.card').first()).toBeVisible()
  })

  test('deve filtrar vídeos por categoria', async ({ page }) => {
    // Clica em uma categoria
    await page.click('button:has-text("Filmes")')

    // Pelo menos um card deve aparecer
    await expect(page.locator('.card').first()).toBeVisible()
  })

  test('deve navegar para detalhes ao clicar num vídeo', async ({ page }) => {
    // Clica no primeiro card
    await page.locator('.card').first().click()

    // Deve ir para a rota de detalhes
    await expect(page).toHaveURL(/\/videos\/\d+/)
  })

})