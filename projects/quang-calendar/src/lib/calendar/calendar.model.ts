export class QuixCalendarEvent {
  /**
   * calendar event
   * @param title
   * @param date
   * @param allDay
   */
  constructor(
    /**
     * event title
     */
    public title: string,
    /**
     * event date
     */
    public date: Date,
    /**
     * event allDay
     */
    public allDay?: boolean
  ) {
  }
}
