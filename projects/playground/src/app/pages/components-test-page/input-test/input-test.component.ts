import { JsonPipe, NgForOf, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@ngneat/transloco'

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
    }
  ])

  testForm = signal(
    this.formBuilder().group({
      testInput: this.formBuilder().control<string>('no pirrone!', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30)
      ])
    })
  )
  showInput = signal(true)

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
        testInput: this.formBuilder().control<string>('no pirrone rigenerato!', [
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
}
