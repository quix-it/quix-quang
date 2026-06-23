import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FormField, FormRoot, disabled, form, maxLength, minLength, required } from '@angular/forms/signals'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
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
    FormRoot,
    FormField,
    QuangInputComponent,
    TranslocoPipe,
    QuangSelectComponent,
    ComponentDocumentationComponent,
    SourceCodeDirective,
    AngularSvgIconModule,
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

  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? './assets/docs/input.md' : './assets/docs/input-it.md'
  )

  inputTypesList: InputType[] = ['number', 'url', 'tel', 'color', 'email', 'password', 'search', 'text', 'textarea']

  inputTypes = computed<SelectOption[]>(() => this.inputTypesList.map((x) => ({ label: x, value: x })))

  inputType = signal<InputType>('text')

  isReadonly = signal<boolean>(false)

  showValueAndValidity = signal<boolean>(false)

  errors = signal([
    {
      error: 'required',
      message: 'form.errors.required',
    },
    {
      error: 'minLength',
      message: 'form.errors.minLength',
    },
    {
      error: 'maxLength',
      message: 'form.errors.maxLength',
    },
    {
      error: 'noMatch',
      message: 'form.errors.noMatch',
    },
  ])

  helpMessage = signal<string>('form.helpMessage.inputTest')

  readonly isFormDisabled = signal(false)
  readonly isRequired = signal(true)
  readonly recreatedMinLength = signal(1)
  readonly testModel = signal({ testInput: '' })

  readonly testForm = form(this.testModel, (p) => {
    disabled(p.testInput, () => this.isFormDisabled())
    required(p.testInput, { when: () => this.isRequired() })
    minLength(p.testInput, () => this.recreatedMinLength())
    maxLength(p.testInput, 30)
  })

  showInput = signal(true)
  showPassword = signal(false)

  constructor() {
    effect(() => {
      const val = this.testModel().testInput
      if (val === 'ciao') {
        // noop
      } else if (val) {
        console.log('ciaoni')
        console.log('errors:', this.testForm.testInput().errors())
      }
    })
  }

  onToggleShowPassword(event: boolean): void {
    this.showPassword.set(event)
  }

  changeFormEnabled() {
    this.isFormDisabled.update((v) => !v)
  }

  getIsRequiredInput() {
    return this.testForm.testInput().required()
  }

  changeFormInputRequired() {
    this.isRequired.update((v) => !v)
  }

  changeVisibility() {
    this.showInput.set(!this.showInput())
  }

  recreateForm() {
    this.testModel.set({ testInput: 'New form created' })
    this.recreatedMinLength.set(10)
  }

  setFormValues() {
    this.testModel.update((m) => ({ ...m, testInput: 'ciao!' }))
  }

  checkCurrentFormValueAndValidity() {
    this.showValueAndValidity.set(true)
    console.log('Current form value:', this.testForm().value())
    console.log('Current form validity:', this.testForm().valid())
  }

  setReadonly() {
    this.isReadonly.set(!this.isReadonly())
  }
}
