import { JsonPipe, NgForOf, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { SvgIconComponent } from 'angular-svg-icon'

import { QuangDateComponent } from '@quix/quang/components/date'
import { QuangInputComponent } from '@quix/quang/components/input'

@Component({
  selector: 'playground-date-test',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    QuangInputComponent,
    NgIf,
    NgForOf,
    TranslocoPipe,
    QuangDateComponent,
    QuangDateComponent,
    SvgIconComponent,
  ],
  templateUrl: './date-test.component.html',
  styleUrl: './date-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTestComponent {
  formBuilder = signal(inject(NonNullableFormBuilder))

  isReadonly = signal(false)

  showValueAndValidity = signal<boolean>(false)

  dateFormat = signal('dd/MM/yyyy')

  errors = signal([
    {
      error: Validators.required.name,
      message: 'form.errors.required',
    },
    /* {
      error: 'invalidDate',
      message: 'form.errors.invalidDate'
    } */
  ])

  testForm = signal(
    this.formBuilder().group({
      testInput: this.formBuilder().control<Date | string>('', [Validators.required]),
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
        testInput: this.formBuilder().control<Date | string>(new Date(), [Validators.required]),
      })
    )
  }

  setFormValues() {
    const targetDate = new Date()
    targetDate.setMonth(0)
    this.testForm().patchValue({
      testInput: targetDate,
    })
  }

  checkCurrentFormValueAndValidity() {
    this.showValueAndValidity.set(true)
    console.log('Current form value:', this.testForm().value)
    console.log('Current form value json:', JSON.stringify(this.testForm().value))
    console.log('Current form validity:', this.testForm().valid)
  }

  changeDateFormat() {
    console.log('changeData')
    this.isReadonly.set(!this.isReadonly())
    this.dateFormat.set('yyyy/MM/dd')
  }

  setReadonly() {
    this.isReadonly.set(!this.isReadonly())
  }
}
