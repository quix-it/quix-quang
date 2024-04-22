import { JsonPipe, NgForOf, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@ngneat/transloco'

import { QuangWysiwygComponent } from '@quix/quang/components/wysiwyg'

@Component({
  selector: 'playground-wysiwyg-test',
  standalone: true,
  imports: [FormsModule, JsonPipe, ReactiveFormsModule, NgIf, NgForOf, TranslocoPipe, QuangWysiwygComponent],
  templateUrl: './wysiwyg-test.component.html',
  styleUrl: './wysiwyg-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WysiwygTestComponent {
  isReadonly = signal<boolean>(false)

  formBuilder = signal(inject(NonNullableFormBuilder))

  errors = signal([
    {
      error: Validators.required.name,
      message: 'form.errors.required'
    },
    {
      error: Validators.minLength.name,
      message: 'form.errors.minLength'
    },
    {
      error: Validators.maxLength.name,
      message: 'form.errors.maxLength'
    }
  ])

  testForm = signal(
    this.formBuilder().group({
      testInput: this.formBuilder().control<string>('sì pirrone!', [Validators.required])
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
        testInput: this.formBuilder().control<string>('sì pirrone rigenerato!', [Validators.required])
      })
    )
  }

  setFormValues() {
    this.testForm().controls.testInput.patchValue('ciao!')
  }

  checkCurrentFormValueAndValidity() {
    console.log('Current form value:', this.testForm().value)
    console.log('Current form validity:', this.testForm().valid)
  }

  setReadonly() {
    this.isReadonly.set(!this.isReadonly())
  }
}
