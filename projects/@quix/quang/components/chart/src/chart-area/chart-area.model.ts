/**
 * chart area
 */
export class ChartArea {
  /**
   * chart area constructor
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
    public series: number[][]
  ) {}
}
