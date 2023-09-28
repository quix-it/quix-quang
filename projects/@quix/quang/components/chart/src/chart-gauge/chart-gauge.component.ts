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
import { ChartGauge } from './chart-gauge.model'

@Component({
  selector: 'quang-chart-gauge',
  templateUrl: './chart-gauge.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartGaugeComponent implements OnChanges {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * Determine the aria label tag for accessibility
   */
  @Input() ariaLabel: string = 'Chart'
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * the minimum value indicated in the graph
   */
  @Input() min: number = 0
  /**
   * the maximum value indicated in the graph
   */
  @Input() max: number = 100
  /**
   * the height of the chart container
   */
  @Input() height: string = ' 50vh'
  /**
   *
   */
  @Input() pointerColor: string = 'auto'
  /**
   *
   */
  @Input() gaugeColor: string = '#000'
  /**
   *
   */
  @Input() color: string = '#000'
  /**
   * the object that contains the data to make the graph
   */
  @Input() chartData: ChartGauge | null = null
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
    series: [
      {
        type: 'gauge',
        min: this.min,
        max: this.max,
        data: [],
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}'
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisLine: {
          lineStyle: {
            color: [
              [1, this.gaugeColor]
            ]
          }
        },
        itemStyle: {
          color: this.color
        }
      }
    ]
  }

  /**
   * change input management
   * @param changes component changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.chartData?.currentValue) {
      (this.chartOption.series as any)[0].data = [changes.chartData.currentValue]
    }
    if (changes.grid?.currentValue) {
      this.chartOption.grid = changes.grid.currentValue
    }
    if (changes.min?.currentValue) {
      (this.chartOption.series as any)[0].min = changes.min.currentValue
    }
    if (changes.max?.currentValue) {
      (this.chartOption.series as any)[0].max = changes.max.currentValue
    }
    if (changes.pointerColor?.currentValue) {
      (this.chartOption.series as any)[0].pointer.itemStyle = { color: changes.pointerColor.currentValue }
    }
    if (changes.gaugeColor?.currentValue) {
      (this.chartOption.series as any)[0].axisLine.lineStyle.color = [[1, changes.gaugeColor.currentValue]]
    }
    if (changes.color?.currentValue) {
      (this.chartOption.series as any)[0].itemStyle.color = changes.color.currentValue
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
