import { JsonPipe } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { SvgIconComponent } from 'angular-svg-icon'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../../shared/components/component-documentation/component-documentation.component'
import { DateRange, QuangDateComponent } from 'quang/components/date'

import { SourceCodeDirective } from '../../../../shared/directives/source-code.directive'

@Component({
  selector: 'playground-date-test',
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    TranslocoPipe,
    JsonPipe,
    QuangDateComponent,
    SvgIconComponent,
    ComponentDocumentationComponent,
    SourceCodeDirective,
  ],

  templateUrl: './date-test.component.html',
  styleUrl: './date-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTestComponent {
  private readonly quangTranslationService = inject(QuangTranslationService)
  protected QuangDateComponent = QuangDateComponent

  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? './assets/docs/date.md' : './assets/docs/date.it.md'
  )

  testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  private readonly formBuilder = inject(NonNullableFormBuilder)

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
    testInputNoTime: this.formBuilder.control<string>('', [Validators.required]),
    testInputRange: this.formBuilder.control<DateRange | null>(null, [Validators.required]),
  })

  // Event date as FormGroup - always keeps { dateFrom, dateTo } structure
  eventDateGroup = this.formBuilder.group({
    dateFrom: this.formBuilder.control<string>('', [Validators.required]),
    dateTo: this.formBuilder.control<string | null>(null),
  })

  // Synced FormControl<DateRange> for range mode binding
  eventDateRangeControl = this.formBuilder.control<DateRange | null>(null)

  changeDetection = inject(ChangeDetectorRef)

  onChangeValue$ = this.testForm.controls.testInput.valueChanges.subscribe((val) => {
    console.log(val)
    this.changeDetection.markForCheck()
  })

  // Sync eventDateRangeControl -> eventDateGroup
  private rangeToGroupSync$ = this.eventDateRangeControl.valueChanges.subscribe((value) => {
    if (value) {
      this.eventDateGroup.patchValue({ dateFrom: value.dateFrom ?? '', dateTo: value.dateTo }, { emitEvent: false })
    }
  })

  showInput = signal<boolean>(true)

  // Controls whether the event is repeatable (range selection)
  isRepeatable = signal<boolean>(false)

  changeFormEnabled() {
    if (this.testForm.enabled) this.testForm.disable()
    else this.testForm.enable()
  }

  constructor() {
    /*setTimeout(() => {
      this.testForm.controls.testInput.setValue(new Date().toISOString())
    }, 2000)*/
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
      testInputNoTime: this.formBuilder.control<string>(new Date().toISOString(), [Validators.required]),
      testInputRange: this.formBuilder.control<DateRange | null>(null, [Validators.required]),
    })
    const now = new Date().toISOString()
    this.eventDateGroup.patchValue({ dateFrom: now, dateTo: null })
    this.eventDateRangeControl.setValue({ dateFrom: now, dateTo: now })
  }

  setFormValues() {
    const targetDate = new Date()
    targetDate.setMonth(0)
    const endDate = new Date(targetDate)
    endDate.setDate(endDate.getDate() + 7)
    this.testForm.patchValue({
      testInput: targetDate.toISOString(),
      testInputNoTime: targetDate.toISOString(),
      testInputRange: {
        dateFrom: targetDate.toISOString(),
        dateTo: endDate.toISOString(),
      },
    })
    // Patch eventDateGroup
    this.eventDateGroup.patchValue({
      dateFrom: targetDate.toISOString(),
      dateTo: this.isRepeatable() ? endDate.toISOString() : null,
    })
    if (this.isRepeatable()) {
      this.eventDateRangeControl.setValue({
        dateFrom: targetDate.toISOString(),
        dateTo: endDate.toISOString(),
      })
    }
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

  // Toggle repeatable and sync values between eventDateGroup and eventDateRangeControl
  toggleRepeatable() {
    this.isRepeatable.set(!this.isRepeatable())
    const groupValue = this.eventDateGroup.getRawValue()

    if (this.isRepeatable()) {
      // Switching to range: sync group -> rangeControl; if dateTo missing, mirror dateFrom
      this.eventDateRangeControl.setValue(
        {
          dateFrom: groupValue.dateFrom || new Date().toISOString(),
          dateTo: groupValue.dateTo || groupValue.dateFrom || new Date().toISOString(),
        },
        { emitEvent: false }
      )
    } else {
      // Switching to single: sync rangeControl -> group.dateFrom, clear dateTo
      const rangeValue = this.eventDateRangeControl.value
      this.eventDateGroup.patchValue(
        {
          dateFrom: rangeValue?.dateFrom || groupValue.dateFrom || new Date().toISOString(),
          dateTo: null,
        },
        { emitEvent: false }
      )
    }

    this.changeDetection.markForCheck()
  }
}
