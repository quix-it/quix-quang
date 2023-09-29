import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TranslocoModule } from '@ngneat/transloco'
import * as echarts from 'echarts'
import { NgxEchartsModule } from 'ngx-echarts'

import { ChartAreaComponent } from './chart-area/chart-area.component'
import { ChartBarComponent } from './chart-bar/chart-bar.component'
import { ChartCandlestickComponent } from './chart-candlestick/chart-candlestick.component'
import { ChartDoughnutComponent } from './chart-doughnut/chart-doughnut.component'
import { ChartGaugeComponent } from './chart-gauge/chart-gauge.component'
import { ChartLineComponent } from './chart-line/chart-line.component'
import { ChartPieComponent } from './chart-pie/chart-pie.component'
import { ChartRadarComponent } from './chart-radar/chart-radar.component'
import { ChartTreeComponent } from './chart-tree/chart-tree.component'
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
    ChartTreemapComponent,
    ChartGaugeComponent,
    ChartTreeComponent
  ],
  imports: [NgxEchartsModule.forRoot({ echarts }), CommonModule, TranslocoModule],
  exports: [
    ChartAreaComponent,
    ChartBarComponent,
    ChartCandlestickComponent,
    ChartDoughnutComponent,
    ChartLineComponent,
    ChartPieComponent,
    ChartRadarComponent,
    ChartTreemapComponent,
    ChartGaugeComponent,
    ChartTreeComponent
  ]
})
export class QuangChartModule {}
