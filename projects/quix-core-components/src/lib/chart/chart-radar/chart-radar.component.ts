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

import {ChartRadar} from "./chart-radar.model";

@Component({
  selector: 'quix-chart-radar',
  templateUrl: './chart-radar.component.html',
  styleUrls: ['./chart-radar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartRadarComponent implements OnInit, OnChanges {
    /**
   * Html id of input
   */
  @Input() id: string = ''
  @Input() height: string
  @Input() radarIndicators: ChartRadar[];
  @Input() chartData: number[][];
    /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`;
    /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0;
  /**
   * click event on the graph
   */
  @Output() chartClick: EventEmitter<any> = new EventEmitter()

  chartOption = {
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
