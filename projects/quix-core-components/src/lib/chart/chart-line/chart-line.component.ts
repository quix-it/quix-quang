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
import {ChartLine} from "./chart-line.model";
import EChartOption = echarts.EChartOption;

@Component({
  selector: 'quix-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartLineComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() ariaLabel: string;
  @Input() color: string[];
  @Input() tabIndex: number;
  @Input() height: string;
  @Input() chartData: ChartLine
  @Output() chartClick = new EventEmitter()
  chartOption: EChartOption = {
    color: [],
    xAxis: {},
    yAxis: {
      type: 'value'
    },
    series: [],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => {
      return idx * 5;
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartOption.color = changes.color?.currentValue
    this.chartOption.xAxis = {
      type: 'category',
      data: changes.chartData?.currentValue.category
    }
    this.chartOption.series = []
    changes.chartData?.currentValue.series.forEach(s => this.chartOption.series.push({
      data: s,
      type: 'line'
    }))
  }

  onChartClick(e) {
    this.chartClick.emit(e)
  }
}
