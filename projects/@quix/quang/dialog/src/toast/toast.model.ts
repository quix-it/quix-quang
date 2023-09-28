/**
 * toast
 */
export class QuangToast {
  /**
   * toast constructor
   * @param type define toast tipe
   * @param title define toast title
   * @param position define toast position
   * @param timing define toast timing
   * @param text define toast text
   * @param textValue define toast dynamic value
   * @param date define toast date
   * @param dateFormat define toast date format
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
    public position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' = 'bottom-right',
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
    public dateFormat?: string
  ) {
  }
}
