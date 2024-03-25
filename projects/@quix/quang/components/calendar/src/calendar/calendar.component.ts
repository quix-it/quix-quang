import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'

import { CalendarOptions } from '@fullcalendar/core'

/**
 * calendar component decorator
 */
@Component({
  selector: 'quang-calendar',
  templateUrl: './calendar.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * calendar component
 */
export class QuangCalendarComponent implements OnChanges {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Calendar ${this.id}`
  /**
   * the height of the calendar
   */
  @Input() height: string = ''
  /**
   * the locale of the calendar
   */
  @Input() locale: string = ''
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * Defines what to do when the calendar view changes and the events of the current view should be loaded
   * @param e
   * @param s
   * @param f
   */
  @Input() callBack: (e: any, s: any, f: any) => any = (e, s, f) => []
  /**
   * Defines the type of calendar view
   */
  @Input() view: 'timeGridWeek' | 'dayGridMonth' | 'dayGridWeek' = 'dayGridMonth'
  /**
   * Defines the format of the calendar header
   */
  @Input() header: Record<string, any> = {}
  /**
   * Defines the format of the calendar footer
   */
  @Input() footer: Record<string, any> = {}
  /**
   * Defines the classes of the font-awesome icons that will be used in the buttons
   */
  @Input() buttonsIcons: Record<string, any> = {
    close: ' fas fa-times',
    prev: ' fas fa-chevron-left',
    next: ' fas fa-chevron-right',
    prevYear: ' fas fa-angle-double-left',
    nextYear: ' fas fa-angle-double-right'
  }

  /**
   *
   */
  @Input() firstDay: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday' = 'monday'
  /**
   *
   */
  @Input() dayMaxEventRows: number | null = null
  /**
   *
   */
  @Input() eventMaxStack: number | null = null
  /**
   *
   */
  @Input() dayMaxEvents: number | boolean = true
  /**
   * Event triggered when a calendar event is clicked
   */
  @Output() whenEventClick: EventEmitter<any> = new EventEmitter<any>()
  /**
   * Event triggered when a date on the calendar is clicked
   */
  @Output() whenDateClick: EventEmitter<any> = new EventEmitter<any>()
  /**
   * Event triggered when the calendar view of the calendar changes
   */
  @Output() whenViewChange: EventEmitter<any> = new EventEmitter<any>()

  _daysMap: Record<string, number> = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0
  }

  /**
   * calendar config
   */
  calendarOptions: CalendarOptions = {
    initialView: this.view,
    themeSystem: 'bootstrap5',
    events: this.viewChange.bind(this),
    height: '',
    eventClick: this.eventClick.bind(this),
    headerToolbar: this.header,
    footerToolbar: this.footer,
    buttonIcons: this.buttonsIcons,
    locale: ''
    // dateClick: this.dateClick.bind(this)
  }

  /**
   * change input management
   * @param changes component changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.height?.currentValue) {
      this.calendarOptions.height = changes.height.currentValue
    }
    if (changes.view?.currentValue) {
      this.calendarOptions.initialView = changes.view?.currentValue
    }
    if (changes.header?.currentValue) {
      this.calendarOptions.headerToolbar = changes.header?.currentValue
    }
    if (changes.footer?.currentValue) {
      this.calendarOptions.footerToolbar = changes.footer?.currentValue
    }
    if (changes.locale?.currentValue) {
      this.calendarOptions.locale = changes.locale?.currentValue
    }
    if (changes.firstDay?.currentValue) {
      this.calendarOptions.firstDay = this._daysMap[changes.firstDay.currentValue]
    }
    if (changes.dayMaxEvents?.currentValue) {
      this.calendarOptions.dayMaxEvents = changes.dayMaxEvents?.currentValue
    }
  }

  /**
   * emits when an event is clicked
   * @param event
   */
  eventClick(event: any): void {
    this.whenEventClick.emit(event)
  }

  /**
   * emits when a date is clicked
   * @param event
   */
  dateClick(event: any): void {
    this.whenDateClick.emit(event)
  }

  /**
   * emits when the calendar view changes,
   * if a callback function has been defined it executes the function passed in input
   * @param event
   * @param successCallback
   * @param failureCallback
   */
  viewChange(event: any, successCallback: any, failureCallback: any): void {
    this.whenViewChange.emit(event)
    this.callBack(event, successCallback, failureCallback)
  }
}
