/**
 * chart bar
 */
export class ChartBar {
  /**
   * chart bar constructor
   * @param category
   * @param series
   */
  constructor(
    /**
     * chart category
     */
    public category: string[],
    /**
     * chart seires
     */
    public series: Array<number[]>
  ) {
  }
}
