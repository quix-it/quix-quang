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
import { ChartArea } from './chart-area.model'

/**
 * chart area component decorator
 */
@Component({
  selector: 'quang-chart-area',
  templateUrl: './chart-area.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * chart area component
 */
export class ChartAreaComponent implements OnChanges {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * Determine the arialabel tag for accessibility,
   */
  @Input() ariaLabel: string = 'Chart'
  /**
   * the list of colors of the chart
   */
  @Input() color: string[] = []
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * the height of the chart container
   */
  @Input() height: string = ' 50vh'
  /**
   * the object that contains the data to make the graph
   */
  @Input() chartData: ChartArea | null = null
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
  @Output() chartClick: EventEmitter<any> = new EventEmitter()
  /**
   * basic configuration of the chart
   */
  chartOption: EChartsOption = {
    color: [],
    xAxis: {},
    yAxis: {
      type: 'value'
    },
    series: [],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx: any) => {
      return idx * 5
    }
  }

  /**
   * change input management
   * @param changes component changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.color?.currentValue) {
      this.chartOption.color = changes.color.currentValue
    }
    if (changes.chartData?.currentValue) {
      this.chartOption.xAxis = {
        type: 'category',
        data: changes.chartData.currentValue.category
      }
    }
    if (changes.chartData?.currentValue?.series.length) {
      this.chartOption.series = changes.chartData.currentValue.series.map((s: any) => ({
        data: s,
        type: 'line',
        areaStyle: {}
      }))
    }
    if (changes.grid?.currentValue) {
      this.chartOption.grid = changes.grid.currentValue
    }
  }

  /**
   * function triggered by clicking on an element of the chart emits an event to the parent component
   * @param e event
   */
  onChartClick (e: any): void {
    this.chartClick.emit(e)
  }
}
