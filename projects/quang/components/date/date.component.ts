import { NgClass, NgIf } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
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
   * value used to join the rendering inside a multiple selection date
   */
  multipleDateJoinCharacter = input<string>(', ')
  calendarClasses = input<string>('')
  /**
   * Calendar locale, if not provided the component will try to use the one provided in {@link QuangTranslationService}
   * if the language is not set in {@link QuangTranslationService} it will use the browser language
   * Use this parameter only to override default behavior
   */
  activeLanguageOverride = input<string | undefined>(undefined)

  _inputForDate = viewChild<ElementRef>('inputForDate')
  _dateContainer = signal<ElementRef | undefined>(undefined)

  override onChange?: (value: Date | Date[]) => void
  _quangTranslationService = inject(QuangTranslationService)
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
    if (this._inputForDate()?.nativeElement && this._dateContainer()?.nativeElement) {
      new AirDatepicker(this._inputForDate()?.nativeElement, {
        autoClose: true,
        classes: this.calendarClasses(),
        container: this._dateContainer()?.nativeElement,
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
}
