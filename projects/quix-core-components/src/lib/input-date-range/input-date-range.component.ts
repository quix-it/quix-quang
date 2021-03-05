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
import moment, { Moment } from 'moment'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'quix-input-date-range',
  templateUrl: './input-date-range.component.html',
  styleUrls: ['./input-date-range.component.scss']
})
export class InputDateRangeComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
  @Input() id: string
  @Input() label: string
  @Input() placeholder: string = ''
  @Input() placement: string
  @Input() helpMessage: boolean
  @Input() autofocus: boolean
  @Input() errorMessage: boolean
  @Input() successMessage: boolean
  @Input() returnISODate: boolean
  @Input() showWeekNumbers: boolean
  @Input() dateFormat: string
  @Input() inputDateFormat: string
  @Input() minDate: Date
  @Input() maxDate: Date
  @Input() disabledDaysOfTheWeek: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>
  @Input() disabledDates: Array<Date>
  @Input() minView: 'year' | 'month' | 'day'
  @Input() iconClass: string[]
  @Input() useMoment: boolean
  @Input() ariaLabel: string
  @Input() buttonClass: string[]
  @Input() tabIndex: number
  @Input() formName: string
  @Input() customClass: string[]
  @Input('value')
  config: Partial<BsDatepickerConfig>
  _value: any[]
  _successMessage: string
  _errorMessage: string
  _helpMessage: string
  _requiredValue: any
  _disabled: boolean
  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>
  onTouched: any = () => {
  }
  onChanged: any = () => {
  }

  constructor (private renderer: Renderer2,
    @Inject(LOCALE_ID) public locale: string,
    @Self() @Optional() public control: NgControl,
    private localeService: BsLocaleService
  ) {
    this.control && (this.control.valueAccessor = this)
  }

  ngOnInit (): void {
    this.config = {
      containerClass: 'theme-default',
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: this.dateFormat,
      rangeInputFormat: this.inputDateFormat,
      showWeekNumbers: this.showWeekNumbers
    }
    if (this.locale) {
      this.localeService.use(this.locale)
    }
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control.name}.help`
    }
  }

  ngAfterViewInit (): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.nativeElement.focus()
      }
    }, 0)
    this.observeValidate()
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.autofocus?.currentValue && this.input) {
      this.input.nativeElement.focus()
    }
  }

  // We implement this method to keep a reference to the onChange
  // callback function passed by the forms API
  registerOnChange (fn: any) {
    this.onChanged = fn
  }

  // We implement this method to keep a reference to the onTouched
  // callback function passed by the forms API
  registerOnTouched (fn: any) {
    this.onTouched = fn
  }

  onChangedHandler (dates: Date[]) {
    this.onTouched()
    if (this.useMoment) {
      this.onChanged(dates?.map(d => moment(d)))
    } else if (this.returnISODate) {
      this.onChanged(dates)
    } else {
      this.onChanged(dates?.map(d => moment(d).format('YYYY-MM-DD')))
    }
  }

  // This is a basic setter that the forms API is going to use
  writeValue (value) {
    if (!this.returnISODate && value.length) {
      this._value = value.map(d => new Date(d))
    } else {
      this._value = value
    }
  }

  setDisabledState (isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled)
    this._disabled = isDisabled
  }

  observeValidate () {
    this.control?.statusChanges
      .pipe(
        delay(0)
      )
      .subscribe(() => {
        if (this.control.dirty) {
          if (this._value.length && this.successMessage) {
            this._successMessage = `${this.formName}.${this.control.name}.valid`
          } else if (!this._value.length && this.errorMessage) {
            for (const error in this.control.errors) {
              if (this.control.errors.hasOwnProperty(error)) {
                if (this.control.errors[error]) {
                  this._errorMessage = `${this.formName}.${this.control.name}.${error}`
                  this._requiredValue = this.control.errors[error].requiredValue
                }
              }
            }
          }
        }
      })
  }
}
