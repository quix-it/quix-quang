import { expect, test } from '@playwright/test'

test.describe('Toggle Component', () => {
  test('should toggle value to true and form should be valid', async ({ page }) => {
    // Navigate to the toggle component page
    await page.goto('http://localhost:4400/quix-quang/components/toggle')

    // Identify the input with role="switch" and label "toggle header"
    const toggleInput = page.getByRole('switch', { name: /toggle header/i })
    await expect(toggleInput).toBeVisible()

    // Click the input
    await toggleInput.click()

    // Click the "check form" button to show value and validity
    await page.getByRole('button', { name: /check form/i }).click()

    // Check if value is true (the form value is rendered in a span)
    const valueSpan = page.locator('span', { hasText: /Form value:/i })
    await expect(valueSpan).toContainText('"toggle": true')

    // Check if form is valid (the form validity is rendered in a span)
    const validitySpan = page.locator('span', { hasText: /Form valid:/i })
    await expect(validitySpan).toContainText('true')
  })

  test('should uncheck right label checkbox and value should be false', async ({ page }) => {
    await page.goto('http://localhost:4400/quix-quang/components/toggle')

    // Find the input with label "checkbox header" and label at right (labelPosition="right")
    // The right label checkbox is the second checkbox with label "checkbox header"
    const checkboxes = page.getByRole('checkbox', { name: /checkbox header/i })
    const rightCheckbox = checkboxes.nth(1)
    await expect(rightCheckbox).toBeVisible()

    // Click the input (should uncheck it)
    await rightCheckbox.click()

    // Click the "check form" button to show value and validity
    await page.getByRole('button', { name: /check form/i }).click()

    // Check if value is false (the form value is rendered in a span)
    const valueSpan = page.locator('span', { hasText: /Form value:/i })
    await expect(valueSpan).toContainText('"checkbox": false')
  })
})
