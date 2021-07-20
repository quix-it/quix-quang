import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'
import { ChartTreemap } from './chart-treemap.model'
import { EChartOption } from 'echarts'

@Component({
  selector: 'quix-chart-treemap',
  templateUrl: './chart-treemap.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartTreemapComponent implements  OnChanges {
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
  @Input() chartData: ChartTreemap[]
  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Chart`
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
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
    series: []
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.chartData?.currentValue?.length) {
      this.chartOption.series.push({
        type: 'treemap',
        roam: false,
        breadcrumb: { show: false },
        nodeClick: false,
        data: [{
          children: changes.chartData.currentValue
        }]
      })
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
