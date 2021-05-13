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
import * as moment from 'moment';
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { BsDatepickerConfig, BsDatepickerInlineDirective, BsLocaleService } from 'ngx-bootstrap/datepicker'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'quix-input-date-time',
  templateUrl: './input-date-time.component.html',
  styleUrls: ['./input-date-time.component.scss'],
})
export class InputDateTimeComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
  @Input() id: string
  @Input() label: string
  @Input() placeholder: string = ''
  @Input() hoursPlaceholder: string = 'hh'
  @Input() minutesPlaceholder: string = 'mm'
  @Input() secondsPlaceholder: string = 'ss'
  @Input() helpMessage: boolean
  @Input() dateFormat: string
  @Input() successMessage: boolean
  @Input() errorMessage: boolean
  @Input() showSecond: boolean
  @Input() showWeekNumbers: boolean
  @Input() showSelector: boolean
  @Input() showMeridianButton: boolean
  @Input() minDate: Date
  @Input() maxDate: Date
  @Input() autofocus: boolean
  @Input() disabledDates: Array<Date>
  @Input() buttonIcon: string | Array<string>
  @Input() hourStep: number
  @Input() minuteStep: number
  @Input() secondStep: number
  @Input() useMoment: number
  @Input() disabledDaysOfTheWeek: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>
  @Input() ariaLabel: string
  @Input() buttonClass: string[]
  @Input() tabIndex: number
  @Input() formName: string
  @Input() customClass: string[]
  @Input() size: 'sm'| 'lg' = null
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
  @Input() autocomplete: string = 'off';

  _valueDate: any
  _valueTime: any
  config: Partial<BsDatepickerConfig>
  _margin: string
  _successMessage: string
  _errorMessage: string
  _helpMessage: string
  _requiredValue: any
  _disabled: boolean
  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>
  @ViewChild('drp', { static: true }) datePicker: BsDatepickerInlineDirective
  onTouched: any = () => {
  }
  onChanged: any = () => {
  }

  constructor (
    private renderer: Renderer2,
    private localeService: BsLocaleService,
    @Self() @Optional() public control: NgControl,
    @Inject(LOCALE_ID) public locale: string,
  ) {
    this.control && (this.control.valueAccessor = this)
  }

  ngOnInit (): void {
    this.config = Object.assign({}, {
      containerClass: 'theme-default',
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: this.dateFormat
    })
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
      this._helpMessage = `${this.formName}.${this.control.name}.help`
    }
    if(!this.ariaLabel){
      this.ariaLabel = `Input ${this.label}`
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
    if (changes.autofocus && this.input) {
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

  // This is a basic setter that the forms API is going to use
  writeValue (value) {
    this._valueTime = value
    this._valueDate = value
  }

  setDisabledState (isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled)
    this._disabled = isDisabled
  }

  onChangedDate (date: Date) {
    this._valueTime = date
    this.onTouched()
    if (this.useMoment) {
      this.onChanged(moment(date))
    } else {
      this.onChanged(date)
    }
  }

  onChangedTime (date: Date) {
    this.onTouched()
    this._valueDate = date
    if (this.useMoment) {
      this.onChanged(moment(date))
    } else {
      this.onChanged(date)
    }
  }

  observeValidate () {
    this.control?.statusChanges
      .pipe(
        delay(0)
      )
      .subscribe(() => {
        if (this.control.dirty) {
          if (this.control.valid && this.successMessage) {
            this._successMessage = `${this.formName}.${this.control.name}.valid`
          } else if (this.control.invalid && this.errorMessage) {
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
