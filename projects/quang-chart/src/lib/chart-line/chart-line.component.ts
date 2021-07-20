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
import { ChartLine } from './chart-line.model'
import { EChartOption } from 'echarts'

@Component({
  selector: 'quix-chart-line',
  templateUrl: './chart-line.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartLineComponent implements OnChanges {
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
  @Input() height: string = ' 50vh'
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
  chartOption: EChartOption = {
    color: [],
    xAxis: {},
    yAxis: {
      type: 'value'
    },
    series: [],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => {
      return idx * 5
    }
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.color?.currentValue) {
      this.chartOption.color = changes.color?.currentValue
    }
    if (changes.chartData?.currentValue) {
      this.chartOption.xAxis = {
        type: 'category',
        data: changes.chartData?.currentValue.category
      }
      this.chartOption.series = changes.chartData?.currentValue.series.map(
        s => ({
          data: s,
          type: 'line'
        })
      )
    }
    if (changes.grid?.currentValue) {
      this.chartOption.grid = changes.grid.currentValue
    }
  }

  /**
   * function triggered by clicking on an element of the chart emits an event to the parent component
   * @param e
   */
  onChartClick (e): void {
    this.chartClick.emit(e)
  }
}
