import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, TemplateRef, computed, inject, signal, viewChild } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../../shared/components/component-documentation/component-documentation.component'
import { QuangRadioGroupComponent, QuangRadioOptionTemplateContext, RadioOption } from 'quang/components/radio-group'

import { SourceCodeDirective } from '../../../../shared/directives/source-code.directive'

@Component({
  selector: 'playground-radio-group-test',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    TranslocoPipe,
    QuangRadioGroupComponent,
    ComponentDocumentationComponent,
    SourceCodeDirective,
  ],
  templateUrl: './radio-group-test.component.html',
  styleUrl: './radio-group-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupTestComponent {
  protected QuangRadioGroupComponent = QuangRadioGroupComponent
  private readonly quangTranslationService = inject(QuangTranslationService)

  private readonly optTpl = viewChild<TemplateRef<QuangRadioOptionTemplateContext>>('optTpl')
  private readonly testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en'
      ? './assets/docs/radio-group.md'
      : './assets/docs/radio-group.it.md'
  )

  formBuilder = inject(NonNullableFormBuilder)

  errors = signal([
    {
      error: Validators.required.name,
      message: 'form.errors.required',
    },
  ])

  radioPosition = signal<'left' | 'right'>('left')

  isReadonly = signal<boolean>(false)
  isShowingSuccess = signal<boolean>(false)
  isShowingHelperText = signal<boolean>(false)

  testForm = this.formBuilder.group({
    standardChoice: this.formBuilder.control<string | null>(null, [Validators.required]),
    templatedChoice: this.formBuilder.control<string | null>(null, [Validators.required]),
  })

  options = computed<RadioOption[]>(() => [
    { value: 'A', label: 'Option A' },
    { value: 'B', label: 'Option B' },
    {
      value: 'C',
      label: 'Option C (disabled)',
      disabled: true,
    },
  ])

  templatedOptions = computed<RadioOption[]>(() => [
    { value: 'A', label: 'Option A' },
    {
      value: 'B',
      renderer: this.optTpl(),
    },
    { value: 'C', label: 'Option C' },
  ])

  toggleDisabled(): void {
    if (this.testForm.enabled) this.testForm.disable()
    else this.testForm.enable()
  }

  toggleReadonly(): void {
    this.isReadonly.set(!this.isReadonly())
  }

  toggleShowSuccess(): void {
    this.isShowingSuccess.set(!this.isShowingSuccess())
  }

  toggleShowHelperText(): void {
    this.isShowingHelperText.set(!this.isShowingHelperText())
  }

  toggleRadioPosition(): void {
    this.radioPosition.set(this.radioPosition() === 'left' ? 'right' : 'left')
  }

  resetForm(): void {
    this.testForm.reset()
  }
}
