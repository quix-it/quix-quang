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
import { ControlValueAccessor, NgControl } from '@angular/forms'
import * as moment from 'moment'
import { BsDatepickerConfig, BsDatepickerInlineDirective, BsLocaleService } from 'ngx-bootstrap/datepicker'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'quix-input-date',
  templateUrl: './input-date.component.html',
  styles: ['']
})
/**
 * input date component
 */
export class InputDateComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
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
   * Defines if you want to display the error message for the user
   */
  @Input() errorMessage: boolean = false
  /**
   * Defines if you want to display the success message for the user
   */
  @Input() successMessage: boolean = false
  /**
   * Indicates whether, when the page is opened,
   * this input field should be displayed in a focused state or not
   */
  @Input() autofocus: boolean = false
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
   * Defines whether the return date should be a moment
   */
  @Input() useMoment: boolean
  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`
  /**
   * Defines the class of the selector open button
   */
  @Input() buttonClass: string[]
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
   * The value of the input
   */
  _value: any
  /**
   * Contains the component configurations
   */
  config: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-default',
    isAnimated: true,
    adaptivePosition: true,
    dateInputFormat: this.dateFormat
  }
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
   * @param localeService
   * @param locale
   * @param control cva access
   */
  constructor (
    private readonly renderer: Renderer2,
    private readonly localeService: BsLocaleService,
    @Inject(LOCALE_ID) public locale: string,
    @Self() @Optional() public control: NgControl,
  ) {
    this.control && (this.control.valueAccessor = this)
  }

  ngOnInit (): void {
    if (this.locale) {
      this.localeService.use(this.locale)
    }
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control?.name}.help`
    }
    if (!this.ariaLabel) {
      this.ariaLabel = `Input ${this.label}`
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
   * @param changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.autofocus?.currentValue && this.input) {
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
   * method triggered when the date selection changes, it triggers the native events of the cva
   * @param date
   */
  onChangedHandler (date: Date) {
    this.onTouched()
    if (this.useMoment) {
      this.onChanged(moment(date))
    } else if (this.returnISODate) {
      this.onChanged(date)
    } else {
      this.onChanged(moment(date).format('YYYY-MM-DD'))
    }
  }

  /**
   * When the form is initialized it saves the data in the component state
   * @param value
   */
  writeValue (value) {
    if (this.returnISODate && value) {
      this._value = moment(value).toDate()
    } else {
      this._value = value
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
  observeValidate () {
    this.control?.statusChanges.pipe(
      delay(0)
    ).subscribe(() => {
      if (this.control.dirty) {
        if (this.control.valid && this.successMessage) {
          this._successMessage = `${this.formName}.${this.control?.name}.valid`
        } else if (this.control.invalid && this.errorMessage) {
          for (let error in this.control.errors) {
            if (this.control.errors[error]) {
              this._errorMessage = `${this.formName}.${this.control?.name}.${error}`
              if (error === 'dateBetween') {
                if (this.dateFormat) {
                  this._requiredValue = moment(this.control.errors['dateBetween']['requiredValue'][0]).format(this.dateFormat)
                  this._requiredValue += ' - '
                  this._requiredValue += moment(this.control.errors['dateBetween']['requiredValue'][1]).format(this.dateFormat)
                } else {
                  this._requiredValue = this.control.errors['dateBetween']['requiredValue'][0]
                  this._requiredValue += ' - '
                  this._requiredValue += this.control.errors['dateBetween']['requiredValue'][1]
                }
              } else {
                if (this.dateFormat) {
                  this._requiredValue = moment(this.control.errors[error]['requiredValue']).format(this.dateFormat)
                } else {
                  this._requiredValue = this.control.errors[error]['requiredValue']
                }
              }
            }
          }
        }
      }
    })
  }
}
