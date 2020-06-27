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
import {ChartRadar} from "./chart-radar.model";

@Component({
  selector: 'quix-chart-radar',
  templateUrl: './chart-radar.component.html',
  styleUrls: ['./chart-radar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartRadarComponent implements OnInit, OnChanges {
  @Input() id: string
  @Input() height: string
  @Input() radarIndicators: ChartRadar[];
  @Input() chartData: number[][];
  @Input() ariaLabel: string;
  @Input() tabIndex: number;
  @Output() chartClick = new EventEmitter()

  chartOption: EChartOption = {
    radar: {},
    series: []
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartOption.series = []
    this.chartData?.forEach(s => {
      this.chartOption.series.push({type: 'radar', data: [{value: s}]})
    })
    this.chartOption.radar = {indicator: changes.radarIndicators?.currentValue}
  }

  onChartClick(e) {
    this.chartClick.emit(e)
  }
}
