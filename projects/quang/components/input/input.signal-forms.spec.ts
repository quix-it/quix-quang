import { Component, Injectable, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormField, FormRoot, form, minLength, required } from '@angular/forms/signals'
import { By } from '@angular/platform-browser'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { QuangInputComponent } from './input.component'
import { ErrorData } from 'quang/components/shared'

@Injectable()
class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(_lang: string): Observable<Record<string, string>> {
    return of({})
  }
}

const getTranslocoTestingProviders = () =>
  provideTransloco({
    config: { availableLangs: ['en'], defaultLang: 'en', fallbackLang: 'en', prodMode: true },
    loader: TestTranslocoLoader,
  })

@Component({
  template: `
    <form [formRoot]="testForm">
      <quang-input
        [errorMap]="errors"
        [formField]="testForm.testInput"
        componentType="text"
      />
    </form>
  `,
  standalone: true,
  imports: [FormRoot, FormField, QuangInputComponent],
})
class SignalFormsHostComponent {
  errors: ErrorData[] = [
    { error: 'required', message: 'form.errors.required' },
    { error: 'minLength', message: 'form.errors.minLength' },
  ]

  model = signal({ testInput: '' })

  testForm = form(this.model, (p) => {
    required(p.testInput)
    minLength(p.testInput, 3)
  })
}

describe('QuangInputComponent + signal forms [formField]', () => {
  let fixture: ComponentFixture<SignalFormsHostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalFormsHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(SignalFormsHostComponent)
  })

  it('mounts under [formField] without throwing', () => {
    expect(() => fixture.detectChanges()).not.toThrow()

    const input = fixture.debugElement.query(By.css('quang-input input.form-control'))
    expect(input).not.toBeNull()
  })

  it('reflects validity reactively from the signal form', async () => {
    fixture.detectChanges()
    const host = fixture.componentInstance

    // Empty + required => field invalid
    expect(host.testForm.testInput().valid()).toBe(false)

    // Set a valid value (>= 3 chars, non-empty) on the model
    host.model.set({ testInput: 'hello' })
    fixture.detectChanges()
    await fixture.whenStable()

    expect(host.testForm.testInput().valid()).toBe(true)
  })
})
