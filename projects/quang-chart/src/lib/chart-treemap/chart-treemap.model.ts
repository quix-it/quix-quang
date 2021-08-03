/**
 * chart treemap
 */
export class ChartTreemap {
  /**
   * chart name
   */
  public name: string
  /**
   * chart value
   */
  public value: number
  /**
   * chart style
   */
  public itemStyle?: { color: string }

  /**
   * chart treemap series item constructor
   * @param name
   * @param value
   * @param color
   */
  constructor (name: string, value: number, color?: string) {
    this.name = name
    this.value = value
    this.itemStyle = { color: color }
  }
}
