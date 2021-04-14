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
export class InputTimeComponent implements ControlValueAccessor, AfterViewInit, OnInit {
  @Input() id: string
  @Input() label: string
  @Input() helpMessage: boolean
  @Input() errorMessage: boolean
  @Input() successMessage: boolean
  @Input() formName: string
  @Input() showMeridianButton: boolean
  @Input() minTime: Date
  @Input() maxTime: Date
  @Input() showSelector: boolean
  @Input() showSecond: boolean
  @Input() hourStep: number
  @Input() minuteStep: number
  @Input() secondStep: number
  @Input() useMoment: boolean
  @Input() ariaLabel: string
  @Input() tabIndex: number
  @Input() disabled: boolean
  @Input() customClass: string[]
  @Input() hoursPlaceholder: string = 'hh'
  @Input() minutesPlaceholder: string = 'mm'
  @Input() secondsPlaceholder: string = 'ss'
  _value: any
  _successMessage: string
  _errorMessage: string
  _helpMessage: string
  _requiredValue: any
  _classArray: string[] = []
  @ViewChild('input', { static: true }) input: BsTimepickerViewComponent
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
    this.observeValidate()
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
    this.onChanged(date)
  }

  // This is a basic setter that the forms API is going to use
  writeValue (value) {
    this._value = value
  }

  setDisabledState (isDisabled: boolean): void {
    this.disabled = isDisabled
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
