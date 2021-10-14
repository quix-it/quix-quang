import { NgModule } from '@angular/core'
import * as echarts from 'echarts'
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
import { TranslocoModule } from '@ngneat/transloco'
import { ChartGauge } from './chart-gauge/chart-gauge.model'
import { ChartGaugeComponent } from './chart-gauge/chart-gauge.component'
import { ChartTreeComponent } from './chart-tree/chart-tree.component'

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
  imports: [
    NgxEchartsModule.forRoot({ echarts }),
    CommonModule,
    TranslocoModule
  ],
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
export class QuangChartModule { }
