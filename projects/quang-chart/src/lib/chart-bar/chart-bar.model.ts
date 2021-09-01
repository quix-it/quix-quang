/**
 * chart bar
 */
export class ChartBar {
  /**
   * chart bar constructor
   * @param category chart category
   * @param series chart series
   */
  constructor (
    /**
     * chart category
     */
    public category: string[],
    /**
     * chart seires
     */
    public series: number[][]
  ) {
  }
}
