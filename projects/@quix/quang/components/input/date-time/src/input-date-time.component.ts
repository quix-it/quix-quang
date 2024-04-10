import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

import { setSeconds } from 'date-fns'
import { BsDatepickerConfig, BsDatepickerInlineDirective, BsLocaleService } from 'ngx-bootstrap/datepicker'
import { TimepickerComponent } from 'ngx-bootstrap/timepicker'

/**
 * input date time component decorator
 */
@Component({
  selector: 'quang-input-date-time',
  templateUrl: './input-date-time.component.html',
  styleUrls: ['./input-date-time.component.scss']
})
/**
 * input date time component
 */
export class InputDateTimeComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges, DoCheck {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * The label to display on the input field
   */
  @Input() label: string = ''
  /**
   * The placeholder of the input field
   */
  @Input() placeholder: string = ''
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
   * Defines if you want to display the help message for the user
   */
  @Input() helpMessage: boolean = false
  /**
   * defines the format of the return date
   */
  @Input() dateFormat: string = ''
  /**
   * Defines if you want to display the success message for the user
   */
  @Input() successMessage: boolean = false
  /**
   * Defines if you want to display the error message for the user
   */
  @Input() errorMessage: boolean = false
  /**
   * defines whether to display the seconds input
   */
  @Input() showSecond: boolean = false
  /**
   * defines whether to display the week number
   */
  @Input() showWeekNumbers: boolean = false
  /**
   * defines whether to display the chevrons for time selection
   */
  @Input() showSelector: boolean = false
  /**
   * defines whether to display the button to change the selection from 24h to 12h
   */
  @Input() showMeridianButton: boolean = false
  /**
   * defines the minimum selectable date
   */
  @Input() minDate: Date | undefined = undefined
  /**
   * defines the maximum selectable date
   */
  @Input() maxDate: Date | undefined = undefined
  /**
   * defines the minimum selectable time
   */
  @Input() minTime: Date | undefined = undefined
  /**
   * defines the maximum selectable time
   */
  @Input() maxTime: Date | undefined = undefined
  /**
   * Indicates whether, when the page is opened,
   * this input field should be displayed in a focused state or not
   */
  @Input() autofocus: boolean = false
  /**
   * the list of dates that cannot be selected in the calendar
   */
  @Input() disabledDates: Date[] = []
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
   * defines which days of the week to disable from the selection
   */
  @Input() disabledDaysOfTheWeek: Array<0 | 1 | 2 | 3 | 4 | 5 | 6> = []
  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`
  /**
   * Defines the class of the selector open button
   */
  @Input() buttonClass: string[] = []
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = ''
  /**
   * Adds css classes to the component
   */
  @Input() customClass: string[] = []
  /**
   * Defines where to place the date selector in response to the input field
   */
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
  /**
   * Define the size of the input field following the bootstrap css rules
   */
  @Input() size: 'sm' | 'lg' | null = null
  /**
   * Defines the autocomplete tag to indicate to the browser what type of field it is
   * and how to help the user fill it in
   */
  @Input() autocomplete: string = 'off'
  /**
   * Defines whether the input field is in a read-only state
   */
  @Input() readonly: boolean = false

  /**
   * Contains the component configurations
   */
  config: Partial<BsDatepickerConfig> | undefined = undefined

  /**
   * the internal state of the date
   */
  _valueDate: any
  /**
   * the internal state of the time
   */
  _valueTime: any
  /**
   * Contains the component configurations
   */
  // config: Partial<BsDatepickerConfig> | undefined = undefined
  /**
   * the top margin of the component
   */
  _margin: string = ''
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
  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement> | undefined

  @ViewChild('input', { static: true }) inputBtn: ElementRef<HTMLButtonElement> | undefined

  /**
   * Dropdown selector html element ref
   */
  @ViewChild('drp', { static: true }) datePicker: BsDatepickerInlineDirective | undefined

  @ViewChild('timepicker', { static: true }) timePicker: TimepickerComponent | undefined

  @Input() errorMap: Record<string, string>

  errorMessageKey: string = ''

  requiredValue: string = ''

  /**
   * constructor
   * @param renderer html access
   * @param localeService locale utility
   * @param ngControl cva access
   * @param locale actual locale
   */

  constructor(
    private readonly renderer: Renderer2,
    private readonly localeService: BsLocaleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
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
   * chek style
   * init locale
   * check help message and init key
   */
  ngOnInit(): void {
    this.config = {
      containerClass: 'theme-default',
      isAnimated: true,
      adaptivePosition: true,
      returnFocusToInput: true,
      dateInputFormat: this.dateFormat,
      rangeInputFormat: this.dateFormat,
      showWeekNumbers: this.showWeekNumbers
    }
    this._margin = this.label ? (this.showSelector ? '.3rem' : '2rem') : '0'
    if (this.locale) {
      this.localeService.use(this.locale)
    }
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.ngControl?.name}.help`
    }
    if (this.successMessage) {
      this._successMessage = `${this.formName}.${this.ngControl?.name}.valid`
    }
  }

  /**
   * After rendering the component, it checks if the input field must have focus
   * and activates the monitoring of the validation of the entered values
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input?.nativeElement.focus()
      }
    }, 0)
    this.ngControl?.control?.markAsPristine()
    if (this._valueDate) {
      setTimeout(() => {
        this.onBsValueChange(this._valueDate)
      })
    }
    if (this._valueTime) {
      setTimeout(() => {
        this.onBsValueChange(this._valueTime)
      })
    }
  }

  /**
   * Add focus to the input field if the need comes after component initialization
   * @param changes component changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus && this.input) {
      this.input.nativeElement.focus()
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
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled || this.readonly)
    this.renderer.setProperty(this.inputBtn?.nativeElement, 'disabled', isDisabled || this.readonly)
    this._disabled = isDisabled
  }

  onBsValueChange(date: Date | undefined | null): void {
    this.onTouched()
    if (!date) {
      if ((this._valueTime && this._valueDate) !== null) this.onChanged(null)
    } else if (date.toString() === 'Invalid Date') {
      this.onChanged(null)
      this.ngControl?.control?.setErrors({ invalidDate: true })
      this.ngControl?.control?.markAsDirty()
    } else {
      this.onChanged(date)
      this._valueTime = new Date(date)
    }
  }

  onChangeTime(date: any): void {
    this.onTouched()
    if (date) {
      this.onChanged(this.showSecond ? date : setSeconds(date, 0))
    }
  }

  /**
   * When the form is initialized it saves the data in the component state
   * @param value
   */
  writeValue(value: any): void {
    if (value) {
      this._valueTime = new Date(value)
      this._valueDate = new Date(value)
    } else {
      this._valueTime = value
      this._valueDate = value
    }
    if (this.input) {
      this.renderer.setProperty(this.input.nativeElement, 'value', value)
      this.renderer.setValue([this.timePicker?.hours, this.timePicker?.minutes], value)
    }
    this.changeDetectorRef.detectChanges()
  }
}
