import { JsonPipe, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangWysiwygComponent, QuangWysiwygOptions } from '@quix/quang/components/wysiwyg'

@Component({
  selector: 'playground-wysiwyg-test',
  imports: [FormsModule, JsonPipe, ReactiveFormsModule, NgIf, TranslocoPipe, QuangWysiwygComponent],
  standalone: true,
  templateUrl: './wysiwyg-test.component.html',
  styleUrl: './wysiwyg-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WysiwygTestComponent {
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
    // testInput: this.formBuilder.control<string>( 'gagagagagagagaga', [
    testInput: this.formBuilder.control<string>({ value: 'gagagagagagagaga', disabled: true }, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
    ]),
  })

  showInput = signal(true)

  wysiwygOptions: QuangWysiwygOptions = {
    imageUploadSizeLimit: 100000000000,
    iframe: true,
    iframeCSSFileName: '.+',
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
