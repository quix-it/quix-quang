export class ChartCandlestick {
  /**
   * char candlestick
   * @param category
   * @param series
   */
  constructor(
    /**
     * chart categoru
     */
    public category: string[],
    /**
     * chart series
     */
    public series: [number, number,number,number][]
  ) {
  }
}
