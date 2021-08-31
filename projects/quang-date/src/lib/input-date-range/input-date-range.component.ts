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
  ViewChild
} from '@angular/core'
import { format } from 'date-fns'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker'
import { delay, filter } from 'rxjs/operators'

/**
 * input date range component decorator
 */
@Component({
  selector: 'quix-input-date-range',
  templateUrl: './input-date-range.component.html',
  styles: ['']
})
/**
 * input date range component
 */
export class InputDateRangeComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
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
   * Defines if you want to display the help message for the user
   */
  @Input() helpMessage: boolean = false
  /**
   * Indicates whether, when the page is opened,
   * this input field should be displayed in a focused state or not
   */
  @Input() autofocus: boolean = false
  /**
   * Defines if you want to display the error message for the user
   */
  @Input() errorMessage: boolean = false
  /**
   * Defines if you want to display the success message for the user
   */
  @Input() successMessage: boolean = false
  /**
   * defines if the selected date must return in ISO ISO 8601 format
   */
  @Input() returnISODate: boolean = false
  /**
   * defines you want to see the week numbers in the selector
   */
  @Input() showWeekNumbers: boolean = false
  /**
   * defines the format of the return date
   */
  @Input() dateFormat: string = ''
  /**
   * defines the minimum selectable date
   */
  @Input() minDate: Date | null = null
  /**
   * defines the maximum selectable date
   */
  @Input() maxDate: Date | null = null
  /**
   * defines which days of the week to disable from the selection
   */
  @Input() disabledDaysOfTheWeek: Array<0 | 1 | 2 | 3 | 4 | 5 | 6> = []
  /**
   * the list of dates that cannot be selected in the calendar
   */
  @Input() disabledDates: Array<Date> = []
  /**
   * defines the starting view
   */
  @Input() minView: 'year' | 'month' | 'day'

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
   * Contains the component configurations
   */
  config: Partial<BsDatepickerConfig> = null
  /**
   * The value of the input
   */
  _value: any[] = []
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
   * @param locale
   * @param control cva access
   * @param renderer html access
   * @param localeService locale utility
   */
  constructor (
    @Inject(LOCALE_ID) public locale: string,
    @Self() @Optional() public control: NgControl,
    private readonly renderer: Renderer2,
    private readonly localeService: BsLocaleService
  ) {
    this.control.valueAccessor = this
  }

  /**
   *  init locale
   *  chek hel message and create key
   */
  ngOnInit (): void {
    this.config = {
      containerClass: 'theme-default',
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: this.dateFormat,
      rangeInputFormat: this.dateFormat,
      showWeekNumbers: this.showWeekNumbers
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
    if (changes.autofocus?.currentValue && this.input) {
      this.input.nativeElement.focus()
    }
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnTouched (fn: any): void {
    this.onTouched = fn
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnChange (fn: any): void {
    this.onChanged = fn
  }

  /**
   * method triggered when the date selection changes, it triggers the native events of the cva
   * @param dates
   */
  onChangedHandler (dates: Date[]) {
    this.onTouched()
    if (this.returnISODate) {
      this.onChanged([...dates])
    } else {
      this.onChanged([...dates.map(d => format(d, 'yyyy-MM-dd'))])
    }
  }

  /**
   * When the form is initialized it saves the data in the component state
   * @param value
   */
  writeValue (value): void {
    if (value) {
      if (!this.returnISODate && value?.length) {
        this._value = value.map(d => new Date(d))
      } else {
        this._value = value
      }
    } else {
      this._value = []
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
   * When the input field changes,
   * the validation status is retrieved and the success message or error messages displayed.
   * If there is an error with a specific required value it is passed to the translation pipe
   * to allow for the creation of custom messages
   */
  observeValidate (): void {
    this.control?.statusChanges.pipe(
      delay(0),
      filter(() => this.control.dirty)
    ).subscribe(() => {
      if (this._value.length && this.successMessage) {
        this._successMessage = `${this.formName}.${this.control?.name}.valid`
      } else if (!this._value.length && this.errorMessage) {
        for (const error in this.control.errors) {
          if (this.control.errors.hasOwnProperty(error)) {
            if (this.control.errors[error]) {
              this._errorMessage = `${this.formName}.${this.control?.name}.${error}`
              this._requiredValue = this.control.errors[error].requiredValue
            }
          }
        }
      }
    })
  }
}
