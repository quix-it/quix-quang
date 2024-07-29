import { JsonPipe, NgForOf, NgIf } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangAutocompleteComponent } from '@quix/quang/components/autocomplete'
import { SelectOption } from '@quix/quang/components/shared'

@Component({
  selector: 'playground-autocomplete-test',
  standalone: true,
  imports: [FormsModule, JsonPipe, ReactiveFormsModule, NgIf, NgForOf, TranslocoPipe, QuangAutocompleteComponent],
  templateUrl: './autocomplete-test.component.html',
  styleUrl: './autocomplete-test.component.scss',
})
export class AutocompleteTestComponent {
  isReadonly = signal<boolean>(false)

  stringList = [
    {
      code: 'required',
      description: 'This field is required.',
    },
    {
      code: 'minLength',
      description: 'This field must be at least 10 characters long.',
    },
    {
      code: 'maxLength',
      description: 'This field must be at most 30 characters long.',
    },
    {
      code: 'pattern',
      description: 'This field must match the following pattern: [a-zA-Z0-9]+',
    },
    {
      code: 'email',
      description: 'This field must be a valid email address.',
    },
    {
      code: 'min',
      description: 'This field must be greater than or equal to 10.',
    },
    {
      code: 'max',
      description: 'This field must be less than or equal to 30.',
    },
    {
      code: 'unique',
      description: 'This field must be unique.',
    },
    {
      code: 'custom',
      description: 'This field does not meet the custom validation rule.',
    },
    {
      code: 'async',
      description: 'This field does not meet the async validation rule.',
    },
  ].map(
    (x): SelectOption => ({
      label: x.description,
      value: x.code,
    })
  )

  numberList = [
    {
      code: 1,
      description: 'This field is required.',
    },
    {
      code: 2,
      description: 'This field must be at least 10 characters long.',
    },
    {
      code: 3,
      description: 'This field must be at most 30 characters long.',
    },
    {
      code: 4,
      description: 'This field must match the following pattern: [a-zA-Z0-9]+',
    },
    {
      code: 5,
      description: 'This field must be a valid email address.',
    },
    {
      code: 6,
      description: 'This field must be greater than or equal to 10.',
    },
    {
      code: 7,
      description: 'This field must be less than or equal to 30.',
    },
    {
      code: 8,
      description: 'This field must be unique.',
    },
    {
      code: 9,
      description: 'This field does not meet the custom validation rule.',
    },
    {
      code: 10,
      description: 'This field does not meet the async validation rule.',
    },
  ].map(
    (x): SelectOption => ({
      label: x.description,
      value: x.code,
    })
  )

  constructor() {
    this.onChangeForm()
  }

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
      testInput: this.formBuilder().control<string>('', [Validators.required]),
      testInputMultiple: this.formBuilder().control<number[]>([], [Validators.required]),
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
        testInput: this.formBuilder().control<string>(this.stringList[2].value as string, [Validators.required]),
        testInputMultiple: this.formBuilder().control<number[]>([1, 2], [Validators.required]),
      })
    )
  }

  setFormValues() {
    this.testForm().patchValue({
      testInput: 'min',
      testInputMultiple: [3, 4],
    })
  }

  checkCurrentFormValueAndValidity() {
    console.log('Current form value:', this.testForm().value)
    console.log('Current form validity:', this.testForm().valid)
  }

  setReadonly() {
    this.isReadonly.set(!this.isReadonly())
  }

  onChangeForm(): void {
    this.testForm().controls.testInput.valueChanges.subscribe((x) => {
      console.log('valueChange', x)
    })
  }

  onSelectOption(option: any): void {
    console.log(option)
    this.testForm().controls.testInput.patchValue('')
  }
}
