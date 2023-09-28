import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { KsChartRoutingModule } from './ks-chart-routing.module'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { AreaComponent } from './area/area.component'

import { SharedModule } from '../shared/shared.module'
import { LineComponent } from './line/line.component'
import { BarComponent } from './bar/bar.component'
import { PieComponent } from './pie/pie.component'
import { DoughnutComponent } from './doughnut/doughnut.component'
import { RadarComponent } from './radar/radar.component'
import { TreemapComponent } from './treemap/treemap.component'
import { CandlestickComponent } from './candlestick/candlestick.component'
import { GaugeComponent } from './gauge/gauge.component'
import { TreeComponent } from './tree/tree.component'
import { QuangChartModule } from '../../../../@quix/quang/chart/src/lib/quang-chart.module'
import { QuangCardsModule } from '../../../../@quix/quang/cards/src/lib/quang-cards.module'

@NgModule({
  declarations: [
    AreaComponent,
    LineComponent,
    BarComponent,
    PieComponent,
    DoughnutComponent,
    RadarComponent,
    TreemapComponent,
    CandlestickComponent,
    GaugeComponent,
    TreeComponent
  ],
  imports: [
    CommonModule,
    KsChartRoutingModule,
    QuangCardsModule,
    TranslocoModule,
    SharedModule,
    QuangChartModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'chart' }]
})
export class KsChartModule {}
