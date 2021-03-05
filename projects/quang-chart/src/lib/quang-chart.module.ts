import { NgModule } from '@angular/core';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts'
import { CommonModule } from '@angular/common'
import { ChartAreaComponent } from './chart-area/chart-area.component'
import { ChartDoughnutComponent } from './chart-doughnut/chart-doughnut.component'
import { ChartCandlestickComponent } from './chart-candlestick/chart-candlestick.component'
import { ChartBarComponent } from './chart-bar/chart-bar.component'
import { ChartLineComponent } from './chart-line/chart-line.component'
import { ChartPieComponent } from './chart-pie/chart-pie.component'
import { ChartRadarComponent } from './chart-radar/chart-radar.component'
import { ChartTreemapComponent } from './chart-treemap/chart-treemap.component'


@NgModule({
  declarations: [
    ChartAreaComponent,
    ChartBarComponent,
    ChartCandlestickComponent,
    ChartDoughnutComponent,
    ChartLineComponent,
    ChartPieComponent,
    ChartRadarComponent,
    ChartTreemapComponent
  ],
  imports: [
    NgxEchartsModule.forRoot({echarts}),
    CommonModule
  ],
  exports: [
    ChartAreaComponent,
    ChartBarComponent,
    ChartCandlestickComponent,
    ChartDoughnutComponent,
    ChartLineComponent,
    ChartPieComponent,
    ChartRadarComponent,
    ChartTreemapComponent
  ]
})
export class QuangChartModule { }
