import { expect, test } from '@playwright/test'

test.describe('Input Field Required Validation', () => {
  test('should have required attribute on input field', async ({ page }) => {
    // Go to the page containing the input field
    await page.goto('http://localhost:4400/quix-quang/components/input')

    // Find the input field (update selector as needed)
    const input = page.locator('input')
    await expect(input).toHaveAttribute('required', 'true')
  })

  test('should disable the form after clicking "form enabled" button', async ({ page }) => {
    await page.goto('http://localhost:4400/quix-quang/components/input')

    // Click the button with text "form enabled"
    await page.getByRole('button', { name: /form enabled/i }).click()

    // Check if the form is disabled (look for a <form> with the disabled attribute or disabled inputs)
    // Try to find a disabled input as a proxy for form disabled state
    const disabledInput = page.locator('input:disabled')
    await expect(disabledInput).toBeVisible()
  })

  test('should set input value to ciao! after clicking "set form" button', async ({ page }) => {
    await page.goto('http://localhost:4400/quix-quang/components/input')

    // Click the button with text "set form"
    await page.getByRole('button', { name: /set form/i }).click()

    // Find the input field
    const input = page.locator('input')
    // Check input value is "ciao!"
    await expect(input).toHaveValue('ciao!')
  })
})
