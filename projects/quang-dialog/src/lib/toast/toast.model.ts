/**
 * toast
 */
export class QuixToast {
  /**
   * toast constructor
   * @param type
   * @param title
   * @param position
   * @param timing
   * @param text
   * @param textValue
   * @param date
   * @param dateFormat
   */
  constructor (
    /**
     * toast type
     */
    public type: 'success' | 'warning' | 'error',
    /**
     * toast title
     */
    public title: string,
    /**
     * toast position
     */
    public position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'bottom-right',
    /**
     * toast view timing
     */
    public timing?: number,
    /**
     * toast text
     */
    public text?: string,
    /**
     * toast dynamic value
     */
    public textValue?: any,
    /**
     * toast date
     */
    public date?: Date,
    /**
     * toast date format
     */
    public dateFormat?: string,
  ) {
  }
}
