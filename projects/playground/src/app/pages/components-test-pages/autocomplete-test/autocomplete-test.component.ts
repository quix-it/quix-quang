import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal, viewChild } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { SelectOption } from 'quang/components/shared'

import { SourceCodeDirective } from '../../../shared/directives/source-code.directive'

@Component({
  selector: 'playground-autocomplete-test',
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    TranslocoPipe,
    QuangAutocompleteComponent,
    ComponentDocumentationComponent,
    SourceCodeDirective,
  ],
  templateUrl: './autocomplete-test.component.html',
  styleUrl: './autocomplete-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteTestComponent {
  private readonly quangTranslationService = inject(QuangTranslationService)
  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en'
      ? './assets/docs/autocomplete.md'
      : './assets/docs/autocomplete.it.md'
  )

  // Expose QuangAutocompleteComponent for use in the template
  protected QuangAutocompleteComponent = QuangAutocompleteComponent

  private readonly testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

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
    testInput2: this.formBuilder.control<string[]>([], [Validators.required]),
    testInput3: this.formBuilder.control<string | null>(null, [Validators.required]),
    testInput4: this.formBuilder.control<string | null>(null, [Validators.required]),
    testInputMultiple: this.formBuilder.control<number[]>([], [Validators.required]),
  })

  showInput = signal<boolean>(true)

  destroyRef = inject(DestroyRef)

  constructor() {
    setTimeout(() => {
      this.testForm.patchValue({
        testInput1: 'required',
        testInput2: ['required', 'minLength'],
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
      testInput2: this.formBuilder.control<string[]>([this.stringList[2].value as string], [Validators.required]),
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
