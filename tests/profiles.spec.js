import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/login')
  await page.fill('input[type="email"]', 'leo@email.com')
  await page.fill('input[type="password"]', '123456')
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/home/)
})

test.describe('Perfis', () => {

  test('deve criar um novo perfil', async ({ page }) => {
    await page.goto('/profiles')

    const nomePerfil = `Perfil ${Date.now()}`
    await page.fill('input[placeholder="Nome do perfil"]', nomePerfil)

    // Marca uma preferência
    await page.click('label:has-text("Filmes")')

    await page.click('button[type="submit"]')

    // O perfil criado deve aparecer na lista
    await expect(page.locator(`.profile-card:has-text("${nomePerfil}")`)).toBeVisible()
  })

})