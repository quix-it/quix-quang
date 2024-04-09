import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Inject,
  Injector,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  forwardRef
} from '@angular/core'
import { ControlValueAccessor, FormControl, FormControlName, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms'

import { format, isValid, parse, startOfDay } from 'date-fns'
import { BsDatepickerConfig, BsDatepickerInputDirective, BsLocaleService } from 'ngx-bootstrap/datepicker'

let nextUniqueId = 0

@Component({
  selector: 'quang-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangInputDateComponent),
      multi: true
    }
  ]
})
export class QuangInputDateComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges, DoCheck {
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
  @Input() showWeekNumbers: boolean = false
  /**
   * @see https://valor-software.com/ngx-bootstrap/old/10.3.0/#/components/datepicker?tab=overview#format
   * @default ISO_8601
   */
  @Input() dateInputFormat: string = ''
  /**
   * @see https://date-fns.org/v3.3.1/docs/format
   * @default 'dd/MM/yyyy'
   */
  @Input() dateRenderFormat: string = 'dd/MM/yyyy'
  @Input() minDate?: Date
  @Input() maxDate?: Date
  @Input() disabledDaysOfTheWeek: Array<0 | 1 | 2 | 3 | 4 | 5 | 6> = []
  @Input() disabledDates: Date[] = []
  @Input() buttonClass: string[] = []
  @Input() tabIndex: number = 0
  @Input() customClass: string[] = []
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
  @Input() size: 'sm' | 'lg' | null = null
  @Input() autocomplete = 'off'
  @Input() readonly = false
  bsConfig?: Partial<BsDatepickerConfig>
  @ViewChild(BsDatepickerInputDirective, { static: true }) datePickerInputDirective?: BsDatepickerInputDirective
  @ViewChild('datePickerInput', { static: true }) datePickerInput?: ElementRef<HTMLInputElement>
  internalDateControl = new FormControl<Date | null>(null)
  ngControl?: FormControlName
  public onChange: (value: Date | null) => void
  public onTouched: () => void
  protected _uid = `quang-input-date-${nextUniqueId++}`

  protected _id: string = ''

  @Input()
  public get id(): string {
    return this._id
  }

  public set id(value: string) {
    this._id = value || this._uid
  }

  constructor(
    private readonly localeService: BsLocaleService,
    private readonly renderer: Renderer2,
    @Inject(LOCALE_ID) public locale: string,
    private readonly injector: Injector
  ) {
    // Force setter to be called in case id was not specified.
    // eslint-disable-next-line no-self-assign
    this.id = this.id
  }

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl)
    if (ngControl instanceof FormControlName) this.ngControl = ngControl

    // override ngx-bootstrap hooks to prevent input element writes
    if (this.datePickerInputDirective) {
      this.datePickerInputDirective.onChange = () => {}
      this.datePickerInputDirective._setInputValue = () => {}
    }

    this.internalDateControl.valueChanges.subscribe((date?: Date | null) => {
      const updatedValue =
        typeof date === 'string' || date === undefined || !isValid(date) ? null : date ? startOfDay(date) : null
      if (updatedValue) {
        const userTimezoneOffset = new Date(updatedValue).getTimezoneOffset() * 60000
        const formattedDate = new Date(new Date(updatedValue).getTime() - userTimezoneOffset)
        this.writeValue(formattedDate)
        this.onChange(formattedDate)
      } else {
        this.writeValue(updatedValue)
        this.onChange(updatedValue)
      }
    })
    this.bsConfig = {
      containerClass: 'theme-default',
      isAnimated: true,
      adaptivePosition: true,
      returnFocusToInput: true,
      dateInputFormat: this.dateInputFormat,
      showWeekNumbers: this.showWeekNumbers
    }
    if (this.locale) this.localeService.use(this.locale)
    if (this.helpMessage) this.helpMessageKey = `${this.formName}.${this.ngControl?.name}.help`
    if (this.successMessage) this.successMessageKey = `${this.formName}.${this.ngControl?.name}.valid`
  }

  ngAfterViewInit(): void {
    if (this.autofocus) this.datePickerInput?.nativeElement.focus()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus?.currentValue) this.datePickerInput?.nativeElement.focus()
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
          if (dateStart && dateEnd) {
            dateStart = format(new Date(dateStart), this.dateRenderFormat)
            dateEnd = format(new Date(dateEnd), this.dateRenderFormat)
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

  onInputChange(event: Event): void {
    if (!event.target) return
    const inputValue = (event.target as HTMLInputElement).value
    const parsedDate = parse(inputValue, this.dateRenderFormat, new Date())
    if (isValid(parsedDate)) this.internalDateControl.patchValue(startOfDay(parsedDate))
    else this.internalDateControl.patchValue(null)
  }

  public writeValue(updatedValue: Date | string | null | undefined): void {
    const valueToWrite = !updatedValue ? '' : format(updatedValue, this.dateRenderFormat)
    this.renderer.setProperty(this.datePickerInput?.nativeElement, 'value', valueToWrite)
    if (updatedValue) {
      updatedValue = startOfDay(updatedValue)
      const userTimezoneOffset = new Date(updatedValue).getTimezoneOffset() * 60000
      const formattedDate = new Date(new Date(updatedValue).getTime() - userTimezoneOffset)
      this.internalDateControl.patchValue(formattedDate, { emitEvent: false })
    } else {
      this.internalDateControl.setValue(null, {
        emitEvent: false
      })
    }
  }

  public registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  handleDatePickerInputClick($event: MouseEvent): void {
    if (!this.ngControl?.disabled) return
    $event.preventDefault()
    $event.stopPropagation()
    $event.stopImmediatePropagation()
  }
}
