import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/login')
  await page.fill('input[type="email"]', 'leo@email.com')
  await page.fill('input[type="password"]', '123456')
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/home/)
})

test.describe('Minha Lista', () => {

  test('deve adicionar vídeo à lista e confirmar', async ({ page }) => {
    // Vai para detalhes do primeiro vídeo
    await page.locator('.card').first().click()
    await page.waitForURL(/\/videos\/\d+/)

    // Clica em adicionar à lista
    await page.click('button:has-text("Adicionar à lista")')

    // Botão deve mudar para "Na sua lista"
    await expect(page.locator('button:has-text("Na sua lista")')).toBeVisible()
  })

  test('deve remover vídeo da lista', async ({ page }) => {
    await page.goto('/my-list')

    // Se tiver vídeos, remove o primeiro
    const cards = page.locator('.card')
    const count = await cards.count()

    if (count > 0) {
      await page.locator('button:has-text("Remover da lista")').first().click()

      // Quantidade deve diminuir
      await expect(cards).toHaveCount(count - 1)
    }
  })

})