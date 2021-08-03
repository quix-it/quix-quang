export class ChartArea {
  /**
   * chart area
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
