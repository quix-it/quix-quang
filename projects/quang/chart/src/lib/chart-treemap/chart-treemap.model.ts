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
   * @param name chart name
   * @param value chart value
   * @param color chart color
   */
  constructor (name: string, value: number, color?: string) {
    this.name = name
    this.value = value
    if (color) {
      this.itemStyle = { color: color }
    }
  }
}
