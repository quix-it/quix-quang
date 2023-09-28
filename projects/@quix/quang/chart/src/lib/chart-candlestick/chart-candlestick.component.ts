import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'
import { ChartCandlestick } from './chart-candlestick.model'
import { EChartsOption } from 'echarts'

/**
 * chart candlestick component decorator
 */
@Component({
  selector: 'quang-chart-candlestick',
  templateUrl: './chart-candlestick.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * chart candlestick component
 */
export class ChartCandlestickComponent implements OnChanges {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * the height of the chart container
   */
  @Input() height: string = ' 50vh'
  /**
   * the object that contains the data to make the graph
   */
  @Input() chartData: ChartCandlestick | null = null
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
   * the color of the graph
   */
  @Input() colors: [color: string, color0: string] = ['red', 'green']
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
    xAxis: {},
    yAxis: {},
    series: []
  }

  /**
   * change input management
   * @param changes component changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.chartData?.currentValue) {
      this.chartOption.xAxis = {
        data: changes.chartData.currentValue.category
      }
      this.chartOption.series = [{
        type: 'candlestick',
        itemStyle: {
          color: this.colors[0],
          borderColor: this.colors[0],
          color0: this.colors[1],
          borderColor0: this.colors[1]
        },
        data: changes.chartData.currentValue.series
      }]
    }
    if (changes.grid?.currentValue) {
      this.chartOption.grid = changes.grid.currentValue
    }
  }

  /**
   * function triggered by clicking on an element of the chart emits an event to the parent component
   * @param e
   */
  onChartClick (e: any): void {
    this.chartClick.emit(e)
  }
}
