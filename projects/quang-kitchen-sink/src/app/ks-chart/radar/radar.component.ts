import { Component } from '@angular/core'
import {
  ChartRadar,
  ChartRadarIndicator
} from '../../../../../quang-chart/src/lib/chart-radar/chart-radar.model'

@Component({
  selector: 'ks-radar',
  templateUrl: './radar.component.html',
  styles: []
})
export class RadarComponent {
  data: ChartRadar[] = [
    new ChartRadar([25, 33, 45, 68, 72], 'serie 1', '#debac0'),
    new ChartRadar([30, 40, 50, 70, 80], 'serie 2', '#f3c677')
  ]

  indicators: ChartRadarIndicator[] = [
    new ChartRadarIndicator('velocita', 100),
    new ChartRadarIndicator('precisione', 100),
    new ChartRadarIndicator('reazione', 100),
    new ChartRadarIndicator('agilità', 100),
    new ChartRadarIndicator('resistenza', 100)
  ]

  onCLick(e: any): void {
    alert(`${e.type} ${e.data.name} ${e.seriesName}`)
  }
}
