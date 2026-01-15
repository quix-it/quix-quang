import { NgClass } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core'
import { NgZone } from '@angular/core'
import { ApplicationRef } from '@angular/core'
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
import { QuangTranslationService } from 'quang/translation'
import { debounceTime, fromEvent } from 'rxjs'

import { QuangBaseComponent } from 'quang/components/shared'

export interface DateRange {
  dateFrom: string | null
  dateTo: string | null
}

export type QuangDatepickerOptions = AirDatepickerOptions

@Component({
  selector: 'quang-date',
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => QuangDateComponent), multi: true }],
  imports: [TranslocoPipe, NgClass],
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
export class QuangDateComponent extends QuangBaseComponent<string | DateRange | null> {
  private readonly _ngZone = inject(NgZone)
  private readonly _cdr = inject(ChangeDetectorRef)
  private readonly _appRef = inject(ApplicationRef)
  private _tickScheduled = false

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

  _quangTranslationService = signal<QuangTranslationService | undefined>(
    inject(QuangTranslationService, { optional: true }) ?? undefined
  )

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

  // AirDatepicker doesn't reliably support toggling `inline` at runtime via `update()`.
  // Track the mode used to create the current instance and recreate when it changes.
  private readonly _airDatepickerInlineMode = signal<boolean | null>(null)

  searchTextDebounce = input<number>(500)

  targetPosition = signal<AirDatepickerPosition>('bottom left')

  _generateAirDatepickerEffect = effect(() => {
    this.setupCalendar()
  })

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

  private _shouldRefocusInputOnHide = signal(false)

  setupCalendar() {
    if (!this._inputForDate()?.nativeElement) return

    const desiredInlineMode = this.showInline()

    const existingInstance = this._airDatepickerInstance()
    const existingInlineMode = this._airDatepickerInlineMode()

    if (existingInstance && existingInlineMode !== null && existingInlineMode !== desiredInlineMode) {
      const maybeDestroy = existingInstance as unknown as { destroy?: () => void }
      maybeDestroy.destroy?.()
      this._airDatepickerInstance.set(undefined)
    }

    let currentValue = this._value()
    let targetDate: AirDatepickerDate[] | undefined
    if (currentValue && typeof currentValue === 'string') {
      if (!this.showTimepicker()) {
        currentValue = currentValue.split('T')[0]
      }
      targetDate = [currentValue]
    } else if (currentValue && typeof currentValue === 'object') {
      targetDate = []
      if (currentValue.dateFrom) {
        const targetDateFrom: string = this.showTimepicker()
          ? currentValue.dateFrom
          : currentValue.dateFrom.split('T')[0]
        targetDate.push(targetDateFrom)
      }
      if (currentValue.dateTo) {
        const targetDateTo: string = this.showTimepicker() ? currentValue.dateTo : currentValue.dateTo.split('T')[0]
        targetDate.push(targetDateTo)
      }
    }

    this.setCalendarPosition()

    const userDatepickerOptions = this.datepickerOptions() ?? {}
    const userOnSelect = userDatepickerOptions.onSelect
    const userOnHide = userDatepickerOptions.onHide
    const userOnShow = userDatepickerOptions.onShow

    const airDatepickerOpts: QuangDatepickerOptions = {
      ...userDatepickerOptions,
      autoClose: !this.showInline(),
      showEvent: 'click',
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

      onSelect: (args) => {
        const { date } = args
        // AirDatepicker callbacks may fire outside Angular's zone in some app setups.
        // Ensure CVA propagation happens inside the zone so the connected FormControl updates reliably.
        this._ngZone.run(() => {
          this._shouldRefocusInputOnHide.set(true)

          if (Array.isArray(date)) {
            // Range selection: AirDatepicker emits partial selections too (only start date).
            // Committing `_value` for partial selections can trigger `setupCalendar()` re-sync and
            // break the second click. Only commit once the range is complete.
            const [from, to] = date
            if (!from || !to) {
              return
            }

            const value: DateRange = {
              dateFrom: (this.showTimepicker() ? from : this.dateToUtc(from)).toISOString(),
              dateTo: (this.showTimepicker() ? to : this.dateToUtc(to)).toISOString(),
            }
            this.onChangedHandler(value)
          } else if (date) {
            const selectTargetDate = this.showTimepicker() ? date : this.dateToUtc(date)
            this.onChangedHandler(selectTargetDate.toISOString())
          }

          if (this.showInline()) {
            // Inline mode should update the connected control immediately.
            // Do not rely on `onHideCalendar()` because inline never hides and the input may be visually hidden.
            this.propagateValueToControl()
          }
        })

        userOnSelect?.(args)
      },
      onHide: (isAnimationComplete: boolean) => {
        if (isAnimationComplete) {
          this.onHideCalendar()
        }

        userOnHide?.(isAnimationComplete)
      },
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

        userOnShow?.(isAnimationComplete)
      },
    }

    if (this._airDatepickerInstance()) {
      if (this._airDatepickerInstance()?.visible) {
        this._airDatepickerInstance()?.update(airDatepickerOpts)
      } else {
        this._airDatepickerInstance()?.update(airDatepickerOpts, { silent: true })
      }

      if (targetDate) {
        this._airDatepickerInstance()?.selectDate(targetDate, { updateTime: true, silent: true })
      } else {
        this._airDatepickerInstance()?.setFocusDate(false)
        this._airDatepickerInstance()?.clear({ silent: true })
      }
    } else {
      this._airDatepickerInstance.set(new AirDatepicker(this._inputForDate()?.nativeElement, airDatepickerOpts))
    }

    this._airDatepickerInlineMode.set(desiredInlineMode)

    if (desiredInlineMode) {
      // Ensure inline calendar is visible after re-creation/update.
      this._airDatepickerInstance()?.show?.()
    }

    if (this.showInline()) {
      this.setupTimepicker()
    }
  }

  onChangeText($event: Event): void {
    const value = ($event.target as HTMLInputElement)?.value
    if (value) {
      // TODO: check format for DateRange
      if (value.length === this.valueFormat().length && isMatch(value, this.valueFormat())) {
        this.onChangedHandler(this.setupInputStringToDate(value).toISOString())

        if (this.showInline()) {
          this.propagateValueToControl()
        }
      }
    } else {
      this.onChangedHandler(value)

      if (this.showInline()) {
        this.propagateValueToControl()
      }
    }
  }

  override onBlurHandler() {
    super.onBlurHandler()

    if (this.showInline()) {
      return
    }

    if (this.isMouseOutsideCalendar() && this._airDatepickerInstance()?.visible) {
      this._airDatepickerInstance()?.hide()
    }
  }

  setupInputStringToDate(value: string) {
    let targetValueFormat = this.valueFormat()
    if (value.length !== targetValueFormat.length) {
      targetValueFormat = targetValueFormat.replace('yyyy', 'yy')
    }
    const targetDate = parse(value, targetValueFormat, new Date())
    if (!this.showTimepicker()) {
      return this.dateToUtc(targetDate)
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

  private propagateValueToControl(): void {
    if (this.formControl()?.getRawValue() !== this._value()) {
      super.onChangedHandler(this._value())
    } else if (this.onTouched) {
      this.onTouched()
    }

    this.requestRender()
  }

  private requestRender(): void {
    // Inline datepicker interactions can happen outside Angular-managed events.
    // Marking the view dirty is not always enough in zoneless/event-coalesced setups,
    // so we coalesce a manual tick.
    this._cdr.markForCheck()

    if (this._tickScheduled) {
      return
    }

    this._tickScheduled = true
    queueMicrotask(() => {
      this._tickScheduled = false
      this._appRef.tick()
    })
  }

  private syncValueFromDatepickerSelection(): void {
    if (!this.showInline()) {
      return
    }

    const datepickerInstance = this._airDatepickerInstance() as unknown as { selectedDates?: Date[] } | undefined
    const selectedDate = datepickerInstance?.selectedDates?.[0]
    if (!(selectedDate instanceof Date)) {
      return
    }

    const targetDate = this.showTimepicker() ? selectedDate : this.dateToUtc(selectedDate)
    this.onChangedHandler(targetDate.toISOString())
    this.propagateValueToControl()
  }

  onHideCalendar(): void {
    const valueInput: string = this._inputForDate()?.nativeElement.value
    let value: string | DateRange = valueInput
    if (this.rangeSelection()) {
      value = { dateFrom: '', dateTo: '' }
      const [dateFrom, dateTo] = valueInput.split(this.multipleDatesSeparator())
      value.dateFrom = dateFrom ?? ''
      value.dateTo = dateTo ?? ''
      value.dateFrom =
        !value.dateFrom || !this.checkDateMatch(value.dateFrom)
          ? null
          : this.setupInputStringToDate(value.dateFrom).toISOString()
      value.dateTo =
        !value.dateTo || !this.checkDateMatch(value.dateTo)
          ? null
          : this.setupInputStringToDate(value.dateTo).toISOString()
      this.onChangedHandler(value)
    } else if (this.checkDateMatch(value)) {
      this.onChangedHandler(this.setupInputStringToDate(value).toISOString())
    } else {
      this.onChangedHandler(null)
    }

    this.propagateValueToControl()

    if (this.showInline()) {
      return
    }

    // Only focus the input when the user actually interacted with the calendar.
    // Avoids infinite focus loop when tabbing between multiple datepickers.
    const activeElement = document.activeElement
    const calendarElement = this._airDatepickerInstance()?.$datepicker
    const inputElement = this._inputForDate()?.nativeElement
    const isCalendarFocused = calendarElement?.contains(activeElement)

    const shouldRefocus = this._shouldRefocusInputOnHide() || isCalendarFocused || this.isMouseInsideCalendar()
    this._shouldRefocusInputOnHide.set(false)

    if (shouldRefocus) {
      inputElement?.focus()
    }

    this.onBlurHandler()
  }

  formatDate(val: string | DateRange | null): string {
    if (val && typeof val === 'string') {
      return format(val, this.valueFormat())
    }
    if (val && typeof val === 'object') {
      if (!val.dateFrom && !val.dateTo) {
        return ''
      }
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
    const inputEl = this._inputForDate()?.nativeElement
    if (!inputEl || this._isDisabled()) {
      return
    }

    inputEl.focus()

    if (!this._airDatepickerInstance()) {
      this.setupCalendar()
    }

    this._airDatepickerInstance()?.show()
  }

  onInputKeydown(event: KeyboardEvent) {
    if (this._isDisabled()) {
      return
    }

    const datepickerInstance = this._airDatepickerInstance()
    if (event.key === 'Escape' && datepickerInstance?.visible) {
      event.preventDefault()
      datepickerInstance.hide()
      return
    }

    if (event.key === 'Enter' || event.key === 'ArrowDown') {
      event.preventDefault()
      this.openDatePicker()
    }
  }

  interceptInputInteraction($event: Event) {
    if (!this.isReadonly()) return

    $event.stopPropagation()
    $event.stopImmediatePropagation()
    $event.preventDefault()
  }

  getLocale(): AirDatepickerLocale {
    switch (this._activeLanguage()?.toLowerCase()) {
      case 'en':
        return (en as unknown as { default?: AirDatepickerLocale }).default ?? (en as unknown as AirDatepickerLocale)
      case 'it':
        return (it as unknown as { default?: AirDatepickerLocale }).default ?? (it as unknown as AirDatepickerLocale)
      case 'fr':
        return (fr as unknown as { default?: AirDatepickerLocale }).default ?? (fr as unknown as AirDatepickerLocale)
      default:
        return (en as unknown as { default?: AirDatepickerLocale }).default ?? (en as unknown as AirDatepickerLocale)
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
    const datepickerRoot = this._airDatepickerInstance()?.$datepicker as HTMLElement | undefined
    if (!datepickerRoot) {
      return
    }

    // AirDatepicker may re-render time inputs; use delegated listeners so we don't lose handlers.
    if (!datepickerRoot.dataset['quangTimepickerListeners']) {
      datepickerRoot.dataset['quangTimepickerListeners'] = 'true'

      datepickerRoot.addEventListener(
        'input',
        () => {
          if (!this.showInline()) {
            return
          }
          // Let AirDatepicker update its internal selection first.
          setTimeout(() => this._ngZone.run(() => this.syncValueFromDatepickerSelection()), 0)
        },
        { capture: true }
      )
    }

    const timepickers = datepickerRoot.getElementsByClassName('air-datepicker-time')
    for (const timepicker of Array.from(timepickers)) {
      const inputs = timepicker.getElementsByTagName('input')
      for (const input of Array.from(inputs)) {
        input.setAttribute('type', 'number')
        input.setAttribute('maxLength', '2')
        input.className = 'form-control'
        input.onmouseup = (evt) => {
          evt.stopImmediatePropagation()
        }
        input.onblur = () => {
          if (!this.showInline() && this.isMouseOutsideCalendar()) {
            this._airDatepickerInstance()?.hide()
          }
        }
      }
    }
  }

  checkDateMatch(date: string): boolean {
    return isMatch(date, this.valueFormat()) || isMatch(date, this.valueFormat().replace('yyyy', 'yy'))
  }
}
