import { Component, Injectable } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { By } from '@angular/platform-browser'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { QuangDateComponent } from './date.component'
import { ErrorData } from 'quang/components/shared'

// AirDatepicker is a DOM-heavy dependency; mock it for jsdom unit tests.
vi.mock('air-datepicker', () => {
  class AirDatepickerMock {
    visible = false
    $datepicker = document.createElement('div')
    constructor(_el: unknown, _opts: unknown) {}
    update(_opts: unknown, _updateOpts?: unknown) {}
    setFocusDate(_value: unknown) {}
    clear(_opts?: unknown) {}
    show() {
      this.visible = true
    }
    hide() {
      this.visible = false
    }
    destroy() {}
    selectDate(_date: unknown, _opts?: unknown) {}
  }

  return {
    default: AirDatepickerMock,
  }
})

vi.mock('air-datepicker/locale/en', () => ({ default: {} }))
vi.mock('air-datepicker/locale/it', () => ({ default: {} }))
vi.mock('air-datepicker/locale/fr', () => ({ default: {} }))

@Injectable()
class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(_lang: string): Observable<Record<string, string>> {
    return of({})
  }
}

const getTranslocoTestingProviders = () =>
  provideTransloco({
    config: {
      availableLangs: ['en'],
      defaultLang: 'en',
      fallbackLang: 'en',
      prodMode: true,
    },
    loader: TestTranslocoLoader,
  })

const noMatchValidator = (control: AbstractControl<string | null>): ValidationErrors | null => {
  return control.value === 'ok' ? null : { noMatch: true }
}

@Component({
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
    >
      <quang-date
        [errorMap]="errors"
        componentId="requiredDate"
        formControlName="requiredDate"
      />

      <quang-date
        [errorMap]="errors"
        componentId="customDate"
        formControlName="customDate"
      />

      <button type="submit">Submit</button>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangDateComponent],
})
class TestHostComponent {
  errors: ErrorData[] = [
    { error: Validators.required.name, message: 'form.errors.required' },
    { error: 'noMatch', message: 'form.errors.noMatch' },
  ]

  form = new FormGroup({
    requiredDate: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    // Non-empty so required passes, invalid due to custom validator
    customDate: new FormControl<string>(new Date(0).toISOString(), {
      nonNullable: true,
      validators: [Validators.required, noMatchValidator],
    }),
  })

  onSubmit(): void {
    this.form.markAllAsTouched()
  }
}

describe('QuangDateComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    fixture.detectChanges()
  })

  it('should be defined', () => {
    expect(QuangDateComponent).toBeDefined()
  })

  it('should show error state after submitting invalid form (markAllAsTouched)', () => {
    const host = fixture.componentInstance
    expect(host.form.invalid).toBe(true)

    const inputsBefore = fixture.debugElement.queryAll(By.css('quang-date input.form-control'))
    expect(inputsBefore.length).toBe(2)
    expect((inputsBefore[0].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(false)
    expect((inputsBefore[1].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(false)

    const formEl = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement
    formEl.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    fixture.detectChanges()

    const inputsAfter = fixture.debugElement.queryAll(By.css('quang-date input.form-control'))
    expect((inputsAfter[0].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(true)
    expect((inputsAfter[1].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(true)
  })
})
