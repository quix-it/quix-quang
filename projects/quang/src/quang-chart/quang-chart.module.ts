import {NgModule} from "@angular/core";
import {ChartAreaComponent} from "./quang-chart/chart-area/chart-area.component";
import {ChartBarComponent} from "./quang-chart/chart-bar/chart-bar.component";
import {ChartCandlestickComponent} from "./quang-chart/chart-candlestick/chart-candlestick.component";
import {ChartDoughnutComponent} from "./quang-chart/chart-doughnut/chart-doughnut.component";
import {ChartLineComponent} from "./quang-chart/chart-line/chart-line.component";
import {ChartPieComponent} from "./quang-chart/chart-pie/chart-pie.component";
import {ChartRadarComponent} from "./quang-chart/chart-radar/chart-radar.component";
import {ChartTreemapComponent} from "./quang-chart/chart-treemap/chart-treemap.component";
import * as echarts from 'echarts';
import {NgxEchartsModule} from "ngx-echarts";
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

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
    CommonModule,
    TranslateModule,
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
export class QuangChartModule {
}
