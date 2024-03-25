import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'
import { ChartRadar, ChartRadarIndicator } from './chart-radar.model'
import { EChartsOption } from 'echarts'

/**
 * chart radar component decorator
 */
@Component({
  selector: 'quix-chart-radar',
  templateUrl: './chart-radar.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * chart radar component
 */
export class ChartRadarComponent implements OnChanges {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * the height of the chart container
   */
  @Input() height: string = ' 50vh'
  /**
   * radar type section indicators
   */
  @Input() radarIndicators: ChartRadarIndicator[] = []
  /**
   * the object that contains the data to make the graph
   */
  @Input() chartData: ChartRadar[] = []
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
  @Output() chartClick: EventEmitter<any> = new EventEmitter()
  /**
   * basic configuration of the chart
   */
  chartOption: EChartsOption = {
    radar: {},
    series: [{type: 'radar', data:[]}]
  }

  /**
   * change input management
   * @param changes component changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.chartData?.currentValue) {
      (this.chartOption.series as any)[0].data = changes.chartData.currentValue
    }
    if (changes.radarIndicators?.currentValue) {
      this.chartOption.radar = { indicator: changes.radarIndicators?.currentValue }
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
