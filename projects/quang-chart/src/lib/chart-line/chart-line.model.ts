/**
 * chart line
 */
export class ChartLine {
  /**
   * chart line constructor
   * @param category chart category
   * @param series chart series
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
