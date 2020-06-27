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
import {EChartOption} from "echarts";
import {ChartCandlestick} from "./chart-candlestick.model";

@Component({
  selector: 'quix-chart-candlestick',
  templateUrl: './chart-candlestick.component.html',
  styleUrls: ['./chart-candlestick.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCandlestickComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() height: string;
  @Input() chartData: ChartCandlestick;
  @Input() ariaLabel: string;
  @Input() tabIndex: number;
  @Output() chartClick = new EventEmitter()
  chartOption: EChartOption = {
    xAxis: {},
    yAxis: {},
    series: []
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartOption.series = []
    this.chartOption.xAxis = {
      data: changes.chartData.currentValue.category
    }
    this.chartOption.series.push({
      data: changes.chartData.currentValue.series,
      type: 'k'
    })
  }

  onChartClick(e) {
    this.chartClick.emit(e)
  }

}
