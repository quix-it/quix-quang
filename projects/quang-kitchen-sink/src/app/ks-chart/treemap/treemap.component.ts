import { Component } from '@angular/core'
import { ChartTreemap } from '../../../../../quang/chart/src/lib/chart-treemap/chart-treemap.model'

@Component({
  selector: 'ks-treemap',
  templateUrl: './treemap.component.html',
  styles: []
})
export class TreemapComponent {
  config: string[] = []
  data = [
    new ChartTreemap('spazio', 10, '#3e885b'),
    new ChartTreemap('mente', 10, '#debac0'),
    new ChartTreemap('realtà', 10, '#f3c677'),
    new ChartTreemap('potere', 10, '#66c3ff'),
    new ChartTreemap('tempo', 10, '#dd7230')
  ]

  onCLick(e: any): void {
    alert(`${e.type} ${e.data.name} ${e.seriesName}`)
  }
}
