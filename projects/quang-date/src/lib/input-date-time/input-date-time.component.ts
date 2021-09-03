import {
  AfterViewInit,
  Component,
  ElementRef, Inject,
  Input, LOCALE_ID,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild,
} from '@angular/core'

import { ControlValueAccessor, NgControl } from '@angular/forms'
import { BsDatepickerConfig, BsDatepickerInlineDirective, BsLocaleService } from 'ngx-bootstrap/datepicker'
import { delay } from 'rxjs/operators'

/**
 * input date time component decorator
 */
@Component({
  selector: 'quix-input-date-time',
  templateUrl: './input-date-time.component.html',
  styleUrls: ['./input-date-time.component.scss'],
})
/**
 * input date time component
 */
export class InputDateTimeComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
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
  @Input() showSecond: boolean = true
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
  @Input() minDate: Date | null = null
  /**
   * defines the maximum selectable date
   */
  @Input() maxDate: Date | null = null
  /**
   * Indicates whether, when the page is opened,
   * this input field should be displayed in a focused state or not
   */
  @Input() autofocus: boolean = false
  /**
   * the list of dates that cannot be selected in the calendar
   */
  @Input() disabledDates: Array<Date> = []
  /**
   * the hour advance interval
   */
  @Input() hourStep: number | null = null
  /**
   * the minute advance interval
   */
  @Input() minuteStep: number | null = null
  /**
   * the second advance interval
   */
  @Input() secondStep: number | null = null
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
  @Input() size: 'sm' | 'lg' = null
  /**
   * Defines the autocomplete tag to indicate to the browser what type of field it is
   * and how to help the user fill it in
   */
  @Input() autocomplete: string = 'off'
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
  config: Partial<BsDatepickerConfig> = null
  /**
   * the top margin of the component
   */
  _margin: string
  /**
   * the status of the success message
   */
  _successMessage: string = ''
  /**
   * the status of the error message
   */
  _errorMessage: string = ''
  /**
   * the status of the help message
   */
  _helpMessage: string = ''
  /**
   * Contains the value required by a validation when it fails
   */
  _requiredValue: any = ''
  /**
   * internal status disabled
   */
  _disabled: boolean = false
  /**
   * The html input element
   */
  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>
  /**
   * Dropdown selector html element ref
   */
  @ViewChild('drp', { static: true }) datePicker: BsDatepickerInlineDirective
  /**
   * Standard definition to create a control value accessor
   */
  onTouched: any = () => {
  }
  /**
   * Standard definition to create a control value accessor
   */
  onChanged: any = () => {
  }

  /**
   * constructor
   * @param renderer html access
   * @param localeService locale utility
   * @param control cva access
   * @param locale actual locale
   */
  constructor (
    private readonly renderer: Renderer2,
    private readonly localeService: BsLocaleService,
    @Self() @Optional() public control: NgControl,
    @Inject(LOCALE_ID) public locale: string,
  ) {
    this.control && (this.control.valueAccessor = this)
  }

  /**
   * chek style
   * init locale
   * check help message and init key
   */
  ngOnInit (): void {
    this.config = {
      containerClass: 'theme-default',
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: this.dateFormat,
      showWeekNumbers: this.showWeekNumbers
    }
    if (this.label) {
      if (this.showSelector) {
        this._margin = '.3rem'
      } else {
        this._margin = '2rem'
      }
    } else {
      this._margin = '0'
    }
    if (this.locale) {
      this.localeService.use(this.locale)
    }
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control?.name}.help`
    }
  }

  /**
   * After rendering the component, it checks if the input field must have focus
   * and activates the monitoring of the validation of the entered values
   */
  ngAfterViewInit (): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.nativeElement.focus()
      }
    }, 0)
    this.observeValidate()
  }

  /**
   * Add focus to the input field if the need comes after component initialization
   * @param changes component changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.autofocus && this.input) {
      this.input.nativeElement.focus()
    }
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnTouched (fn: any) {
    this.onTouched = fn
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnChange (fn: any) {
    this.onChanged = fn
  }

  /**
   * When the form is initialized it saves the data in the component state
   * @param value
   */
  writeValue (value) {
    if (value) {
      this._valueTime = this._valueDate = new Date(value)
    }
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState (isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled)
    this._disabled = isDisabled
  }

  /**
   * event triggered when the date changes
   * @param date
   */
  onChangedDate (date: Date) {
    this.onTouched()
    this._valueTime = date
    this.onChanged(date)
  }

  /**
   * event triggered at the change of time
   * @param date
   */
  onChangedTime (date: Date) {
    this.onTouched()
    this._valueDate = date
    this.onChanged(date)
  }

  /**
   * When the input field changes,
   * the validation status is retrieved and the success message or error messages displayed.
   * If there is an error with a specific required value it is passed to the translation pipe
   * to allow for the creation of custom messages
   */
  observeValidate () {
    this.control?.statusChanges.pipe(
      delay(0)
    ).subscribe(() => {
      if (this.control.dirty) {
        if (this.control.valid && this.successMessage) {
          this._successMessage = `${this.formName}.${this.control?.name}.valid`
        } else if (this.control.invalid && this.errorMessage) {
          for (const error in this.control.errors) {
            if (this.control.errors.hasOwnProperty(error)) {
              if (this.control.errors[error]) {
                this._errorMessage = `${this.formName}.${this.control?.name}.${error}`
                this._requiredValue = this.control.errors[error].requiredValue
              }
            }
          }
        }
      }
    })
  }
}
