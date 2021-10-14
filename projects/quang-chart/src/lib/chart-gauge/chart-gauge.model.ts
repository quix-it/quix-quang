/**
 * Chart gauge model
 */
export class ChartGauge {
  /**
   * Constructor
   * @param name gauge name
   * @param value gauge value
   */
  constructor (
    /**
     * Chart gauge name
     */
    public name: string,
    /**
     * Chart gauge value
     */
    public value: number
  ) {}
}
