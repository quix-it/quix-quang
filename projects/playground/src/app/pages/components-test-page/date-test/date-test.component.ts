import { JsonPipe, NgForOf, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core'
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
    JsonPipe,
    QuangDateComponent,
    QuangDateComponent,
    SvgIconComponent,
  ],
  templateUrl: './date-test.component.html',
  styleUrl: './date-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTestComponent {
  formBuilder = inject(NonNullableFormBuilder)

  isReadonly = signal<boolean>(false)

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

  testForm = this.formBuilder.group({
    testInput: this.formBuilder.control<string>('', [Validators.required]),
  })

  changeDetection = inject(ChangeDetectorRef)

  onChangeValue$ = this.testForm.controls.testInput.valueChanges.subscribe((val) => {
    console.log(val)
    this.changeDetection.markForCheck()
  })

  showInput = signal<boolean>(true)

  changeFormEnabled() {
    if (this.testForm.enabled) this.testForm.disable()
    else this.testForm.enable()
  }

  constructor() {
    setTimeout(() => {
      this.testForm.controls.testInput.setValue(new Date().toISOString())
    }, 2000)
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

  resetForm(): void {
    this.testForm.reset()
  }

  recreateForm() {
    this.testForm = this.formBuilder.group({
      testInput: this.formBuilder.control<string>(new Date().toISOString(), [Validators.required]),
    })
  }

  setFormValues() {
    const targetDate = new Date()
    targetDate.setMonth(0)
    this.testForm.patchValue({
      testInput: targetDate.toISOString(),
    })
  }

  checkCurrentFormValueAndValidity() {
    this.showValueAndValidity.set(true)
  }

  changeDateFormat() {
    this.isReadonly.set(!this.isReadonly())
    this.dateFormat.set('yyyy/MM/dd')
  }

  setReadonly() {
    this.isReadonly.set(!this.isReadonly())
  }
}
