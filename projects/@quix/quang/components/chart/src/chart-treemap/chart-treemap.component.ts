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

import { ChartTreemap } from './chart-treemap.model'

/**
 * chart treemap component decorator
 */
@Component({
  selector: 'quang-chart-treemap',
  templateUrl: './chart-treemap.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * chart treemap component
 */
export class ChartTreemapComponent implements OnChanges {
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
  @Input() chartData: ChartTreemap[] = []
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
    series: []
  }

  /**
   * change input management
   * @param changes component changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData?.currentValue?.length) {
      this.chartOption.series = [
        {
          type: 'treemap',
          roam: false,
          breadcrumb: { show: false, emptyItemWidth: 0 },
          nodeClick: 'zoomToNode',
          data: [
            {
              children: changes.chartData.currentValue
            }
          ]
        }
      ]
    }
    if (changes.grid?.currentValue) {
      this.chartOption.grid = changes.grid.currentValue
    }
  }

  /**
   * function triggered by clicking on an element of the chart emits an event to the parent component
   * @param e
   */
  onChartClick(e: any): void {
    this.chartClick.emit(e)
  }
}
