import { JsonPipe, NgClass, NgIf, NgStyle } from '@angular/common'
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
export class QuangDateComponent extends QuangBaseComponent<string | null> {
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
      : this.dateFormat() + (this.timepicker() ? ` ${this.timeFormat()}` : '')
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

  setupCalendar() {
    if (this._inputForDate()?.nativeElement) {
      const targetDate: AirDatepickerDate | undefined = this._value() ?? undefined
      this.setCalendarPosition()
      const airDatepickerOpts: AirDatepickerOptions = {
        autoClose: true,
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
        multipleDates: false,
        selectedDates: targetDate ? [targetDate] : undefined,
        position: this.targetPosition(),
        locale: this.getLocale(),
        onSelect: ({ date }) => {
          if (!Array.isArray(date)) {
            let selectTargetDate = date
            if (!this.timepicker()) {
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
          if (!isAnimationComplete) {
            const timepicker = document.getElementsByClassName('air-datepicker-time')?.[0]
            if (timepicker) {
              const inputs = timepicker.getElementsByTagName('input')
              for (let i = 0; i < inputs.length; i++) {
                inputs[i].setAttribute('type', 'number')
                inputs[i].onmouseup = (evt) => {
                  evt.stopImmediatePropagation()
                  evt.preventDefault()
                  evt.stopPropagation()
                }
              }
            }
          }
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
    }
  }

  onChangeText($event: Event): void {
    const value = ($event.target as HTMLInputElement)?.value
    if (value) {
      if (value.length === this.valueFormat().length && isMatch(value, this.valueFormat())) {
        this.onChangedHandler(this.setupInputStringToDate(value).toISOString())
      }
    } else {
      this.onChangedHandler(value)
    }
  }

  setupInputStringToDate(value: string) {
    let targetDate = parse(value, this.valueFormat(), new Date())
    if (!this.timepicker()) {
      targetDate = this.dateToUtc(targetDate)
    }
    return targetDate
  }

  override onChangedHandler(value: string | null): void {
    let targetDate = value
    const currentValue = this._value()
    if (!this.timepicker() && targetDate) {
      // remove time from date
      targetDate = `${targetDate.split('T')[0]}T00:00:00.000Z`
    } else if (this.showOnlyTimepicker() && currentValue && targetDate) {
      targetDate = `${currentValue.split('T')[0]}T${targetDate.split('T')[1]}`
    }

    if (currentValue === targetDate) {
      return
    }

    this._value.set(targetDate)
  }

  onHideCalendar(): void {
    const value = this._inputForDate()?.nativeElement.value
    if (isMatch(value, this.valueFormat())) {
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

  formatDate(val: string | null): string {
    if (val) {
      return format(val, this.valueFormat())
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
}
