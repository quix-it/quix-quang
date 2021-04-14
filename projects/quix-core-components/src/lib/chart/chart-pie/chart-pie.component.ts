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

import {ChartPie} from "./chart-pie.model";

@Component({
  selector: 'quix-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartPieComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() height: string;
  @Input() color: string[];
  @Input() chartData: ChartPie[];
  @Input() ariaLabel: string;
  @Input() tabIndex: number;
  @Output() chartClick = new EventEmitter()

  chartOption = {
    color: [],
    series: [
      {
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: []
      }
    ],
    animationEasing: 'elasticOut',
    animationDelay: function (idx) {
      return Math.random() * 200;
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartOption.color = changes.color.currentValue
    this.chartOption.series[0].data = changes.chartData.currentValue
  }

  onChartClick(e) {
    this.chartClick.emit(e)
  }

}
