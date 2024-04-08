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
import AirDatepicker from 'air-datepicker'
import { format } from 'date-fns'

import { QuangBaseComponent } from '../quang-base-component.directive'
import { CalendarPickerComponent } from './calendar-picker/calendar-picker.component'

import { QuangTranslationService } from '../../translation'

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
  imports: [TranslocoPipe, NgIf, NgClass, CalendarPickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangDateComponent extends QuangBaseComponent {
  /**
   * Format to use to show on the input field.
   * The format is based on the standard {@link https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table}
   * The default value is dd/MM/yyyy
   */
  dateFormat = input<string>('dd/MM/yyyy')
  /**
   * Format to use to show on the time inside the input field.
   * The format is based on the standard {@link https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table}
   * The default value is HH:mm
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
   * If true the calendar will appear as a modal window with slightly enlarged dimensions.
   */
  isMobile = input<boolean>(false)
  /**
   * If true enable the timepicker inside the calendar
   */
  timepicker = input<boolean>(false)
  showOnlyTimepicker = input<boolean>(false)
  minHour = input<number>(0)
  maxHour = input<number>(24)
  minMinute = input<number>(0)
  maxMinute = input<number>(59)
  minDate = input<Date | undefined>(undefined)
  maxDate = input<Date | undefined>(undefined)
  showInline = input<boolean>(false)
  calendarClasses = input<string>('')

  _inputForDate = viewChild<ElementRef>('inputForDate')
  _dateContainer = signal<ElementRef | undefined>(undefined)

  override onChange?: (value: Date | Date[]) => void
  @Optional() _quangTranslationService = inject(QuangTranslationService)
  _quangTranslationActiveLang = signal<string | undefined>(undefined)

  _activeLanguage = computed(() => {
    if (this.activeLanguageOverride()) {
      return this.activeLanguageOverride()
    } else {
      if (this._quangTranslationService) {
        return this._quangTranslationActiveLang()
      } else {
        return navigator.language
      }
    }
  })
  /**
   * the actual date calendar is based on {@link https://air-datepicker.com/docs}
   */
  _generateAirDatepickerEffect = effect(async () => {
    console.log('_generateAirDatepickerEffect')
    if (this._inputForDate()?.nativeElement && this._dateContainer()?.nativeElement) {
      new AirDatepicker(this._inputForDate()?.nativeElement, {
        autoClose: true,
        classes: this.calendarClasses(),
        container: this._dateContainer()?.nativeElement,
        dateFormat: this.dateFormat(),
        inline: this.showInline(),
        isMobile: this.isMobile(),
        timepicker: this.timepicker(),
        onlyTimepicker: this.showOnlyTimepicker(),
        timeFormat: this.timeFormat(),
        minHours: this.minHour(),
        maxHours: this.maxHour(),
        minMinutes: this.minMinute(),
        maxMinutes: this.maxMinute(),
        minDate: this.minDate(),
        maxDate: this.maxDate(),
        locale: await import(
          `./calendar-locales/locale-${this._activeLanguage() ? this._activeLanguage()?.toLowerCase() : 'en'}.ts`
        ).then((module) => module.default),
        onSelect: ({ date, formattedDate, datepicker }) => {
          let targetString = ''
          if (Array.isArray(formattedDate)) {
            targetString = formattedDate.join(this.multipleDateJoinCharacter())
          } else {
            targetString = formattedDate
          }
          this.onChangedHandler(targetString)
          if (this.onChange) {
            this.onChange(date)
          }
        }
      })
    }
  })

  constructor() {
    super()
    if (this._quangTranslationService) {
      this._quangTranslationService.activeLang.subscribe((lang) => {
        this._quangTranslationActiveLang.set(lang)
      })
      this._quangTranslationActiveLang.set(this._quangTranslationService.getActiveLang())
    }
  }

  override onChangedHandler(val: string) {
    super.onChangedHandler(val)
  }

  override writeValue(val: Date): void {
    this._value.set(format(val, this.dateFormat()))
  }
}
