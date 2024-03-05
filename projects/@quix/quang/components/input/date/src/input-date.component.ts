import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  Optional,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { NgControl } from '@angular/forms'

import { formatDate } from 'ngx-bootstrap/chronos'
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker'

let nextUniqueId = 0

@Component({
  selector: 'quang-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class QuangInputDateComponent implements OnInit, AfterViewInit, OnChanges, DoCheck {
  protected _uid = `quang-input-date-${nextUniqueId++}`

  @Input()
  public get id(): string {
    return this._id
  }

  public set id(value: string) {
    this._id = value || this._uid
  }

  protected _id: string = ''

  @Input() label: string = ''
  @Input() ariaLabel: string = `Input ${this.label}`
  @Input() placeholder: string = ''

  @Input() formName: string = ''
  @Input() helpMessage: boolean = false
  @Input() successMessage: boolean = false
  @Input() errorMessage: boolean = false
  @Input() errorMap: Record<string, string>

  helpMessageKey: string = ''
  successMessageKey: string = ''
  errorMessageKey: string = ''
  requiredValue: string = ''

  @Input() autofocus: boolean = false

  @Input() returnISODate: boolean = false
  @Input() showWeekNumbers: boolean = false
  @Input() dateFormat: string = ''
  @Input() minDate?: Date
  @Input() maxDate?: Date
  @Input() disabledDaysOfTheWeek: Array<0 | 1 | 2 | 3 | 4 | 5 | 6> = []
  @Input() disabledDates: Date[] = []
  @Input() minView: 'year' | 'month' | 'day' = 'year'

  @Input() buttonClass: string[] = []
  @Input() tabIndex: number = 0
  @Input() customClass: string[] = []
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
  @Input() size: 'sm' | 'lg' | null = null
  @Input() autocomplete = 'off'
  @Input() readonly = false

  bsConfig?: Partial<BsDatepickerConfig>

  isDisabled = false
  @ViewChild('input') input: ElementRef<HTMLInputElement> | undefined

  @ViewChild('inputBtn') inputBtn: ElementRef<HTMLButtonElement> | undefined

  constructor(
    private readonly localeService: BsLocaleService,
    @Inject(LOCALE_ID) public locale: string,
    @Self() @Optional() public ngControl?: NgControl
  ) {
    if (this.ngControl)
      this.ngControl.valueAccessor = {
        writeValue(): void {},
        registerOnChange(): void {},
        registerOnTouched(): void {}
      }
    // Force setter to be called in case id was not specified.
    // eslint-disable-next-line no-self-assign
    this.id = this.id
  }

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-default',
      isAnimated: true,
      adaptivePosition: true,
      returnFocusToInput: true,
      dateInputFormat: this.dateFormat,
      showWeekNumbers: this.showWeekNumbers
    }
    if (this.locale) {
      this.localeService.use(this.locale)
    }
    if (this.helpMessage) {
      this.helpMessageKey = `${this.formName}.${this.ngControl?.name}.help`
    }
    if (this.successMessage) {
      this.successMessageKey = `${this.formName}.${this.ngControl?.name}.valid`
    }
  }

  ngAfterViewInit(): void {
    if (this.autofocus) this.input?.nativeElement.focus()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus?.currentValue) this.input?.nativeElement.focus()
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
          let [dateStart, dateEnd] = errorData.dateBetween?.requiredValue ?? []
          if (this.dateFormat && dateStart && dateEnd) {
            dateStart = formatDate(new Date(dateStart), this.dateFormat)
            dateEnd = formatDate(new Date(dateEnd), this.dateFormat)
          }
          this.requiredValue = `${dateStart} - ${dateEnd}`
        }
        break
      case 'bsDate':
        if (errorData.invalid)
          this.errorMessageKey = this.errorMap?.invalidDate ?? `${this.formName}.${this.ngControl?.name}.invalidDate`
        if (errorData.minDate) {
          this.errorMessageKey = this.errorMap?.minDate ?? `${this.formName}.${this.ngControl?.name}.minDate`
          this.requiredValue = errorData.minDate
        }
        if (errorData.maxDate) {
          this.errorMessageKey = this.errorMap?.maxDate ?? `${this.formName}.${this.ngControl?.name}.maxDate`
          this.requiredValue = errorData.maxDate
        }
        break
      default:
        this.requiredValue = errorData?.requiredValue
    }
  }

  isValid(): boolean {
    return !!(this.successMessage && this.ngControl?.valid && (this.ngControl?.dirty ?? this.ngControl?.touched))
  }

  isInvalid(): boolean {
    return !!(this.errorMessage && this.ngControl?.invalid && (this.ngControl?.dirty ?? this.ngControl?.touched))
  }
}
