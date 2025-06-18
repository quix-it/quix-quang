import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { QuangSelectComponent } from 'quang/components/select'
import { SelectOption } from 'quang/components/shared'

import { SourceCodeDirective } from '../../../shared/directives/source-code.directive'

@Component({
  selector: 'playground-select-test',
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    TranslocoPipe,
    QuangSelectComponent,
    ComponentDocumentationComponent,
    SourceCodeDirective,
  ],
  templateUrl: './select-test.component.html',
  styleUrl: './select-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTestComponent {
  // Expose QuangSelectComponent for use in the template
  protected QuangSelectComponent = QuangSelectComponent
  private readonly quangTranslationService = inject(QuangTranslationService)
  testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? './assets/docs/select.md' : './assets/docs/select.it.md'
  )

  isReadonly = signal<boolean>(false)

  showValueAndValidity = signal<boolean>(false)

  singleList: SelectOption[] = [
    {
      value: 'required',
      label: 'This field is required.',
    },
  ]

  stringList: SelectOption[] = [
    {
      value: 'required',
      label: 'This field is required.',
    },
    {
      value: 'minLength',
      label: 'This field must be at least 10 characters long.',
    },
    {
      value: 'maxLength',
      label: 'This field must be at most 30 characters long.',
    },
    {
      value: 'pattern',
      label: 'This field must match the following pattern: [a-zA-Z0-9]+',
    },
    {
      value: 'email',
      label: 'This field must be a valid email address.',
    },
    {
      value: 'min',
      label: 'This field must be greater than or equal to 10.',
    },
    {
      value: 'max',
      label: 'This field must be less than or equal to 30.',
    },
    {
      value: 'unique',
      label: 'This field must be unique.',
    },
    {
      value: 'custom',
      label: 'This field does not meet the custom validation rule.',
    },
    {
      value: 'async',
      label: 'This field does not meet the async validation rule.',
    },
  ]

  numberList: SelectOption[] = [
    {
      value: 1,
      label: 'This field is required.',
    },
    {
      value: 2,
      label: 'This field must be at least 10 characters long.',
    },
    {
      value: 3,
      label: 'This field must be at most 30 characters long.',
    },
    {
      value: 4,
      label: 'This field must match the following pattern: [a-zA-Z0-9]+',
    },
    {
      value: 5,
      label: 'This field must be a valid email address.',
    },
    {
      value: 6,
      label: 'This field must be greater than or equal to 10.',
    },
    {
      value: 7,
      label: 'This field must be less than or equal to 30.',
    },
    {
      value: 8,
      label: 'This field must be unique.',
    },
    {
      value: 9,
      label: 'This field does not meet the custom validation rule.',
    },
    {
      value: 10,
      label: 'This field does not meet the async validation rule.',
    },
  ]

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
    testInput: this.formBuilder.control<string>('', [Validators.required]),
    testInputMultiple: this.formBuilder.control<number[]>([], [Validators.required]),
  })

  showInput = signal(true)

  onChangeTestInput = this.testForm.controls.testInput.valueChanges.pipe(takeUntilDestroyed()).subscribe((val) => {
    console.log(val)
  })

  onChangeTestInputMultiple = this.testForm.controls.testInputMultiple.valueChanges
    .pipe(takeUntilDestroyed())
    .subscribe((val) => {
      console.log(val)
    })

  changeFormEnabled() {
    if (this.testForm.enabled) this.testForm.disable()
    else this.testForm.enable()
  }

  getIsRequiredInput() {
    return this.testForm.controls.testInput.hasValidator(Validators.required)
  }

  changeFormInputRequired() {
    if (this.getIsRequiredInput()) {
      this.testForm.controls.testInput.removeValidators(Validators.required)
    } else {
      this.testForm.controls.testInput.addValidators(Validators.required)
    }
    this.testForm.controls.testInput.updateValueAndValidity()
  }

  changeVisibility() {
    this.showInput.set(!this.showInput())
  }

  recreateForm() {
    this.testForm = this.formBuilder.group({
      testInput: this.formBuilder.control<string>(this.stringList[2].value as string, [Validators.required]),
      testInputMultiple: this.formBuilder.control<number[]>([1, 2], [Validators.required]),
    })
  }

  setFormValues() {
    this.testForm.patchValue({
      testInput: 'min',
      testInputMultiple: [3, 4],
    })
  }

  checkCurrentFormValueAndValidity() {
    this.showValueAndValidity.set(true)
    console.log('Current form value:', this.testForm.value)
    console.log('Current form validity:', this.testForm.valid)
  }

  setReadonly() {
    this.isReadonly.set(!this.isReadonly())
  }

  constructor() {
    setTimeout(() => {
      console.log('è il momento dei pocci')
      this.testForm.controls.testInputMultiple.patchValue(1 as any)
    }, 5000)
  }
}
