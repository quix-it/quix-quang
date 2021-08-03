import {
  AfterViewInit,
  Component,
  Inject,
  Input, LOCALE_ID,
  OnInit,
  Optional,
  Renderer2,
  Self,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { delay } from 'rxjs/operators'
import { BsTimepickerViewComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-timepicker-view.component'

@Component({
  selector: 'quix-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss']
})
/**
 * input time component
 */
export class InputTimeComponent implements ControlValueAccessor, AfterViewInit, OnInit {
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
  @Input() minTime: Date | null = null
  /**
   * defines the maximum selectable date
   */
  @Input() maxTime: Date | null = null
  /**
   * defines whether to display the chevrons for time selection
   */
  @Input() showSelector: boolean = false
  /**
   * defines whether to display the seconds input
   */
  @Input() showSecond: boolean = true
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
   * Defines whether the return date should be a moment
   */
  @Input() useMoment: number | null = null
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
   * The value of the input
   */
  _value: any
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
  @ViewChild('input', { static: true }) input: BsTimepickerViewComponent
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
   * @param renderer
   * @param localeService
   * @param locale
   * @param control
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
    this.observeValidate()
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
   * event triggered when the time changes
   * @param date
   */
  onChangedHandler (date: Date) {
    this.onTouched()
    this.onChanged(date)
  }

  /**
   * When the form is initialized it saves the data in the component state
   * @param value
   */
  writeValue (value) {
    this._value = value
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState (isDisabled: boolean): void {
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
