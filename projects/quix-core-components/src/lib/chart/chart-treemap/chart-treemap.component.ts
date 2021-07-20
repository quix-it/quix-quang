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

import {ChartTreemap} from "./chart-treemap.model";

@Component({
  selector: 'quix-chart-treemap',
  templateUrl: './chart-treemap.component.html',
  styleUrls: ['./chart-treemap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartTreemapComponent implements OnInit, OnChanges {
    /**
   * Html id of input
   */
  @Input() id: string = ''
  @Input() height: string
  @Input() chartData: ChartTreemap[]
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
    series: []
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartOption.series.push({
      type: 'treemap',
      roam: false,
      breadcrumb: {show: false},
      nodeClick: false,
      data: [{
        children: changes.chartData.currentValue
      }]
    })
  }

  onChartClick(e) {
    this.chartClick.emit(e)
  }

}
