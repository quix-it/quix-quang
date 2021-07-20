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
import {ChartLine} from "../chart-line/chart-line.model";


@Component({
  selector: 'quix-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBarComponent implements OnInit, OnChanges {
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
  @Input() horizontal: boolean = false;
  @Input() chartData: ChartLine
  /**
   * click event on the graph
   */
  @Output() chartClick: EventEmitter<any> = new EventEmitter()
  chartOption = {
    color: [],
    xAxis: {},
    yAxis: {},
    series: [],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => {
      return idx * 5;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.chartOption.color = changes.color?.currentValue
    this.chartOption.series = []
    changes.chartData?.currentValue.series.forEach(s => this.chartOption.series.push({
      data: s,
      type: 'bar'
    }))
    if(changes.horizontal?.currentValue){
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
   * @param e
   */
  onChartClick (e): void {
    this.chartClick.emit(e)
  }
}
