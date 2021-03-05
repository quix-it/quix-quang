export class QuixCalendarEvent {
  constructor(
    public title: string,
    public date: Date,
    public allDay?: boolean
  ) {
  }
}
