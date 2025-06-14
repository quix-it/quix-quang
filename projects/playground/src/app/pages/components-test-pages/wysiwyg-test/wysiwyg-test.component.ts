import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { QuangWysiwygComponent, QuangWysiwygOptions } from 'quang/components/wysiwyg'

import { SourceCodeDirective } from '../../../shared/directives/source-code.directive'

@Component({
  selector: 'playground-wysiwyg-test',
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    TranslocoPipe,
    QuangWysiwygComponent,
    ComponentDocumentationComponent,
    SourceCodeDirective,
  ],

  templateUrl: './wysiwyg-test.component.html',
  styleUrl: './wysiwyg-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WysiwygTestComponent {
  protected WysiwygTestComponent = QuangWysiwygComponent
  private readonly quangTranslationService = inject(QuangTranslationService)
  private readonly testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  // Path to the components README.md file
  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? './assets/docs/wysiwyg.md' : './assets/docs/wysiwyg.it.md'
  )

  isReadonly = signal<boolean>(false)

  showValueAndValidity = signal<boolean>(false)

  formBuilder = inject(NonNullableFormBuilder)

  highlightColor = signal(true)

  wysiwygHeight = signal<string>('200px')

  errors = signal([
    { error: Validators.required.name, message: 'form.errors.required' },
    { error: Validators.minLength.name, message: 'form.errors.minLength' },
    { error: Validators.maxLength.name, message: 'form.errors.maxLength' },
  ])

  testForm = this.formBuilder.group({
    testInput: this.formBuilder.control<string>({ value: 'gagagagagagagaga', disabled: false }, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
    ]),
  })

  showInput = signal(true)

  wysiwygOptions: QuangWysiwygOptions = {
    iframe: true,
    iframeCSSFileName: '.+',
    minHeight: undefined,
    height: undefined,
  }

  onImageUploadError = (errorMessage: any, result: any, core: any) => {
    console.log('onImageUploadError', errorMessage, result, core)
    return true
  }

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
      testInput: this.formBuilder.control<string>('New form created', [Validators.required]),
    })
  }

  setFormValues() {
    this.testForm.controls.testInput.patchValue('ciao!')
  }

  checkCurrentFormValueAndValidity() {
    this.showValueAndValidity.set(true)
    console.log('Current form value:', this.testForm.value)
    console.log('Current form validity:', this.testForm.valid)
  }

  setReadonly() {
    this.isReadonly.set(!this.isReadonly())
  }

  flipButton() {
    this.highlightColor.set(!this.highlightColor())
  }

  changeHeight() {
    this.wysiwygHeight.set(`${Math.random() * 500}px`)
  }
}
