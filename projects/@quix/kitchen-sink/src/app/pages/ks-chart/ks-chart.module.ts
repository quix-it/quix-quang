import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'

import { QuangCardsModule } from '@quix/quang/components/cards'
import { QuangChartModule } from '@quix/quang/components/chart'

import { SharedModule } from '../../shared/shared.module'
import { KsChartRoutingModule } from './ks-chart-routing.module'

import { AreaComponent } from './area/area.component'
import { BarComponent } from './bar/bar.component'
import { CandlestickComponent } from './candlestick/candlestick.component'
import { DoughnutComponent } from './doughnut/doughnut.component'
import { GaugeComponent } from './gauge/gauge.component'
import { LineComponent } from './line/line.component'
import { PieComponent } from './pie/pie.component'
import { RadarComponent } from './radar/radar.component'
import { TreeComponent } from './tree/tree.component'
import { TreemapComponent } from './treemap/treemap.component'

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
  imports: [CommonModule, KsChartRoutingModule, QuangCardsModule, TranslocoModule, SharedModule, QuangChartModule],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'chart' }]
})
export class KsChartModule {}
