import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { InputType, QuangInputComponent } from 'quang/components/input'
import { QuangSelectComponent } from 'quang/components/select'
import { SelectOption } from 'quang/components/shared'

import { SourceCodeDirective } from '../../../shared/directives/source-code.directive'

@Component({
  selector: 'playground-input-test',
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    QuangInputComponent,
    TranslocoPipe,
    QuangSelectComponent,
    ComponentDocumentationComponent,
    SourceCodeDirective,
  ],
  templateUrl: './input-test.component.html',
  styleUrl: './input-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTestComponent {
  private readonly quangTranslationService = inject(QuangTranslationService)
  protected QuangInputComponent = QuangInputComponent

  private readonly testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  // Path to the components README.md file
  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? './assets/docs/input.md' : './assets/docs/input.it.md'
  )

  inputTypesList: InputType[] = ['number', 'url', 'tel', 'color', 'email', 'password', 'search', 'text', 'textarea']

  inputTypes = computed<SelectOption[]>(() => this.inputTypesList.map((x) => ({ label: x, value: x })))

  inputType = signal<InputType>('text')

  isReadonly = signal<boolean>(false)

  showValueAndValidity = signal<boolean>(false)

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
    {
      error: 'noMatch',
      message: 'form.errors.noMatch',
    },
    // {
    //   error: 'fiscalCode',
    //   message: 'form.error.fiscalCode'
    // }
  ])

  testForm = this.formBuilder.group({
    testInput: this.formBuilder.control<string>('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(30),
      // isFiscalCode()
    ]),
  })

  testFormChange = this.testForm.controls.testInput.valueChanges.pipe(takeUntilDestroyed()).subscribe((val) => {
    if (val && val === 'ciao') {
      // this.testForm.controls.testInput.setErrors(null)
    } else if (val) {
      console.log('ciaoni')
      // this.testForm.controls.testInput.setErrors({ noMatch: true })
      console.log('this.testForm.controls.testInput', this.testForm.controls.testInput.errors)
    }
  })

  showInput = signal(true)

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
      testInput: this.formBuilder.control<string>('New form created', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30),
      ]),
    })
  }

  setFormValues() {
    this.testForm.patchValue({
      testInput: 'ciao!',
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
}
