import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PieDataModel} from './pie-data.model';

@Component({
  selector: 'quix-pie',
  template: '<div [id]="id" echarts [options]="options" [autoResize]="true" (chartClick)="onPieClick($event)"\n' +
    '     [tabIndex]="tabIndex" [attr.aria-describedby]="aria"></div>',
  styles: []
})
export class PieComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() aria: string;
  @Input() tabIndex: number;
  @Input() tooltipFormat: string;
  @Input() data: Array<PieDataModel>;
  @Output() eventClick = new EventEmitter<any>();
  options: any;

  constructor() {
  }

  ngOnInit() {
    this.options = {
      tooltip: {
        trigger: 'item',
        formatter: this.tooltipFormat
      },
      series: [
        {
          name: this.name,
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: this.data.sort((a, b) => {
            return a.value - b.value;
          }),
        }
      ],
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => {
        return Math.random() * 200;
      }
    };
  }

  onPieClick(event) {
    if (event) {
      this.eventClick.emit(event);
    }
  }
}
