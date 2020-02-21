export class ChartDataModel {
  name?: string;
  type: 'bar' | 'line';
  data: Array<number>;
  animationDelay: any;

  constructor(type: 'bar' | 'line', data: Array<number>, name?: string) {
    this.type = type;
    this.data = data;
    this.name = name;
    this.animationDelay = (idx) => {
      return idx * 10;
    };
  }
}
