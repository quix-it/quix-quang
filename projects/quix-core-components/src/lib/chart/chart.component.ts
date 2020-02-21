import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChartAxisModel} from './chart-axis.model';
import {ChartDataModel} from './chart-data.model';
import {ChartTooltipModel} from './chart-tooltip.model';

@Component({
  selector: 'quix-chart',
  template: '<div [id]="id" echarts [options]="options" [autoResize]="true" (chartClick)="onChartClick($event)"\n' +
    '     [attr.aria-describedby]="aria" [tabIndex]="tabIndex"></div>',
  styles: []
})
export class ChartComponent implements OnInit {
  @Input() id: string;
  @Input() xAxis: ChartAxisModel;
  @Input() yAxis: ChartAxisModel;
  @Input() data: Array<ChartDataModel>;
  @Input() colors: Array<string>;
  @Input() tooltip: ChartTooltipModel;
  @Input() aria: string;
  @Input() tabIndex: number;
  @Output() eventClick = new EventEmitter<any>();

  options: any;

  constructor() {
  }

  ngOnInit() {
    this.options = {
      color: this.colors,
      xAxis: this.xAxis,
      yAxis: this.yAxis,
      series: this.data,
      tooltip: this.tooltip ? this.tooltip : {},
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => {
        return idx * 5;
      }
    };
  }

  onChartClick(event) {
    if (event) {
      this.eventClick.emit(event);
    }
  }
}
