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

import { format } from 'date-fns'
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker'

/**
 * input date component decorator
 */
@Component({
  selector: 'quang-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
/**
 * input date component
 */
export class QuangInputDateComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges, DoCheck {
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
  @Input() minDate: Date | undefined = undefined
  /**
   * defines the maximum selectable date
   */
  @Input() maxDate: Date | undefined = undefined
  /**
   * defines which days of the week to disable from the selection
   */
  @Input() disabledDaysOfTheWeek: Array<0 | 1 | 2 | 3 | 4 | 5 | 6> = []
  /**
   * the list of dates that cannot be selected in the calendar
   */
  @Input() disabledDates: Date[] = []
  /**
   * defines the starting view
   */
  @Input() minView: 'year' | 'month' | 'day' = 'year'
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
  @ViewChild('input') input: ElementRef<HTMLInputElement> | undefined

  @ViewChild('inputBtn') inputBtn: ElementRef<HTMLButtonElement> | undefined

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
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(LOCALE_ID) public locale: string,
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
   * check help message and init the key
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
    if (this._value) {
      setTimeout(() => {
        this.onBsValueChange(this._value)
      })
    }
  }

  /**
   * Add focus to the input field if the need comes after component initialization
   * @param changes component changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus?.currentValue && this.input) {
      this.input.nativeElement.focus()
    }
  }

  ngDoCheck(): void {
    if (!this.errorMessage || this.ngControl?.valid) return
    const errorKey = Object.keys(this.ngControl?.errors ?? {})[0]
    this.errorMessageKey = this.errorMap?.[errorKey] ?? `${this.formName}.${this.ngControl?.name}.${errorKey}`
    const errorData = this.ngControl?.errors?.[errorKey]
    switch (errorKey) {
      case 'minlength':
      case 'maxlength':
        this.requiredValue = errorData.requiredLength
        break
      case 'dateBetween':
        {
          let dateStart = errorData.dateBetween.requiredValue[0]
          let dateEnd = errorData.dateBetween.requiredValue[1]
          if (this.dateFormat) {
            dateStart = format(new Date(dateStart), this.fixedDateFnsFormat(this.dateFormat))
            dateEnd = format(new Date(dateEnd), this.fixedDateFnsFormat(this.dateFormat))
          }
          this.requiredValue = `${dateStart} - ${dateEnd}`
        }
        break
      default:
        this.requiredValue = errorData.requiredValue
    }
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
   * method triggered when the date selection changes, it triggers the native events of the cva
   * @param date
   */
  onBsValueChange(date: Date | undefined): void {
    this.onTouched()
    if (!date) {
      this.onChanged(null)
    } else if (date.toString() === 'Invalid Date') {
      this.onChanged(null)
      this.ngControl?.control?.setErrors({ invalidDate: true })
      this.ngControl?.control?.markAsDirty()
    } else if (this.returnISODate) {
      this.onChanged(date)
    } else {
      this.onChanged(format(date, this.fixedDateFnsFormat(this.dateFormat)))
    }
  }

  /**
   * When the form is initialized it saves the data in the component state
   * @param value
   */
  writeValue(value: any): void {
    this._value = value && typeof value === 'string' ? new Date(value) : value
    if (this.input) {
      this.renderer.setProperty(
        this.input.nativeElement,
        'value',
        this._value ? format(this._value, this.fixedDateFnsFormat(this.dateFormat)) : this._value
      )
    }
    this.changeDetectorRef.detectChanges()
  }

  fixedDateFnsFormat(date: string): string {
    return date.replace('DD', 'dd').replace('YYYY', 'yyyy')
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState(isDisabled: boolean): void {
    if (this.renderer) {
      if (this.input) {
        this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled || this.readonly)
      }
      if (this.inputBtn) {
        this.renderer.setProperty(this.inputBtn?.nativeElement, 'disabled', isDisabled || this.readonly)
      }
    }
    this._disabled = isDisabled
  }
}
