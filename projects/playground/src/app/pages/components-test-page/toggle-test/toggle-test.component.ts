import { JsonPipe, NgForOf, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangCheckboxComponent } from '@quix/quang/components/checkbox/checkbox.component'

@Component({
  selector: 'playground-toggle-test',
  standalone: true,
  imports: [FormsModule, JsonPipe, ReactiveFormsModule, QuangCheckboxComponent, NgIf, NgForOf, TranslocoPipe],
  templateUrl: './toggle-test.component.html',
  styleUrl: './toggle-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleTestComponent {
  isReadonly = signal<boolean>(false)

  formBuilder = signal(inject(NonNullableFormBuilder))

  errors = signal([
    {
      error: Validators.required.name,
      message: 'form.errors.required',
    },
    {
      error: Validators.minLength.name,
      message: 'form.errors.minLength',
    },
    {
      error: Validators.maxLength.name,
      message: 'form.errors.maxLength',
    },
  ])

  testForm = signal(
    this.formBuilder().group({
      toggle: this.formBuilder().control<boolean>(false, [Validators.required]),
      checkbox: this.formBuilder().control<boolean>(true, [Validators.required]),
    })
  )

  showInput = signal(true)

  changeFormEnabled() {
    if (this.testForm().enabled) this.testForm().disable()
    else this.testForm().enable()
  }

  getIsRequiredInput() {
    return this.testForm().controls.toggle.hasValidator(Validators.required)
  }

  changeFormInputRequired() {
    if (this.getIsRequiredInput()) {
      this.testForm().controls.toggle.removeValidators(Validators.required)
      this.testForm().controls.checkbox.removeValidators(Validators.required)
    } else {
      this.testForm().controls.toggle.addValidators(Validators.required)
      this.testForm().controls.checkbox.addValidators(Validators.required)
    }
    this.testForm().controls.toggle.updateValueAndValidity()
    this.testForm().controls.checkbox.updateValueAndValidity()
  }

  changeVisibility() {
    this.showInput.set(!this.showInput())
  }

  recreateForm() {
    this.testForm.set(
      this.formBuilder().group({
        toggle: this.formBuilder().control<boolean>(false, [Validators.required]),
        checkbox: this.formBuilder().control<boolean>(false, [Validators.required]),
      })
    )
  }

  setFormValues() {
    this.testForm().patchValue({
      toggle: true,
      checkbox: true,
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
