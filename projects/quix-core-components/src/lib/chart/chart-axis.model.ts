export class ChartAxisModel {
  type: 'category' | 'value';
  data?: Array<string>;

  constructor(type: 'category' | 'value', data?: Array<string>) {
    this.type = type;
    this.data = data;
  }
}
