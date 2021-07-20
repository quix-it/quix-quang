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
import {ChartLine} from "./chart-line.model";

@Component({
  selector: 'quix-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartLineComponent implements OnInit, OnChanges {
    /**
   * Html id of input
   */
  @Input() id: string = '';
    /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`;
  @Input() color: string[];
    /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0;
  @Input() height: string;
  @Input() chartData: ChartLine
  /**
   * click event on the graph
   */
  @Output() chartClick: EventEmitter<any> = new EventEmitter()
  chartOption = {
    color: [],
    xAxis: {},
    yAxis: {
      type: 'value'
    },
    series: [],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => {
      return idx * 5;
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartOption.color = changes.color?.currentValue
    this.chartOption.xAxis = {
      type: 'category',
      data: changes.chartData?.currentValue.category
    }
    this.chartOption.series = []
    changes.chartData?.currentValue.series.forEach(s => this.chartOption.series.push({
      data: s,
      type: 'line'
    }))
  }
  /**
   * function triggered by clicking on an element of the chart emits an event to the parent component
   * @param e
   */
  onChartClick (e): void {
    this.chartClick.emit(e)
  }
}
