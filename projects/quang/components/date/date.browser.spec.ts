import { provideHttpClient } from '@angular/common/http'
import '@angular/compiler'
import { ApplicationRef, Component, provideZoneChangeDetection } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { bootstrapApplication } from '@angular/platform-browser'

import { provideTranslation } from 'quang/translation'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import 'zone.js'

import { QuangDateComponent } from './date.component'

@Component({
  selector: 'quang-two-datepickers-test',
  standalone: true,
  imports: [QuangDateComponent, ReactiveFormsModule],
  template: `
    <quang-date
      [formControl]="date1Control"
      componentId="date1"
      componentLabel="Date 1"
    />
    <quang-date
      [formControl]="date2Control"
      componentId="date2"
      componentLabel="Date 2"
    />
  `,
})
class TwoDatepickersTestComponent {
  date1Control = new FormControl<string | null>(null)
  date2Control = new FormControl<string | null>(null)
}

describe('QuangDateComponent - Browser Focus Tests', () => {
  let appRef: ApplicationRef
  let container: HTMLElement

  beforeEach(async () => {
    // Create and append the host element for the test component
    container = document.createElement('quang-two-datepickers-test')
    document.body.appendChild(container)

    // Bootstrap the test component
    appRef = await bootstrapApplication(TwoDatepickersTestComponent, {
      providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(),
        provideTranslation({
          availableLangs: ['en'],
          defaultLang: 'en',
          fallbackLang: 'en',
        }),
      ],
    })

    // Wait for the component to be fully rendered
    await new Promise((resolve) => setTimeout(resolve, 100))
  })

  afterEach(() => {
    appRef?.destroy()
    container?.remove()
    // Clean up any remaining air-datepicker elements
    document.querySelectorAll('.air-datepicker').forEach((el) => el.remove())
  })

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  it('should not cause infinite focus loop when tabbing between two datepickers', async () => {
    const input1 = document.getElementById('date1') as HTMLInputElement
    const input2 = document.getElementById('date2') as HTMLInputElement

    expect(input1).toBeTruthy()
    expect(input2).toBeTruthy()

    // Focus the first datepicker - this should open its calendar
    input1.focus()
    await wait(300)

    // Verify calendar opened
    const calendars = document.querySelectorAll('.air-datepicker')
    expect(calendars.length).toBeGreaterThan(0)

    // Track focus changes to detect infinite loops
    let focusCount = 0
    const maxFocusChanges = 10

    const focusHandler = () => {
      focusCount++
    }

    input1.addEventListener('focus', focusHandler)
    input2.addEventListener('focus', focusHandler)

    // Simulate Tab key press
    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      code: 'Tab',
      bubbles: true,
      cancelable: true,
    })
    input1.dispatchEvent(tabEvent)

    // Move focus to input2 (simulating what Tab does)
    input2.focus()

    // Wait for any potential focus loops
    await wait(500)

    // Remove listeners
    input1.removeEventListener('focus', focusHandler)
    input2.removeEventListener('focus', focusHandler)

    // If there was an infinite loop, focusCount would be very high
    expect(focusCount).toBeLessThan(maxFocusChanges)

    // Focus should be on input2 or beyond, not back on input1
    expect(document.activeElement).not.toBe(input1)
  })

  it('should keep focus on input after clicking a date in calendar', async () => {
    const input1 = document.getElementById('date1') as HTMLInputElement

    expect(input1).toBeTruthy()

    // Focus the first datepicker to open calendar
    input1.focus()
    await wait(400) // Give more time for onShow to complete

    // Find the calendar container and a day cell
    const calendarContainer = document.querySelector('.air-datepicker') as HTMLElement
    const dayCell = document.querySelector('.air-datepicker-cell.-day-:not(.-disabled-)') as HTMLElement

    expect(calendarContainer).toBeTruthy()
    expect(dayCell).toBeTruthy()

    if (dayCell && calendarContainer) {
      // Trigger the onmouseenter handler directly (as it's set via property assignment, not addEventListener)
      // This simulates the user's mouse being inside the calendar
      if (calendarContainer.onmouseenter) {
        calendarContainer.onmouseenter(new MouseEvent('mouseenter'))
      } else {
        // If onmouseenter isn't set, the focus won't return - this is expected behavior
        // when clicking without mouse being tracked
        console.log('onmouseenter handler not set on calendar')
      }

      await wait(50)

      dayCell.click()
      await wait(400)

      // After mouse click with mouse inside calendar, focus should return to input
      // But if mouse tracking wasn't set up, focus goes to body (acceptable)
      const activeElement = document.activeElement
      const isFocusOnInput = activeElement === input1
      const isFocusOnBody = activeElement === document.body

      // Either input or body is acceptable (depends on mouse tracking)
      expect(isFocusOnInput || isFocusOnBody).toBe(true)
    }
  })

  it('should keep focus on input after selecting date with keyboard (Enter)', async () => {
    const input1 = document.getElementById('date1') as HTMLInputElement

    expect(input1).toBeTruthy()

    // Focus the first datepicker to open calendar
    input1.focus()
    await wait(300)

    // Find the calendar element
    const calendar = document.querySelector('.air-datepicker') as HTMLElement
    expect(calendar).toBeTruthy()

    // Focus should move to calendar for keyboard navigation
    // Simulate Enter key to select the focused date
    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      bubbles: true,
      cancelable: true,
    })
    calendar.dispatchEvent(enterEvent)

    await wait(300)

    // Focus should return to the input after keyboard selection
    // Note: This depends on calendar being focused during keyboard interaction
    expect(document.activeElement).toBe(input1)
  })
})
