import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'
import { ChartLine } from '../chart-line/chart-line.model'
import { EChartsOption } from 'echarts'
/**
 * chart bar component decorator
 */
@Component({
  selector: 'quix-chart-bar',
  templateUrl: './chart-bar.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * chart bar component
 */
export class ChartBarComponent implements OnChanges {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Chart`
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
  @Input() height: string = '50vh'
  /**
   * defines whether the graph is displayed horizontally
   */
  @Input() horizontal: boolean = false
  /**
   * the object that contains the data to make the graph
   */
  @Input() chartData: ChartLine
  /**
   * the grid that contains the graph defines the padding in the four directions
   */
  @Input() grid: {
    top: number,
    bottom: number,
    left: number,
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
    yAxis: {},
    series: [],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => {
      return idx * 5
    }
  }
  /**
   * change input management
   * @param changes component changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.color?.currentValue) {
      this.chartOption.color = changes.color?.currentValue
    }
    if (changes.chartData?.currentValue?.series.length) {
      this.chartOption.series = changes.chartData.currentValue.series.map(s => ({
        data: s,
        type: 'bar'
      }))
    }
    if (changes.grid?.currentValue) {
      this.chartOption.grid = changes.grid.currentValue
    }
    if (changes.horizontal?.currentValue) {
      this.chartOption.xAxis = {
        type: 'value'
      }
      this.chartOption.yAxis = {
        type: 'category',
        data: changes.chartData?.currentValue.category
      }
    } else {
      this.chartOption.yAxis = {
        type: 'value'
      }
      this.chartOption.xAxis = {
        type: 'category',
        data: changes.chartData?.currentValue.category
      }
    }
  }

  /**
   * function triggered by clicking on an element of the chart emits an event to the parent component
   * @param e event
   */
  onChartClick (e): void {
    this.chartClick.emit(e)
  }
}
