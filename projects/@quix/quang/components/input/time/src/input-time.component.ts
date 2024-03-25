import {
  Component,
  DoCheck,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Optional,
  Renderer2,
  Self,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { TimepickerComponent, TimepickerConfig } from 'ngx-bootstrap/timepicker'

export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    allowEmptyTime: true
  })
}

/**
 * input time component decorator
 */
@Component({
  selector: 'quang-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})
/**
 * input time component
 */
export class QuangInputTimeComponent implements ControlValueAccessor, OnInit, DoCheck {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * The label to display on the input field
   */
  @Input() label: string = ''
  /**
   * Defines if you want to display the help message for the user
   */
  @Input() helpMessage: boolean = false
  /**
   * Defines if you want to display the error message for the user
   */
  @Input() errorMessage: boolean = false
  /**
   * Defines if you want to display the success message for the user
   */
  @Input() successMessage: boolean = false
  /**
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = ''
  /**
   * Defines whether to display the button that allows you to enter the hours in 24h or 12h format
   */
  @Input() showMeridianButton: boolean = false
  /**
   * defines the minimum selectable date
   */
  @Input() minTime: Date | undefined = undefined
  /**
   * defines the maximum selectable date
   */
  @Input() maxTime: Date | undefined = undefined
  /**
   * defines whether to display the chevrons for time selection
   */
  @Input() showSelector: boolean = false
  /**
   * defines whether to display the seconds input
   */
  @Input() showSecond: boolean = false
  /**
   * the hour advance interval
   */
  @Input() hourStep: number = 0
  /**
   * the minute advance interval
   */
  @Input() minuteStep: number = 0
  /**
   * the second advance interval
   */
  @Input() secondStep: number = 0

  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * Adds css classes to the component
   */
  @Input() customClass: string[] = []
  /**
   * The placeholder of the hours input field
   */
  @Input() hoursPlaceholder: string = 'hh'
  /**
   * The placeholder of the minutes input field
   */
  @Input() minutesPlaceholder: string = 'mm'
  /**
   * The placeholder of the seconds input field
   */
  @Input() secondsPlaceholder: string = 'ss'
  /**
   * define if inputs can be empty
   */
  @Input() allowEmptyTime: boolean = true
  /**
   * Defines whether the input field is in a read-only state
   */
  @Input() readonly: boolean = false
  /**
   * The value of the input
   */
  _value: any
  /**
   * the status of the success message
   */
  _successMessage: string = ''
  /**
   * the status of the help message
   */
  _helpMessage: string = ''
  /**
   * internal status disabled
   */
  _disabled: boolean = false
  /**
   * The html input element
   */
  @ViewChild('input', { static: true }) input: TimepickerComponent | undefined

  @Input() errorMap: Record<string, string>

  errorMessageKey: string = ''

  requiredValue: string = ''

  /**
   * constructor
   * @param renderer html access
   * @param localeService locale utility
   * @param locale actual locale
   * @param ngControl cva access
   */
  constructor(
    private readonly renderer: Renderer2,
    private readonly localeService: BsLocaleService,
    @Inject(LOCALE_ID) @Optional() public locale: string,
    @Self() @Optional() public ngControl?: NgControl
  ) {
    if (this.ngControl) this.ngControl.valueAccessor = this
  }

  /**
   * Standard definition to create a control value accessor
   */
  onTouched: any = () => {}

  /**
   * Standard definition to create a control value accessor
   */
  onChanged: any = () => {}

  /**
   * init locale
   * chek help message and init the key
   */
  ngOnInit(): void {
    if (this.locale) {
      this.localeService.use(this.locale)
    }
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.ngControl?.name}.help`
    }
  }

  ngDoCheck(): void {
    if (!this.errorMessage || this.ngControl?.valid) return
    const errorKey = Object.keys(this.ngControl?.errors ?? {})[0]
    this.errorMessageKey = this.errorMap?.[errorKey] ?? `${this.formName}.${this.ngControl?.name}.${errorKey}`
    this.requiredValue =
      this.ngControl?.errors?.[errorKey]?.[
        errorKey === 'minlength' || errorKey === 'maxlength' ? 'requiredLength' : 'requiredValue'
      ]
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnChange(fn: any): void {
    this.onChanged = fn
  }

  /**
   * event triggered when the time changes
   * @param date
   */
  onChangedHandler(date: any): void {
    this.onTouched()
    this.onChanged(date)
  }

  /**
   * When the form is initialized it saves the data in the component state
   * @param value
   */
  writeValue(value: any): void {
    this._value = value ? new Date(value) : value
    if (this.input) {
      this.renderer.setValue([this.input.hours, this.input.minutes], value)
    }
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled || this.readonly
  }
}
