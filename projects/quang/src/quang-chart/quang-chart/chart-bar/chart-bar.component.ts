import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ChartLine} from "../chart-line/chart-line.model";
import {EChartOption} from "echarts";

@Component({
  selector: 'quix-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBarComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() ariaLabel: string;
  @Input() color: string[];
  @Input() tabIndex: number;
  @Input() height: string;
  @Input() horizontal: boolean = false;
  @Input() chartData: ChartLine
  @Output() chartClick = new EventEmitter()
  chartOption: EChartOption = {
    color: [],
    xAxis: {},
    yAxis: {},
    series: [],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => {
      return idx * 5;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.chartOption.color = changes.color?.currentValue
    this.chartOption.series = []
    changes.chartData?.currentValue.series.forEach(s => this.chartOption.series.push({
      data: s,
      type: 'bar'
    }))
    if(changes.horizontal?.currentValue){
      this.chartOption.xAxis = {
        type: 'value'
      }
      this.chartOption.yAxis = {
        type: 'category',
        data: changes.chartData?.currentValue.category
      }
    } else {
      this.chartOption.yAxis = {
        type: 'value'
      }
      this.chartOption.xAxis = {
        type: 'category',
        data: changes.chartData?.currentValue.category
      }
    }
  }

  onChartClick(e) {
    this.chartClick.emit(e)
  }
}
