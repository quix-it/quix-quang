import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

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

const routes: Routes = [
  { path: 'area', component: AreaComponent },
  { path: 'bar', component: BarComponent },
  { path: 'line', component: LineComponent },
  { path: 'pie', component: PieComponent },
  { path: 'doughnut', component: DoughnutComponent },
  { path: 'radar', component: RadarComponent },
  { path: 'candlestick', component: CandlestickComponent },
  { path: 'treemap', component: TreemapComponent },
  { path: 'gauge', component: GaugeComponent },
  { path: 'tree', component: TreeComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KsChartRoutingModule {}
