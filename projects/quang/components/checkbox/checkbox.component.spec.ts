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

import { QuangCheckboxComponent } from './checkbox.component'
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

const mustBeFalseValidator = (control: AbstractControl<boolean | null>): ValidationErrors | null => {
  return control.value === false ? null : { noMatch: true }
}

@Component({
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
    >
      <quang-checkbox
        [errorMap]="errors"
        checkType="checkbox"
        formControlName="requiredCheck"
      />
      <quang-checkbox
        [errorMap]="errors"
        checkType="checkbox"
        formControlName="customCheck"
      />
      <button type="submit">Submit</button>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangCheckboxComponent],
})
class TestHostComponent {
  errors: ErrorData[] = [
    { error: Validators.required.name, message: 'form.errors.required' },
    { error: 'noMatch', message: 'form.errors.noMatch' },
  ]

  form = new FormGroup({
    // For checkboxes, `requiredTrue` is the standard validator.
    requiredCheck: new FormControl<boolean>(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
    // Invalid due to custom validator while `requiredTrue` passes.
    customCheck: new FormControl<boolean>(true, {
      nonNullable: true,
      validators: [Validators.requiredTrue, mustBeFalseValidator],
    }),
  })

  onSubmit(): void {
    this.form.markAllAsTouched()
  }
}

describe('QuangCheckboxComponent', () => {
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
    expect(QuangCheckboxComponent).toBeDefined()
  })

  it('should show error state after submitting invalid form (markAllAsTouched)', () => {
    const host = fixture.componentInstance
    expect(host.form.invalid).toBe(true)

    const checkboxInputs = fixture.debugElement.queryAll(By.css('quang-checkbox input.form-check-input'))
    expect(checkboxInputs.length).toBe(2)

    // Before submit, no error styling should be shown.
    expect((checkboxInputs[0].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(false)
    expect((checkboxInputs[1].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(false)

    const formEl = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement
    formEl.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    fixture.detectChanges()

    const checkboxInputsAfter = fixture.debugElement.queryAll(By.css('quang-checkbox input.form-check-input'))
    expect((checkboxInputsAfter[0].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(true)
    expect((checkboxInputsAfter[1].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(true)
  })
})
