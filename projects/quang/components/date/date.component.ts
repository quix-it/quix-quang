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
  viewChild
} from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@ngneat/transloco'
import AirDatepicker, { AirDatepickerDate, AirDatepickerLocale, AirDatepickerOptions } from 'air-datepicker'
import { format, isValid, parse, startOfDay } from 'date-fns'

import { QuangBaseComponent } from '@quix/quang/components/shared'
import { QuangTranslationService } from '@quix/quang/translation'

import * as en from './calendar-locales/locale-en'
import * as fr from './calendar-locales/locale-fr'
import * as it from './calendar-locales/locale-it'

@Component({
  selector: 'quang-date',
  standalone: true,
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangDateComponent),
      multi: true
    }
  ],
  imports: [TranslocoPipe, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangDateComponent extends QuangBaseComponent<Date | Date[] | string | null> {
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
   * value used to join the rendering inside a multiple selection date
   */
  multipleDateJoinCharacter = input<string>(', ')
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
   * If true the component will offset the time to have midnight in UTC and not in the current locale
   * @example in italy Thu Apr 18 2024 00:00:00 GMT+0200 will become Thu Apr 18 2024 02:00:00 GMT+0200 to have 2024-04-18T00:00:00.000Z
   * Default: true
   * @default true
   */
  offsetUTCTime = input<boolean>(true)
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

  _inputForDate = viewChild<ElementRef>('inputForDate')
  _dateContainer = viewChild<ElementRef>('inputDateContainer')

  @Optional() _quangTranslationService = signal<QuangTranslationService | undefined>(inject(QuangTranslationService))
  _quangTranslationActiveLang = signal<string | undefined>(undefined)

  _activeLanguage = computed(() => {
    if (this.activeLanguageOverride()) {
      return this.activeLanguageOverride()
    } else {
      if (this._quangTranslationService()) {
        return this._quangTranslationActiveLang()
      } else {
        return navigator.language
      }
    }
  })
  _startValue = signal<Date | Date[] | string | undefined | null>(undefined)
  _airDatepickerInstance = signal<AirDatepicker | undefined>(undefined)

  /**
   * the actual date calendar is based on {@link https://air-datepicker.com/docs}
   */
  _generateAirDatepickerEffect = effect(
    async () => {
      if (this._inputForDate()?.nativeElement && this._dateContainer()?.nativeElement) {
        let targetDate: AirDatepickerDate[] | undefined
        const startValueDate = this._startValue()
        if (Array.isArray(startValueDate)) {
          targetDate = startValueDate
        } else if (startValueDate) {
          targetDate = [startValueDate]
        }

        const airDatepickerOpts: AirDatepickerOptions<HTMLInputElement> = {
          autoClose: true,
          classes: this.calendarClasses(),
          container: this._dateContainer()?.nativeElement,
          dateFormat: this.dateFormat(),
          inline: this.showInline(),
          isMobile: false,
          timepicker: this.timepicker(),
          onlyTimepicker: this.showOnlyTimepicker(),
          timeFormat: this.timeFormat(),
          minHours: this.minHour(),
          maxHours: this.maxHour(),
          minMinutes: this.minMinute(),
          maxMinutes: this.maxMinute(),
          minDate: this.minDate(),
          maxDate: this.maxDate(),
          selectedDates: targetDate,
          toggleSelected: false,
          locale: this.getLocale(),
          onSelect: ({ date, formattedDate }) => {
            let targetString = ''
            if (Array.isArray(formattedDate)) {
              targetString = formattedDate.join(this.multipleDateJoinCharacter())
            } else {
              targetString = formattedDate
            }
            this.onChangedHandler(targetString)
            if (this.onChange) {
              if (this.offsetUTCTime()) {
                if (Array.isArray(date)) {
                  const utcDateArray = date.map((d) => this.dateToUtc(d))
                  this.onChange(utcDateArray)
                } else {
                  this.onChange(this.dateToUtc(date))
                }
              } else {
                this.onChange(date)
              }
            }
          },
          onHide: (isAnimationComplete: boolean) => {
            if (isAnimationComplete) {
              this.validateDate()
            }
          }
        }

        if (this._airDatepickerInstance()) {
          this._airDatepickerInstance()?.update(airDatepickerOpts)
        } else {
          this._airDatepickerInstance.set(new AirDatepicker(this._inputForDate()?.nativeElement, airDatepickerOpts))
        }
      }
    },
    {
      allowSignalWrites: true
    }
  )

  valueFormat = computed(() => this.dateFormat() + (this.timepicker() ? ' ' + this.timeFormat() : ''))

  constructor() {
    super()
    if (this._quangTranslationService()) {
      this._quangTranslationService()?.activeLang.subscribe((lang) => {
        this._quangTranslationActiveLang.set(lang)
      })
      this._quangTranslationActiveLang.set(this._quangTranslationService()?.getActiveLang())
    }
  }

  override onChangedHandler(val: string) {
    super.onChangedHandler(val)
  }

  override writeValue(val?: Date | Date[] | string | null): void {
    this._startValue.set(val)
    let targetDate: string | null = null
    if (val && Array.isArray(val)) {
      targetDate = val
        .map((x) => (this.offsetUTCTime() ? this.dateToUtc(startOfDay(x)) : startOfDay(x)))
        .map((x) => format(x, this.valueFormat()))
        .join(this.multipleDateJoinCharacter())
    } else if (val) {
      targetDate = format(this.offsetUTCTime() ? this.dateToUtc(startOfDay(val)) : startOfDay(val), this.valueFormat())
    }
    this._value.set(targetDate)
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
    }
  }

  private dateToUtc(date: Date): Date {
    // convert to UTC time removing the timezone
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  }

  private validateDate() {
    const targetValue = this._value()
    let dateValid = false
    if (Array.isArray(targetValue)) {
      dateValid = targetValue.every((x) => isValid(parse(x.toString(), this.valueFormat(), new Date())))
    } else if (targetValue) {
      dateValid = isValid(parse(targetValue.toString(), this.valueFormat(), new Date()))
    }
    let errors = this._ngControl()?.control?.errors ?? null
    if (!dateValid) {
      this._value.set(
        this._quangTranslationService()
          ? this._quangTranslationService()!.translate(this.invalidDateMessage())
          : this.invalidDateMessage()
      )
      errors = {
        ...errors,
        invalidDate: true
      }
    } else if (errors) {
      delete errors['invalidDate']
    }
    this._ngControl()?.control?.setErrors(errors)
  }

  getLocale(): Partial<AirDatepickerLocale> | undefined {
    console.log(this._activeLanguage()?.toLowerCase())
    switch (this._activeLanguage()?.toLowerCase()) {
      case 'en':
        return en.default
      case 'it':
        return it.default
      case 'fr':
        return fr.default
      default:
        return en.default
    }
  }
}
