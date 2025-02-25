import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'

import { EChartsOption } from 'echarts'

import { ChartPie } from './chart-pie.model'

/**
 * chart pie component decorator
 */
@Component({
  selector: 'quang-chart-pie',
  templateUrl: './chart-pie.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * chart pie component
 */
export class ChartPieComponent implements OnChanges {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * the height of the chart container
   */
  @Input() height: string = ' 50vh'
  /**
   * the list of colors of the chart
   */
  @Input() color: string[] = []
  /**
   * the object that contains the data to make the graph
   */
  @Input() chartData: ChartPie[] = []
  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = 'Chart'
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * the grid that contains the graph defines the padding in the four directions
   */
  @Input() grid: {
    top: number
    bottom: number
    left: number
    right: number
  } = { top: 0, left: 0, right: 0, bottom: 0 }

  /**
   * click event on the graph
   */
  @Output() chartClick = new EventEmitter<any>()
  /**
   * basic configuration of the chart
   */
  chartOption: EChartsOption = {
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
    animationDelay: function (idx: any) {
      return Math.random() * 200
    }
  }

  /**
   * change input management
   * @param changes component changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.color?.currentValue) {
      this.chartOption.color = changes.color.currentValue
    }
    if (changes.chartData?.currentValue && (this.chartOption?.series as any[])[0]) {
      ;(this.chartOption.series as any)[0].data = changes.chartData.currentValue
    }
    if (changes.grid?.currentValue) {
      this.chartOption.grid = changes.grid.currentValue
    }
  }

  /**
   * function triggered by clicking on an element of the chart emits an event to the parent component
   * @param e event
   */
  onChartClick(e: any): void {
    this.chartClick.emit(e)
  }
}
