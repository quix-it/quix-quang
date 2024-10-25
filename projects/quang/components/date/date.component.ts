import { JsonPipe, NgClass, NgIf, NgStyle } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Optional,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core'
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
import { format, isMatch, isValid, parse, startOfDay, toDate } from 'date-fns'
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs'

import { QuangBaseComponent } from '@quix/quang/components/shared'
import { QuangTranslationService } from '@quix/quang/translation'

export interface QuangDatepickerOptions extends AirDatepickerOptions {}

@Component({
  selector: 'quang-date',
  standalone: true,
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangDateComponent),
      multi: true,
    },
  ],
  imports: [TranslocoPipe, NgIf, NgClass, JsonPipe, NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
   * Value used to join the rendering inside a multiple selection date
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

  datepickerOptions = input<QuangDatepickerOptions | undefined>(undefined)

  _inputForDate = viewChild<ElementRef>('inputForDate')

  _dateContainer = viewChild<ElementRef>('inputDateContainer')

  pointerRotation = signal<string>(`-45deg`)

  pointerTop = signal<string>(`-6px`)

  pointerBottom = signal<string>(`-6px`)

  @Optional() _quangTranslationService = signal<QuangTranslationService | undefined>(inject(QuangTranslationService))

  _quangTranslationActiveLang = computed(() => this._quangTranslationService()?.activeLang() ?? null)

  _activeLanguage = computed(() => {
    if (this.activeLanguageOverride()) {
      return this.activeLanguageOverride()
    }
    if (this._quangTranslationService()) {
      return this._quangTranslationActiveLang()
    }
    return navigator.language
  })

  _startValue = signal<Date | Date[] | string | undefined | null>(undefined)

  _airDatepickerInstance = signal<AirDatepicker | undefined>(undefined)

  searchTextDebounce = input<number>(500)

  _inputValue = signal<string | null>(null)

  inputValue$ = new Subject<string>()

  targetPosition = signal<AirDatepickerPosition>('bottom')

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
          autoClose: false,
          classes: this.calendarClasses(),
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
          toggleSelected: false,
          selectedDates: targetDate,
          container: this._dateContainer()?.nativeElement,
          position: this.targetPosition(),
          /* position: ({ $datepicker, $target, $pointer }) => {
            const coords = $target?.getBoundingClientRect()
            const datepicker = $datepicker
            const pointer = $pointer

            const diff = window.innerHeight - coords.height - coords.top - $datepicker.getBoundingClientRect().height

            if (diff > 0) {
              datepicker.style.top = `${90}px`
              pointer.style.bottom = 'unset'
              this.pointerRotation.set(`${-45}deg`)
            } else {
              datepicker.style.bottom = `${14}rem`
              datepicker.style.top = 'unset'
              pointer.style.top = 'unset'
              this.pointerRotation.set(`${135}deg`)
            }
          }, */
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
          },
          ...(this.datepickerOptions() ?? {}),
        }

        if (this._airDatepickerInstance()) {
          this._airDatepickerInstance()?.update(airDatepickerOpts)
        } else {
          this._airDatepickerInstance.set(new AirDatepicker(this._inputForDate()?.nativeElement, airDatepickerOpts))
        }
      }
    },
    {
      allowSignalWrites: true,
    }
  )

  valueFormat = computed(() => this.dateFormat() + (this.timepicker() ? ` ${this.timeFormat()}` : ''))

  constructor() {
    super()
    this.inputValue$
      .pipe(this._takeUntilDestroyed(), debounceTime(this.searchTextDebounce()), distinctUntilChanged())
      .subscribe((value) => {
        this._inputValue.set(value?.toString() ?? '')
        this.onChangedEventHandler()
      })
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.setCalendarPosition()
  }

  onChangeText($event: Event): void {
    this.inputValue$.next(($event.target as HTMLInputElement)?.value)
    if (!($event.target as HTMLInputElement)?.value) {
      this._airDatepickerInstance()?.setFocusDate(false)
      this._airDatepickerInstance()?.clear({ silent: true })
    }
  }

  override onChangedEventHandler(): void {
    const inputValue = this._inputValue()
    if (inputValue) {
      if (isMatch(inputValue, this.dateFormat())) {
        const formattedDate = toDate(parse(inputValue, this.dateFormat(), new Date()))
        this._airDatepickerInstance()?.selectDate(formattedDate)
        this._airDatepickerInstance()?.setViewDate(formattedDate)
        if (inputValue !== this._value())
          this.onChangedHandler(toDate(parse(inputValue, this.dateFormat(), new Date())).toISOString())
        this._inputForDate()?.nativeElement.blur()
      }
    }
  }

  override onChangedHandler(value: string | Date | Date[] | null): void {
    if (Array.isArray(value)) {
      this.inputValue$.next(new Date(value?.toString() ?? '')?.toISOString() ?? '')
    } else if (value instanceof Date) {
      this.inputValue$.next(value.toISOString())
    } else {
      this.inputValue$.next(value ?? '')
    }

    super.onChangedHandler(value)
  }

  override onBlurHandler(): void {
    const inputValue = this._inputValue()
    if (!inputValue) {
      this.onChangedHandler(inputValue)
    } else if (!isMatch(inputValue, this.dateFormat())) {
      this.onChangedHandler(null)
    } else {
      this.validateDate()
    }
    super.onBlurHandler()
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
      this._inputValue.set(targetDate)
    } else {
      this._airDatepickerInstance()?.clear({ silent: true })
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
    this.onChangedHandler(null)
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
        invalidDate: true,
      }
    } else if (errors) {
      delete errors['invalidDate']
    }
    this._ngControl()?.control?.setErrors(errors)
  }

  private setCalendarPosition() {
    const windowInnerHeight = window.innerHeight
    const inputBoundingClientRect = this._inputForDate()?.nativeElement.getBoundingClientRect()
    const diff = windowInnerHeight - inputBoundingClientRect.height - inputBoundingClientRect.top - 200
    // console.log('diff', diff)
    if (diff >= 0) {
      this.targetPosition.set('bottom')
      this.pointerRotation.set(`${-45}deg`)
      this.pointerTop.set('-6px')
      this.pointerBottom.set('unset')
    } else {
      this.targetPosition.set('top')
      this.pointerRotation.set(`${135}deg`)
      this.pointerTop.set('unset')
      this.pointerBottom.set('-6px')
    }
  }
}
