/**
 * chart candlestick
 */
export class ChartCandlestick {
  /**
   * char candlestick constructor
   * @param category chart category
   * @param series chart series
   */
  constructor(
    /**
     * chart categoru
     */
    public category: string[],
    /**
     * chart series
     */
    public series: Array<[number, number, number, number]>
  ) {}
}
