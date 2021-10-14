/**
 * chart radar
 */
export class ChartRadar {
  /**
   * chart radar  value
   */
  public value: number[] = []
  /**
   * chart radar name
   */
  public name?: string
  /**
   * Radar line style
   */
  public lineStyle?: {
    color: string
  }
  /**
   *
   */
  public symbolKeepAspect = true
  /**
   *
   */
  public symbol: string = 'none'

  constructor (value: number[], name?: string, color?: string) {
    this.value = value
    this.name = name
    if (color) {
      this.lineStyle = { color: color }
    }
  }
}

/**
 * chart radar indicator
 */
export class ChartRadarIndicator {
  /**
   * chart radar series item constructor
   * @param name chart name
   * @param max chart max
   */
  constructor (
    /**
     * chart name
     */
    public name: string,
    /**
     * chart max
     */
    public max: number
  ) {
  }
}
