import { JsonPipe, NgIf } from '@angular/common'
import { Component, DestroyRef, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangAutocompleteComponent } from '@quix/quang/components/autocomplete'
import { SelectOption } from '@quix/quang/components/shared'

@Component({
  selector: 'playground-autocomplete-test',
  imports: [FormsModule, JsonPipe, ReactiveFormsModule, NgIf, TranslocoPipe, QuangAutocompleteComponent],

  templateUrl: './autocomplete-test.component.html',
  styleUrl: './autocomplete-test.component.scss',
})
export class AutocompleteTestComponent {
  isReadonly = signal<boolean>(false)

  showValueAndValidity = signal<boolean>(false)

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

  textEqualValueStringList = signal<SelectOption[]>(
    this.stringList.map(
      (x): SelectOption => ({
        label: x.label,
        value: x.label,
      })
    )
  )

  textEqualValueStringListFiltered = signal<SelectOption[]>(
    this.stringList.map(
      (x): SelectOption => ({
        label: x.label,
        value: x.label,
      })
    )
  )

  fixedStringList = signal([...this.stringList])

  stringListFiltered = signal([...this.stringList])

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

  formBuilder = inject(NonNullableFormBuilder)

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

  testForm = this.formBuilder.group({
    testInput1: this.formBuilder.control<string | null>(null, [Validators.required]),
    testInput2: this.formBuilder.control<string | null>(null, [Validators.required]),
    testInput3: this.formBuilder.control<string | null>(null, [Validators.required]),
    testInput4: this.formBuilder.control<string | null>(null, [Validators.required]),
    testInputMultiple: this.formBuilder.control<number[]>([], [Validators.required]),
  })

  showInput = signal<boolean>(true)

  destroyRef = inject(DestroyRef)

  constructor() {
    this.onChangeForm()
    setTimeout(() => {
      this.testForm.patchValue({
        testInput1: 'required',
        testInput2: 'required',
      })
    }, 2000)
  }

  changeFormEnabled() {
    if (this.testForm.enabled) this.testForm.disable()
    else this.testForm.enable()
  }

  getIsRequiredInput() {
    return this.testForm.controls.testInput1.hasValidator(Validators.required)
  }

  changeFormInputRequired() {
    if (this.getIsRequiredInput()) {
      this.testForm.controls.testInput1.removeValidators(Validators.required)
    } else {
      this.testForm.controls.testInput1.addValidators(Validators.required)
    }
    this.testForm.controls.testInput1.updateValueAndValidity()
  }

  changeVisibility() {
    this.showInput.set(!this.showInput())
  }

  recreateForm() {
    this.testForm = this.formBuilder.group({
      testInput1: this.formBuilder.control<string | null>(this.stringList[2].value as string, [Validators.required]),
      testInput2: this.formBuilder.control<string | null>(this.stringList[2].value as string, [Validators.required]),
      testInput3: this.formBuilder.control<string | null>(this.stringList[2].value as string, [Validators.required]),
      testInput4: this.formBuilder.control<string | null>(this.stringList[2].value as string, [Validators.required]),
      testInputMultiple: this.formBuilder.control<number[]>([1, 2], [Validators.required]),
    })
  }

  setFormValues() {
    this.testForm.patchValue({
      testInput1: 'min',
      testInputMultiple: [3, 4],
    })
  }

  checkCurrentFormValueAndValidity() {
    this.showValueAndValidity.set(true)
  }

  setReadonly() {
    this.isReadonly.set(!this.isReadonly())
  }

  onChangeForm(): void {
    this.testForm.controls.testInput1.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((x) => {
      console.log('valueChange --->', x)
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectOption(option: any): void {
    console.log(option)
  }

  changeTextTest($event: string) {
    // test for string changes and autocompletes
    setTimeout(() => {
      this.stringListFiltered.set(this.stringList.filter((y) => y.label.toLowerCase().includes($event.toLowerCase())))
    }, 500)
  }

  changeTextTestFixed($event: string) {
    // test for string changes and autocompletes
    setTimeout(() => {
      this.textEqualValueStringListFiltered.set(
        this.fixedStringList()
          .filter((y) => y.label.toLowerCase().includes($event.toLowerCase()))
          .map((x) => ({
            label: x.label,
            value: x.label,
          }))
      )
    }, 500)
  }
}
