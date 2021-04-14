import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core'
import { ChartLine } from '../chart-line/chart-line.model'

@Component({
  selector: 'quix-chart-area',
  templateUrl: './chart-area.component.html',
  styleUrls: ['./chart-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartAreaComponent implements OnInit, OnChanges {
  @Input() id: string
  @Input() color: string[]
  @Input() ariaLabel: string
  @Input() tabIndex: number
  @Input() height: string
  @Input() chartData: ChartLine
  @Output() chartClick = new EventEmitter()
  chartOption = {
    color: [],
    xAxis: {},
    yAxis: {
      type: 'value'
    },
    series: [],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => idx * 5
  }

  constructor () {
  }

  ngOnInit (): void {
  }

  ngOnChanges (changes: SimpleChanges) {
    this.chartOption.color = changes.color.currentValue
    this.chartOption.xAxis = {
      type: 'category',
      data: changes.chartData.currentValue.category
    }
    this.chartOption.series = []
    changes.chartData.currentValue.series.forEach(s => this.chartOption.series.push({
      data: s,
      type: 'line',
      areaStyle: {},
    }))
  }

  onChartClick (e) {
    this.chartClick.emit(e)
  }

}
