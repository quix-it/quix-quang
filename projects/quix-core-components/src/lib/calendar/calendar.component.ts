import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {CalendarOptions} from '@fullcalendar/angular';
import {QuixCalendarEvent} from "./calendar.model";

@Component({
  selector: 'quix-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() id: string
  @Input() ariaLabel: string
  @Input() height: string
  @Input() locale: string
  @Input() tabIndex: number
  @Input() view: 'timeGridWeek' | 'dayGridMonth' | 'dayGridWeek'
  @Input() events: QuixCalendarEvent[]
  @Input() header: { [key: string]: any }
  @Input() footer: { [key: string]: any }
  @Input() buttonsIcons: { [key: string]: any } = {
    close: 'fas fa-times',
    prev: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
    prevYear: 'fas fa-angle-double-left',
    nextYear: 'fas fa-angle-double-right'
  }
  @Output() onEventClick = new EventEmitter<any>()
  @Output() onDateClick = new EventEmitter<any>()
  @Output() onViewChange = new EventEmitter<any>()
  calendarOptions: CalendarOptions = {
    initialView: this.view,
    themeSystem: 'bootstrap',
    events: [],
    height: '',
    eventClick: this.eventClick.bind(this),
    dateClick: this.dateClick.bind(this),
    headerToolbar: this.header,
    footerToolbar: this.footer,
    buttonIcons: this.buttonsIcons,
    locale: '',
  };

  constructor() {
  }

  ngOnInit()
    :
    void {
  }

  ngOnChanges(changes: SimpleChanges
  ) {
    if (changes.height?.currentValue) {
      this.calendarOptions.height = changes.height.currentValue
    }
    if (changes.events?.currentValue) {
      this.calendarOptions.events = changes.events?.currentValue
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
  }

  eventClick(event
               :
               any
  ) {
    this.onEventClick.emit(event)
  }

  dateClick(event
              :
              any
  ) {
    this.onDateClick.emit(event)
  }

  viewChange(event
               :
               any
  ) {
    this.onViewChange.emit(event)
  }

}
