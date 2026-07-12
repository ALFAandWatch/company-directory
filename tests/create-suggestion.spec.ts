import { test, expect } from '@playwright/test';

test('should create a suggestion successfully', async ({ page }) => {
   // 1. Ir a la página
   await page.goto('http://localhost:3000/es/suggest');

   // 2. Completar nombre
   await page.fill('[data-testid="suggestion-name"]', 'Test Company 2');

   // 3. Completar website
   await page.fill('[data-testid="suggestion-website"]', 'https://test2.com');

   // 4. Abrir dropdown de país
   await page.click('[data-testid="suggestion-country"]');

   // 5. Seleccionar Uruguay
   await page.click('text=Uruguay');

   // 5. Seleccionar Uruguay
   await page.click('text=Brazil');

   // 6. Enviar formulario
   await page.click('[data-testid="submit-button"]');

   // 7. Verificar resultado (ajustá esto a tu UI)
   await expect(page.getByText('Sugerencia enviada con éxito')).toBeVisible();
});
