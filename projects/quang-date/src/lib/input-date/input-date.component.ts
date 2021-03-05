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
import * as moment from 'moment';
import { BsDatepickerConfig, BsDatepickerInlineDirective, BsLocaleService } from 'ngx-bootstrap/datepicker'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'quix-input-date',
  templateUrl: './input-date.component.html',
  styles: ['']
})
export class InputDateComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
  @Input() id: string
  @Input() label: string
  @Input() placeholder: string = ''
  @Input() helpMessage: boolean
  @Input() errorMessage: boolean
  @Input() successMessage: boolean
  @Input() autofocus: boolean
  @Input() returnISODate: boolean = false
  @Input() showWeekNumbers: boolean
  @Input() dateFormat: string
  @Input() minDate: Date
  @Input() maxDate: Date
  @Input() disabledDaysOfTheWeek: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>
  @Input() disabledDates: Array<Date>
  @Input() minView: 'year' | 'month' | 'day'
  @Input() buttonIcon: string | Array<string>
  @Input() useMoment: boolean
  @Input() ariaLabel: string
  @Input() buttonClass: string[]
  @Input() tabIndex: number
  @Input() formName: string
  @Input() customClass: string[]
  @Input() placement: 'top' | 'bottom' | 'left' | 'right'
  _value: any
  config: Partial<BsDatepickerConfig>
  _successMessage: string
  _errorMessage: string
  _helpMessage: string
  _requiredValue: any
  _classArray: string[] = []
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
    @Inject(LOCALE_ID) public locale: string,
    @Self() @Optional() public control: NgControl,
  ) {
    this.control && (this.control.valueAccessor = this)
  }

  ngOnInit (): void {
    this.config = {
      containerClass: 'theme-default',
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: this.dateFormat
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

  // This is a basic setter that the forms API is going to use
  writeValue (value) {
    if (this.returnISODate && value) {
      this._value = moment(value).toDate()
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
          if (this.control.valid && this.successMessage) {
            this._successMessage = `${this.formName}.${this.control.name}.valid`
          } else if (this.control.invalid && this.errorMessage) {
            for (let error in this.control.errors) {
              if (this.control.errors[error]) {
                this._errorMessage = `${this.formName}.${this.control.name}.${error}`
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
