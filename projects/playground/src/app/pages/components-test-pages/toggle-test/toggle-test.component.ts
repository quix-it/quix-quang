import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { QuangCheckboxComponent } from 'quang/components/checkbox/checkbox.component'

import { SourceCodeDirective } from '../../../shared/directives/source-code.directive'

@Component({
  selector: 'playground-toggle-test',
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    QuangCheckboxComponent,
    TranslocoPipe,
    ComponentDocumentationComponent,
    SourceCodeDirective,
  ],

  templateUrl: './toggle-test.component.html',
  styleUrl: './toggle-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleTestComponent {
  protected ToggleTestComponent = QuangCheckboxComponent

  testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  // Path to the components README.md file
  componentsReadmePath = './assets/docs/checkbox.md'

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
  ])

  testForm = this.formBuilder.group({
    toggle: this.formBuilder.control<boolean>(false, [Validators.required]),
    checkbox: this.formBuilder.control<boolean>(true, [Validators.required]),
  })

  showInput = signal(true)

  changeFormEnabled() {
    if (this.testForm.enabled) this.testForm.disable()
    else this.testForm.enable()
  }

  getIsRequiredInput() {
    return this.testForm.controls.toggle.hasValidator(Validators.required)
  }

  changeFormInputRequired() {
    if (this.getIsRequiredInput()) {
      this.testForm.controls.toggle.removeValidators(Validators.required)
      this.testForm.controls.checkbox.removeValidators(Validators.required)
    } else {
      this.testForm.controls.toggle.addValidators(Validators.required)
      this.testForm.controls.checkbox.addValidators(Validators.required)
    }
    this.testForm.controls.toggle.updateValueAndValidity()
    this.testForm.controls.checkbox.updateValueAndValidity()
  }

  changeVisibility() {
    this.showInput.set(!this.showInput())
  }

  recreateForm() {
    this.testForm = this.formBuilder.group({
      toggle: this.formBuilder.control<boolean>(false, [Validators.required]),
      checkbox: this.formBuilder.control<boolean>(false, [Validators.required]),
    })
  }

  setFormValues() {
    this.testForm.patchValue({
      toggle: true,
      checkbox: true,
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
