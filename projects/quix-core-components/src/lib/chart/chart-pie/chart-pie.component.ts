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

import {ChartPie} from "./chart-pie.model";

@Component({
  selector: 'quix-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartPieComponent implements OnInit, OnChanges {
    /**
   * Html id of input
   */
  @Input() id: string = '';
  @Input() height: string;
  @Input() color: string[];
  @Input() chartData: ChartPie[];
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
    color: [],
    series: [
      {
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: []
      }
    ],
    animationEasing: 'elasticOut',
    animationDelay: function (idx) {
      return Math.random() * 200;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartOption.color = changes.color.currentValue
    this.chartOption.series[0].data = changes.chartData.currentValue
  }

  /**
   * function triggered by clicking on an element of the chart emits an event to the parent component
   * @param e
   */
  onChartClick (e): void {
    this.chartClick.emit(e)
  }
}
