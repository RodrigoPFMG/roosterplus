import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',

  // Roda os testes um de cada vez — mais fácil de acompanhar
  workers: 1,

  // Gera relatório HTML com screenshots
  reporter: 'html',

  use: {
    // URL base do frontend
    baseURL: 'http://localhost:5173',

    // Mostra o navegador durante os testes
    headless: false,

    // Pausa entre ações — bom para apresentação
    slowMo: 500,

    // Tira screenshot quando um teste falha
    screenshot: 'only-on-failure',
  },
})