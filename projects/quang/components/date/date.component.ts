import { DatePipe, NgClass, NgForOf, NgIf, SlicePipe } from '@angular/common'
import { Component, ElementRef, EventEmitter, Input, Output, forwardRef, inject } from '@angular/core'
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@ngneat/transloco'

import { QuangBaseComponent } from '../quang-base-component.directive'

import { ChunkPipe } from './chunk.pipe'
import { InCalendarRangePipe } from './in-calendar-range.pipe'

export enum Months {
  JANUARY = 'January',
  FEBRIARY = 'February',
  MARCH = 'March',
  APRIL = 'April',
  MAY = 'May',
  JUNE = 'June',
  JULY = 'July',
  AUGUST = 'August',
  SEPTEMBER = 'September',
  OCTOBER = 'October',
  NOVEMBER = 'November',
  DECEMBER = 'December'
}

export class CalendarDay {
  public date: Date
  public selectedMonthDate: boolean
  public isToday: boolean

  public getDateString() {
    return this.date.toISOString().split('T')[0]
  }

  constructor(d: Date, selectedMonthDate: boolean) {
    this.date = d
    this.selectedMonthDate = selectedMonthDate || false
    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)
  }
}

export class CalendarRange {
  public startDay?: CalendarDay
  public endDay?: CalendarDay
  public title?: string

  constructor(startDay?: CalendarDay, endDay?: CalendarDay) {
    this.startDay = startDay
    this.endDay = endDay
  }
}

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
  imports: [TranslocoPipe, NgIf, NgClass, SlicePipe, FormsModule, NgForOf, DatePipe, ChunkPipe, InCalendarRangePipe]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangDateComponent extends QuangBaseComponent {
  @Input() dateValue?: number
  // @Input() format: string = CustomDateDefination.DEFAULT_DATE_FORMAT_STRING;
  @Input() format: string = 'DD/MM/YYYY'
  @Input() selectCalendarRange: boolean = false

  selectedDay?: CalendarDay
  selectedCalenderRange?: CalendarRange

  @Output() valueChange = new EventEmitter<number | string | CalendarRange | null>()

  public calendar: CalendarDay[] = []
  public monthNames = [
    Months.JANUARY,
    Months.FEBRIARY,
    Months.MARCH,
    Months.APRIL,
    Months.MAY,
    Months.JUNE,
    Months.JULY,
    Months.AUGUST,
    Months.SEPTEMBER,
    Months.OCTOBER,
    Months.NOVEMBER,
    Months.DECEMBER
  ]
  public displayMonth?: string
  monthIndex: number = 0

  selectedYear: number = new Date().getFullYear()
  accordianYear?: number
  totalDisplayedYears: number[] = []
  viewDatePicker: boolean = false
  viewMonthPicker: boolean = false

  _elementRef = inject(ElementRef)

  public onMonthPickerScroll() {
    const monthPicker = this._elementRef.nativeElement.querySelector('#month-picker')

    const monthPickerStart = this._elementRef.nativeElement.querySelector('#month-picker-start')
    const monthPickerEnd = this._elementRef.nativeElement.querySelector('#month-picker-end')

    const monthPickerStartTop = monthPickerStart.offsetTop
    const monthPickerTop = monthPicker.scrollTop

    if (monthPickerStartTop + 50 >= monthPickerTop) {
      this.addMonthsAtTop()
    } else {
      const monthPickerEndBottom = monthPickerEnd.offsetTop + monthPickerEnd.offsetHeight
      const monthPickerBottom = monthPicker.offsetTop + monthPicker.offsetHeight
      const monthPickerBottomScroll = monthPicker.scrollTop + monthPicker.offsetHeight

      if (monthPickerEndBottom >= monthPickerBottom && monthPickerEndBottom - 50 <= monthPickerBottomScroll) {
        this.addMonthsAtBottom()
      }
    }
  }

  private addMonthsAtTop() {
    if (this.totalDisplayedYears && this.totalDisplayedYears.length > 0) {
      let newTotalDisplayedYears = this.totalDisplayedYears
      for (let i = 0; i < 10; i++) {
        let firstDisplayedyear = newTotalDisplayedYears[0] - 1
        newTotalDisplayedYears.unshift(firstDisplayedyear)
      }

      this.totalDisplayedYears = newTotalDisplayedYears
    }
  }

  private addMonthsAtBottom() {
    if (this.totalDisplayedYears?.length > 0) {
      for (let i = 0; i < 10; i++) {
        let lastDisplayedYear = this.totalDisplayedYears[this.totalDisplayedYears.length - 1] + 1
        this.totalDisplayedYears.push(lastDisplayedYear)
      }
    }
  }

  public setSelectedYearMonth(monthIndex: number, year: number) {
    this.monthIndex = monthIndex
    this.selectedYear = year
    this.generateCalendarDays(this.monthIndex)
    this.showDatePicker()
  }

  private generateCalendarDays(monthIndex: number): void {
    this.accordianYear = this.selectedYear
    this.calendar = []

    let date: Date = new Date()
    let showCalenderFromMonth = monthIndex
    date.setDate(1)
    date.setMonth(showCalenderFromMonth)
    date.setFullYear(this.selectedYear)
    this.displayMonth = this.monthNames[date.getMonth()]

    let startingDateOfCalendar = this.getStartDateForCalendar(date)
    let dateToAdd = startingDateOfCalendar

    for (var i = 0; i < 42; i++) {
      let selectedMonthDate = true
      if (dateToAdd.getMonth() !== showCalenderFromMonth) {
        selectedMonthDate = false
      }
      this.calendar.push(new CalendarDay(new Date(dateToAdd), selectedMonthDate))
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1))
    }
  }

  private getStartDateForCalendar(selectedDate: Date) {
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0))
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth

    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1))
      } while (startingDateOfCalendar.getDay() != 1)
    }

    return startingDateOfCalendar
  }

  public showDatePicker(time: number = 0) {
    this.viewDatePicker = true
    setTimeout(() => {
      this._elementRef.nativeElement.querySelector('#date-range-picker').scrollBy({
        top: 400,
        left: 0,
        behavior: 'smooth'
      })

      setTimeout(() => {
        this.viewMonthPicker = false
      }, 350)
    }, time)
  }

  public increaseMonth() {
    this.monthIndex++
    this.onMonthIndexChange()
    this.generateCalendarDays(this.monthIndex)
  }

  public decreaseMonth() {
    this.monthIndex--
    this.onMonthIndexChange()
    this.generateCalendarDays(this.monthIndex)
  }

  private onMonthIndexChange() {
    if (this.monthIndex > 11) {
      this.monthIndex = 0
      this.selectedYear++
    }

    if (this.monthIndex < 0) {
      this.monthIndex = 11
      this.selectedYear--
    }
  }

  public showMonthPicker() {
    this.viewMonthPicker = true
    setTimeout(() => {
      this._elementRef.nativeElement.querySelector('#date-range-picker').scrollBy({
        top: -400,
        left: 0,
        behavior: 'smooth'
      })
      setTimeout(() => {
        this.viewDatePicker = false
      }, 350)
    }, 0)
  }

  public selectDay(selectedDay: CalendarDay) {
    if (this.selectCalendarRange) {
      this.selectRangeValue(selectedDay)
    } else {
      this.selectDateValue(selectedDay)
    }
  }

  private selectRangeValue(selectedDay: CalendarDay) {
    this.selectedDay = undefined
    // this.setCalendarRange(selectedDay);
    this.onValueChange()
  }

  private selectDateValue(selectedDay: CalendarDay) {
    this.selectedCalenderRange = undefined
    this.selectedDay = selectedDay
    this.onValueChange()
  }

  private onValueChange() {
    if (this.selectCalendarRange) {
      this.onRangeChange()
    } else {
      this.onDateChange()
    }
  }

  private onRangeChange() {
    if (this.selectCalendarRange) {
      this.valueChange.emit(this.selectedCalenderRange)
    }
  }

  private onDateChange() {
    let returnDate = this.selectedDay ? this.selectedDay.date.getTime() : null
    this.valueChange.emit(returnDate)
  }

  public setCurrentMonth() {
    this.monthIndex = new Date().getMonth()
    this.selectedYear = new Date().getFullYear()
    this.generateCalendarDays(this.monthIndex)
  }

  public clearCalendar() {
    this.selectedDay = undefined
    this.selectedCalenderRange = undefined
    this.onValueChange()
  }

  onButtonClick() {
    this.viewDatePicker = true
  }
}
