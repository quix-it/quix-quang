/**
 * calendar event
 */
export class QuixCalendarEvent {
  /**
   * calendar event constructor
   * @param title define event title
   * @param date define event date
   * @param allDay define event allday
   */
  constructor (
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
