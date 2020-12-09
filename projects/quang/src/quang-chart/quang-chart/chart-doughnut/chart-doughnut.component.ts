import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {EChartOption} from "echarts";
import {ChartDoughnut} from "./chart-doughnut.model";

@Component({
  selector: 'quix-chart-doughnut',
  templateUrl: './chart-doughnut.component.html',
  styleUrls: ['./chart-doughnut.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartDoughnutComponent implements OnInit {
  @Input() id: string;
  @Input() height: string;
  @Input() color: string[];
  @Input() chartData: ChartDoughnut[];
  @Input() ariaLabel: string;
  @Input() tabIndex: number;
  @Output() chartClick = new EventEmitter()

  chartOption: EChartOption = {
    color: [],
    series: [
      {
        type: 'pie',
        radius: ['30%', '50%'],
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
