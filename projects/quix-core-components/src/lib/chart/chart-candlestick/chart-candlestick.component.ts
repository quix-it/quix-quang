import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ChartCandlestick} from "./chart-candlestick.model";

@Component({
  selector: 'quix-chart-candlestick',
  templateUrl: './chart-candlestick.component.html',
  styleUrls: ['./chart-candlestick.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCandlestickComponent implements OnInit, OnChanges {
    /**
   * Html id of input
   */
  @Input() id: string = '';
  @Input() height: string;
  @Input() chartData: ChartCandlestick;
    /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`;
    /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0;
  /**
   * click event on the graph
   */
  @Output() chartClick: EventEmitter<any> = new EventEmitter()
  chartOption = {
    xAxis: {},
    yAxis: {},
    series: []
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartOption.series = []
    this.chartOption.xAxis = {
      data: changes.chartData.currentValue.category
    }
    this.chartOption.series.push({
      data: changes.chartData.currentValue.series,
      type: 'k'
    })
  }

  /**
   * function triggered by clicking on an element of the chart emits an event to the parent component
   * @param e
   */
  onChartClick (e): void {
    this.chartClick.emit(e)
  }
}
