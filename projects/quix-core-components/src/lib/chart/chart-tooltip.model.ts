export class ChartTooltipModel {
  trigger: 'intem' | 'axis';
  formatter?: string;
  axisPointer?: any;

  constructor(trigger: 'intem' | 'axis', format?: string) {
    this.trigger = trigger;
    this.formatter = format;
    this.axisPointer = trigger === 'axis' ? { type: 'shadow'} : null;
  }
}
