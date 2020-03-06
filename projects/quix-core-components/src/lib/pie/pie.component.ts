import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PieDataModel} from './pie-data.model';
import {TranslateService} from '@ngx-translate/core';
import {ChartToolboxModel} from "./chart-toolbox.model";

@Component({
  selector: 'quix-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  @Input() id: string;
  @Input() type: 'pie' | 'doughnut';
  @Input() name: string;
  @Input() aria: string;
  @Input() colors: Array<string>;
  @Input() saveAsImageTitle: string;
  @Input() tabIndex: number;
  @Input() showLabels: boolean;
  @Input() tooltipFormat: (element) => {};
  @Input() labelsFormatter: (element) => {};
  @Input() showLegend: boolean;
  @Input() showSaveAsImage: boolean;
  @Input() legendOrientation: 'horizontal' | 'vertical';
  @Input() legendLeft: number;
  @Input() showToolbox: boolean;
  @Input() customTools: ChartToolboxModel[];
  @Input() data: Array<PieDataModel>;
  @Output() eventClick = new EventEmitter<any>();
  options: any;

  constructor(
    private i18n: TranslateService
  ) { }

  ngOnInit() {
    this.i18n.get(this.saveAsImageTitle ? this.saveAsImageTitle : 'standardSaveAsImage').subscribe(data => {
      this.options = {
        tooltip: {
          trigger: 'item',
          formatter: this.tooltipFormat ? this.tooltipFormat : '{b}: {c}'
        },
        // tslint:disable-next-line:max-line-length
        color: this.colors ? this.colors : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83',  '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        legend: {
          show: this.showLegend,
          orient: this.legendOrientation ? this.legendOrientation : 'vertical',
          left: this.legendLeft
        },
        toolbox: {
          show: this.showToolbox,
          feature: {
            saveAsImage: {
              show: this.showSaveAsImage,
              title: data
            }
          }
        },
        series: [
          {
            name: this.name,
            type: 'pie',
            radius: this.type === 'pie' ? '55%' : ['40%', '55%'],
            center: ['50%', '50%'],
            data: this.data.sort((a, b) => {
              return a.value - b.value;
            }),
            label: {
              show: this.showLabels,
              formatter: this.labelsFormatter ? this.labelsFormatter : '{b}'
            }
          }
        ],
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx) => {
          return Math.random() * 200;
        }
      };
      if (this.customTools) {
        this.customTools.forEach((tool, index) => {
          this.options.toolbox.feature['myTool' + index] = tool;
        });
      }
    });
  }

  onPieClick(event) {
    if (event) {
      this.eventClick.emit(event);
    }
  }
}
