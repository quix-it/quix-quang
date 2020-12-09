export class ChartTreemap {
  public name: string;
  public value: number;
  public itemStyle?: { color: string };

  constructor(name: string, value: number, color?: string) {
    this.name = name
    this.value = value
    this.itemStyle = {color: color}
  }
}
