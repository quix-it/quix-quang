import { expect, test } from '@playwright/test'

test.describe('Toggle Component', () => {
  test('should toggle value to true and form should be valid', async ({ page }) => {
    await test.step('Navigate to the toggle component page', async () => {
      await page.goto('http://localhost:4400/quix-quang/components/toggle')
    })

    const toggleInput = await test.step('Identify the input with role="switch" and label "toggle header"', async () => {
      const el = page.getByRole('switch', { name: /toggle header/i })
      await expect(el).toBeVisible()
      return el
    })

    await test.step('Click the input', async () => {
      await toggleInput.click()
    })

    await test.step('Click the "check form" button to show value and validity', async () => {
      await page.getByRole('button', { name: /check form/i }).click()
    })

    await test.step('Check if value is true (the form value is rendered in a span)', async () => {
      const valueSpan = page.locator('span', { hasText: /Form value:/i })
      await expect(valueSpan).toContainText('"toggle": true')
    })

    await test.step('Check if form is valid (the form validity is rendered in a span)', async () => {
      const validitySpan = page.locator('span', { hasText: /Form valid:/i })
      await expect(validitySpan).toContainText('true')
    })
  })

  test('should uncheck right label checkbox and value should be false', async ({ page }) => {
    await test.step('Navigate to the toggle component page', async () => {
      await page.goto('http://localhost:4400/quix-quang/components/toggle')
    })

    const rightCheckbox =
      await test.step('Find the input with label "checkbox header" and label at right (labelPosition="right")', async () => {
        const checkboxes = page.getByRole('checkbox', { name: /checkbox header/i })
        const el = checkboxes.nth(1)
        await expect(el).toBeVisible()
        return el
      })

    await test.step('Click the input (should uncheck it)', async () => {
      await rightCheckbox.click()
    })

    await test.step('Click the "check form" button to show value and validity', async () => {
      await page.getByRole('button', { name: /check form/i }).click()
    })

    await test.step('Check if value is false (the form value is rendered in a span)', async () => {
      const valueSpan = page.locator('span', { hasText: /Form value:/i })
      await expect(valueSpan).toContainText('"checkbox": false')
    })
  })
})
