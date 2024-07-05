import { JsonPipe, NgForOf, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  AbstractControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { InputType, QuangInputComponent } from '@quix/quang/components/input'

@Component({
  selector: 'playground-input-test',
  standalone: true,
  imports: [FormsModule, JsonPipe, ReactiveFormsModule, QuangInputComponent, NgIf, NgForOf, TranslocoPipe],
  templateUrl: './input-test.component.html',
  styleUrl: './input-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTestComponent {
  inputTypes = signal<string[]>(['text', 'textarea', 'password', 'email', 'number', 'url', 'search', 'tel', 'color'])
  inputType = signal<InputType>('text')
  isReadonly = signal<boolean>(false)

  formBuilder = signal(inject(NonNullableFormBuilder))

  errors = signal([
    {
      error: Validators.required.name,
      message: 'form.errors.required'
    },
    {
      error: Validators.minLength.name,
      message: 'form.errors.minLength'
    },
    {
      error: Validators.maxLength.name,
      message: 'form.errors.maxLength'
    },
    {
      error: 'noMatch',
      message: 'form.errors.noMatch'
    }
  ])
  testForm = signal(
    this.formBuilder().group({
      testInput: this.formBuilder().control<string>('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30)
      ])
    })
  )
  testFormChange = this.testForm()
    .controls.testInput.valueChanges.pipe(takeUntilDestroyed())
    .subscribe((val) => {
      if (val && val === 'ciao') {
        this.testForm().controls.testInput.setErrors(null)
      } else if (val) {
        console.log('ciaoni')
        this.testForm().controls.testInput.setErrors({ noMatch: true })
        console.log('this.testForm().controls.testInput', this.testForm().controls.testInput.errors)
      }
    })
  showInput = signal(true)

  testValidation(): ValidatorFn {
    return (control: AbstractControl): Record<string, any> | null => {
      if (control.value && control.value !== 'ciao') {
        return { noMatch: true }
      }
      return null
    }
  }

  changeFormEnabled() {
    if (this.testForm().enabled) this.testForm().disable()
    else this.testForm().enable()
  }

  getIsRequiredInput() {
    return this.testForm().controls.testInput.hasValidator(Validators.required)
  }

  changeFormInputRequired() {
    if (this.getIsRequiredInput()) {
      this.testForm().controls.testInput.removeValidators(Validators.required)
    } else {
      this.testForm().controls.testInput.addValidators(Validators.required)
    }
    this.testForm().controls.testInput.updateValueAndValidity()
  }

  changeVisibility() {
    this.showInput.set(!this.showInput())
  }

  recreateForm() {
    this.testForm.set(
      this.formBuilder().group({
        testInput: this.formBuilder().control<string>('sì pirrone rigenerato!', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(30)
        ])
      })
    )
  }

  setFormValues() {
    this.testForm().patchValue({
      testInput: 'ciao!'
    })
  }

  checkCurrentFormValueAndValidity() {
    console.log('Current form value:', this.testForm().value)
    console.log('Current form validity:', this.testForm().valid)
  }

  setReadonly() {
    this.isReadonly.set(!this.isReadonly())
  }
}
