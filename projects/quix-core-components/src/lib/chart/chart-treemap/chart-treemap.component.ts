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

import {ChartTreemap} from "./chart-treemap.model";

@Component({
  selector: 'quix-chart-treemap',
  templateUrl: './chart-treemap.component.html',
  styleUrls: ['./chart-treemap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartTreemapComponent implements OnInit, OnChanges {
  @Input() id: string
  @Input() height: string
  @Input() chartData: ChartTreemap[]
  @Input() ariaLabel: string;
  @Input() tabIndex: number;
  @Output() chartClick = new EventEmitter()
  chartOption = {
    series: []
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartOption.series.push({
      type: 'treemap',
      roam: false,
      breadcrumb: {show: false},
      nodeClick: false,
      data: [{
        children: changes.chartData.currentValue
      }]
    })
  }

  onChartClick(e) {
    this.chartClick.emit(e)
  }

}
