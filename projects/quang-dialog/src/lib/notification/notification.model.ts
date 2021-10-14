/**
 *
 */
export class QuixNotification {
  /**
   *
   * @param title
   * @param body
   * @param imageUrl
   * @param iconUrl
   */
  constructor (
    /**
     *
     */
    public title: string,
    /**
     *
     */
    public body: string,
    /**
     *
     */
    public imageUrl?: string,
    /**
     *
     */
    public iconUrl?: string,
  ) {}
}
