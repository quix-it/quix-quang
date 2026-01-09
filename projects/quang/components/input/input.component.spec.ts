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
      <quang-input
        [errorMap]="errors"
        componentType="text"
        formControlName="requiredField"
      />
      <quang-input
        [errorMap]="errors"
        componentType="text"
        formControlName="customField"
      />
      <button type="submit">Submit</button>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangInputComponent],
})
class TestHostComponent {
  errors: ErrorData[] = [
    { error: Validators.required.name, message: 'form.errors.required' },
    { error: 'noMatch', message: 'form.errors.noMatch' },
  ]

  form = new FormGroup({
    // Invalid due to `required`
    requiredField: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    // Invalid due to custom validator (value is non-empty so `required` passes)
    customField: new FormControl<string>('bad', {
      nonNullable: true,
      validators: [Validators.required, noMatchValidator],
    }),
  })

  onSubmit(): void {
    // Typical submit handler: mark everything as touched to show validation errors.
    this.form.markAllAsTouched()
  }
}

describe('QuangInputComponent', () => {
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
    expect(QuangInputComponent).toBeDefined()
  })

  it('should not show error state before submit when pristine/untouched', () => {
    const inputs = fixture.debugElement.queryAll(By.css('quang-input input.form-control'))
    expect(inputs.length).toBe(2)

    expect((inputs[0].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(false)
    expect((inputs[1].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(false)
  })

  it('should show error state after submitting invalid form (markAllAsTouched)', () => {
    const host = fixture.componentInstance
    expect(host.form.invalid).toBe(true)

    const formEl = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement
    formEl.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    fixture.detectChanges()

    const inputs = fixture.debugElement.queryAll(By.css('quang-input input.form-control'))
    expect((inputs[0].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(true)
    expect((inputs[1].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(true)
  })
})
