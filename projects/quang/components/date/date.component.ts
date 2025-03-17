import { NgClass, NgIf } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Optional,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import AirDatepicker, {
  AirDatepickerDate,
  AirDatepickerLocale,
  AirDatepickerOptions,
  AirDatepickerPosition,
} from 'air-datepicker'
import en from 'air-datepicker/locale/en'
import fr from 'air-datepicker/locale/fr'
import it from 'air-datepicker/locale/it'
import { format, isMatch, parse } from 'date-fns'
import { debounceTime, fromEvent } from 'rxjs'

import { QuangBaseComponent } from '@quix/quang/components/shared'
import { QuangTranslationService } from '@quix/quang/translation'

export interface QuangDatepickerOptions extends AirDatepickerOptions {}

export interface DateRange {
  dateFrom: string | null
  dateTo: string | null
}

@Component({
  selector: 'quang-date',
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangDateComponent),
      multi: true,
    },
  ],
  imports: [TranslocoPipe, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
/**
 * Datepicker component based on {@link https://air-datepicker.com/docs}.
 *
 * @usageNotes
 * 1. It can be used to only display the `timepicker` component by setting
 * `[showOnlyTimepicker]="true"`
 *
 * 2. `datepickerOptions` can be used to override the default options of the component to get full access to all the
 * possible customizations that Air Datepicker provides. See {@link https://air-datepicker.com/examples}
 * Please note that overriding the `container` and `locale` properties and the `onSelect` and `onHide`
 * events might cause the component to malfunction.
 */
export class QuangDateComponent extends QuangBaseComponent<string | DateRange | null> {
  /**
   * Format to use to show on the input field.
   * The format is based on the standard {@link https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table}
   * Default: dd/MM/yyyy
   * @default dd/MM/yyyy
   */
  dateFormat = input<string>('dd/MM/yyyy')

  /**
   * Format to use to show on the time inside the input field.
   * The format is based on the standard {@link https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table}
   * Default: HH:mm
   * @default HH:mm
   */
  timeFormat = input<string>('HH:mm')

  /**
   * Calendar locale, if not provided the component will try to use the one provided in {@link QuangTranslationService}
   * if the language is not set in {@link QuangTranslationService} it will use the browser language
   * Use this parameter only to override default behavior
   */
  activeLanguageOverride = input<string | undefined>(undefined)

  /**
   * If true enable the timepicker inside the calendar
   */
  timepicker = input<boolean>(false)

  /**
   * The message to show inside the input if the date is invalid
   */
  invalidDateMessage = input<string>('')

  showOnlyTimepicker = input<boolean>(false)

  minHour = input<number>(0)

  maxHour = input<number>(24)

  minMinute = input<number>(0)

  maxMinute = input<number>(59)

  minDate = input<Date | undefined>(undefined)

  maxDate = input<Date | undefined>(undefined)

  showInline = input<boolean>(false)

  calendarClasses = input<string>('')

  buttonClass = input<string>('')

  datepickerOptions = input<QuangDatepickerOptions | undefined>(undefined)

  _inputForDate = viewChild<ElementRef>('inputForDate')

  contentTemplate = viewChild.required<ElementRef>('calendarButton')

  hasNoContent = computed(() => this.contentTemplate()?.nativeElement.children.length === 0)

  @Optional() _quangTranslationService = signal<QuangTranslationService | undefined>(inject(QuangTranslationService))

  _quangTranslationActiveLang = computed(() => this._quangTranslationService()?.activeLang() ?? null)

  multipleDatesSeparator = input<string>(' - ')

  rangeSelection = input(false)

  _activeLanguage = computed(() => {
    if (this.activeLanguageOverride()) {
      return this.activeLanguageOverride()
    }
    if (this._quangTranslationService()) {
      return this._quangTranslationActiveLang()
    }
    return navigator.language
  })

  _airDatepickerInstance = signal<AirDatepicker | undefined>(undefined)

  searchTextDebounce = input<number>(500)

  targetPosition = signal<AirDatepickerPosition>('bottom left')

  _generateAirDatepickerEffect = effect(
    () => {
      this.setupCalendar()
    },
    {
      allowSignalWrites: true,
    }
  )

  valueFormat = computed(() =>
    this.showOnlyTimepicker()
      ? this.timeFormat()
      : this.dateFormat() + (this.showTimepicker() ? ` ${this.timeFormat()}` : '')
  )

  inputValueString = computed(() => this.formatDate(this._value()))

  constructor() {
    super()

    fromEvent(document, 'scroll', { capture: true })
      .pipe(takeUntilDestroyed(), debounceTime(250))
      .subscribe(() => {
        if (this._airDatepickerInstance()?.visible) {
          this.setupCalendar()
        }
      })
  }

  showTimepicker = computed(() => !this.rangeSelection() && (this.timepicker() || this.showOnlyTimepicker()))

  isMouseInsideCalendar = signal(false)

  isMouseOutsideCalendar = computed(() => !this.isMouseInsideCalendar())

  setupCalendar() {
    if (this._inputForDate()?.nativeElement) {
      const currentValue = this._value()
      let targetDate: AirDatepickerDate[] | undefined
      if (currentValue && typeof currentValue === 'string') {
        targetDate = [currentValue]
      } else if (currentValue && typeof currentValue === 'object') {
        targetDate = []
        if (currentValue.dateFrom) {
          targetDate.push(currentValue.dateFrom)
        }
        if (currentValue.dateTo) {
          targetDate.push(currentValue.dateTo)
        }
      }
      this.setCalendarPosition()
      const airDatepickerOpts: AirDatepickerOptions = {
        autoClose: true,
        classes: this.calendarClasses(),
        dateFormat: this.dateFormat(),
        inline: this.showInline(),
        isMobile: false,
        multipleDatesSeparator: this.multipleDatesSeparator(),
        range: this.rangeSelection(),
        timepicker: this.showTimepicker(),
        onlyTimepicker: this.showOnlyTimepicker(),
        timeFormat: this.timeFormat(),
        minHours: this.minHour(),
        maxHours: this.maxHour(),
        minMinutes: this.minMinute(),
        maxMinutes: this.maxMinute(),
        minDate: this.minDate(),
        maxDate: this.maxDate(),
        toggleSelected: false,
        multipleDates: false,
        selectedDates: targetDate,
        position: this.targetPosition(),
        locale: this.getLocale(),
        onSelect: ({ date }) => {
          if (!Array.isArray(date)) {
            let selectTargetDate = date
            if (!this.showTimepicker()) {
              selectTargetDate = this.dateToUtc(date)
            }
            this.onChangedHandler(selectTargetDate.toISOString())
          }
          if (this.showInline()) {
            this.onHideCalendar()
          }
        },
        onHide: (isAnimationComplete: boolean) => {
          if (isAnimationComplete) {
            this.onHideCalendar()
          }
        },
        ...(this.datepickerOptions() ?? {}),
        onShow: (isAnimationComplete) => {
          const datepicker = this._airDatepickerInstance()?.$datepicker
          if (datepicker) {
            datepicker.onmouseenter = () => {
              this.isMouseInsideCalendar.set(true)
            }
            datepicker.onmouseleave = () => {
              this.isMouseInsideCalendar.set(false)
            }
          }
          if (isAnimationComplete || !this.showTimepicker()) {
            return
          }
          this.setupTimepicker()
        },
      }

      if (this._airDatepickerInstance()) {
        if (this._airDatepickerInstance()?.visible) {
          this._airDatepickerInstance()?.update(airDatepickerOpts)
        } else {
          this._airDatepickerInstance()?.update(airDatepickerOpts, { silent: true })
        }

        if (!targetDate) {
          this._airDatepickerInstance()?.setFocusDate(false)
          this._airDatepickerInstance()?.clear({ silent: true })
        } else {
          this._airDatepickerInstance()?.selectDate(targetDate, { updateTime: true })
        }
      } else {
        this._airDatepickerInstance.set(new AirDatepicker(this._inputForDate()?.nativeElement, airDatepickerOpts))
      }

      if (this.showInline()) {
        this.setupTimepicker()
      }
    }
  }

  onChangeText($event: Event): void {
    const value = ($event.target as HTMLInputElement)?.value
    if (value) {
      // TODO: check format for DateRange
      if (value.length === this.valueFormat().length && isMatch(value, this.valueFormat())) {
        this.onChangedHandler(this.setupInputStringToDate(value).toISOString())
      }
    } else {
      this.onChangedHandler(value)
    }
  }

  override onBlurHandler() {
    super.onBlurHandler()

    if (this.isMouseOutsideCalendar() && this._airDatepickerInstance()?.visible) {
      this._airDatepickerInstance()?.hide()
    }
  }

  setupInputStringToDate(value: string) {
    let targetDate = parse(value, this.valueFormat(), new Date())
    if (!this.showTimepicker()) {
      targetDate = this.dateToUtc(targetDate)
    }
    return targetDate
  }

  override onChangedHandler(value: string | DateRange | null): void {
    let targetDate = value
    const currentValue = this._value()
    if (typeof targetDate === 'string' && (!currentValue || typeof currentValue === 'string')) {
      if (!this.showTimepicker() && targetDate) {
        // remove time from date
        targetDate = `${targetDate.split('T')[0]}T00:00:00.000Z`
      } else if (this.showOnlyTimepicker() && currentValue && targetDate) {
        targetDate = `${currentValue.split('T')[0]}T${targetDate.split('T')[1]}`
      }
    } else if (
      this.rangeSelection() &&
      typeof targetDate === 'object' &&
      (currentValue === null || typeof currentValue === 'object')
    ) {
      if (!this.showTimepicker() && targetDate?.dateFrom) {
        // remove time from date
        targetDate.dateFrom = `${targetDate.dateFrom.split('T')[0]}T00:00:00.000Z`
      } else if (this.showOnlyTimepicker() && currentValue?.dateFrom && targetDate?.dateFrom) {
        targetDate.dateFrom = `${currentValue?.dateFrom.split('T')[0]}T${targetDate.dateFrom.split('T')[1]}`
      }
      if (!this.showTimepicker() && targetDate?.dateTo) {
        // remove time from date
        targetDate.dateTo = `${targetDate.dateTo.split('T')[0]}T00:00:00.000Z`
      } else if (this.showOnlyTimepicker() && currentValue?.dateTo && targetDate?.dateTo) {
        targetDate.dateTo = `${currentValue?.dateTo.split('T')[0]}T${targetDate.dateTo.split('T')[1]}`
      }
    }

    if (JSON.stringify(currentValue) === JSON.stringify(targetDate)) {
      return
    }

    this._value.set(targetDate)
  }

  onHideCalendar(): void {
    const valueInput: string = this._inputForDate()?.nativeElement.value
    let value: string | DateRange = valueInput
    if (this.rangeSelection()) {
      value = {
        dateFrom: '',
        dateTo: '',
      }
      const [dateFrom, dateTo] = valueInput.split(this.multipleDatesSeparator())
      value.dateFrom = dateFrom ?? ''
      value.dateTo = dateTo ?? ''
      if (!value.dateFrom || !isMatch(value.dateFrom, this.valueFormat())) {
        value.dateFrom = null
      } else {
        value.dateFrom = this.setupInputStringToDate(value.dateFrom).toISOString()
      }
      if (!value.dateTo || !isMatch(value.dateTo, this.valueFormat())) {
        value.dateTo = null
      } else {
        value.dateTo = this.setupInputStringToDate(value.dateTo).toISOString()
      }
      this.onChangedHandler(value)
    } else if (isMatch(value, this.valueFormat())) {
      this.onChangedHandler(this.setupInputStringToDate(value).toISOString())
    } else {
      this.onChangedHandler(null)
    }

    if (this.formControl()?.getRawValue() !== this._value()) {
      super.onChangedHandler(this._value())
    } else if (this.onTouched) {
      this.onTouched()
    }

    this.onBlurHandler()
  }

  formatDate(val: string | DateRange | null): string {
    if (val && typeof val === 'string') {
      return format(val, this.valueFormat())
    }
    if (val && typeof val === 'object') {
      let dateFromFormat = ''
      let dateToFormat = ''
      if (val.dateFrom) {
        dateFromFormat = format(val.dateFrom, this.valueFormat())
      }
      if (val.dateTo) {
        dateToFormat = format(val.dateTo, this.valueFormat())
      }
      return `${dateFromFormat}${this.multipleDatesSeparator()}${dateToFormat}`
    }
    return ''
  }

  openDatePicker() {
    if (this._inputForDate()?.nativeElement) {
      this._inputForDate()?.nativeElement.focus()
    }
  }

  interceptInputInteraction($event: Event) {
    if (this.isReadonly()) {
      $event.stopPropagation()
      $event.stopImmediatePropagation()
      $event.preventDefault()
    } else {
      // console.log('e', this._airDatepickerInstance() as any)
      // ;(this._airDatepickerInstance() as any)._onMouseDown($event)
    }
  }

  getLocale(): AirDatepickerLocale {
    switch (this._activeLanguage()?.toLowerCase()) {
      case 'en':
        return (en as any).default || en
      case 'it':
        return (it as any).default || it
      case 'fr':
        return (fr as any).default || fr
      default:
        return (en as any).default || en
    }
  }

  onCancel(): void {
    this._inputForDate()?.nativeElement.blur()
  }

  private dateToUtc(date: Date): Date {
    // convert to UTC time removing the timezone
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  }

  private setCalendarPosition() {
    const windowInnerHeight = window.innerHeight
    const inputBoundingClientRect = this._inputForDate()?.nativeElement.getBoundingClientRect()
    const diff = windowInnerHeight - inputBoundingClientRect.height - inputBoundingClientRect.top - 239
    if (diff >= 0) {
      this.targetPosition.set('bottom left')
    } else {
      this.targetPosition.set('top left')
    }
  }

  private setupTimepicker() {
    const timepicker = document.getElementsByClassName('air-datepicker-time')?.[0]
    if (timepicker) {
      const inputs = timepicker.getElementsByTagName('input')
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute('type', 'number')
        inputs[i].setAttribute('maxLength', '2')
        inputs[i].className = 'form-control'
        inputs[i].onmouseup = (evt) => {
          evt.stopImmediatePropagation()
        }
        inputs[i].onblur = () => {
          if (this.isMouseOutsideCalendar()) {
            this._airDatepickerInstance()?.hide()
          }
        }
      }
    }
  }
}
