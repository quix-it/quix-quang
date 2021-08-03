/**
 * chart line
 */
export class ChartLine {
  /**
   * chart line constructor
   * @param category
   * @param series
   */
  constructor(
    /**
     * chart category
     */
    public category: string[],
    /**
     * chart series
     */
    public series: Array<number[]>
  ) {
  }
}
