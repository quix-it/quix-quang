import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'

import { EChartsOption } from 'echarts'

import { ChartTree } from './chart-tree.model'

@Component({
  selector: 'quang-chart-tree',
  templateUrl: './chart-tree.component.html',
  styles: []
})
export class ChartTreeComponent implements OnChanges {
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
   * the height of the chart container
   */
  @Input() height: string = '50vh'
  /**
   *
   */
  @Input() color: string = '#000'
  /**
   *
   */
  @Input() nodeColor: string = '#000'
  /**
   * the object that contains the data to make the graph
   */
  @Input() chartData: ChartTree[] = []
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
    series: [
      {
        type: 'tree',
        data: [],
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 9
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        itemStyle: {
          color: this.nodeColor
        },
        lineStyle: {
          color: this.color
        },
        expandAndCollapse: true,
        animationDuration: 300,
        animationDurationUpdate: 300
      }
    ]
  }

  /**
   * change input management
   * @param changes component changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData?.currentValue) {
      ;(this.chartOption.series as any)[0].data = changes.chartData.currentValue
    }
    if (changes.grid?.currentValue) {
      this.chartOption.grid = changes.grid.currentValue
    }
    if (changes.color?.currentValue) {
      ;(this.chartOption.series as any)[0].lineStyle.color = changes.color.currentValue
    }
    if (changes.nodeColor?.currentValue) {
      ;(this.chartOption.series as any)[0].itemStyle.color = changes.nodeColor.currentValue
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
