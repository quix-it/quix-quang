import { Component } from '@angular/core'
import { ChartArea } from '../../../../../quang-chart/src/lib/chart-area/chart-area.model'

@Component({
  selector: 'ks-area',
  templateUrl: './area.component.html',
  styles: []
})
export class AreaComponent {
  data = new ChartArea(
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [
      [820, 932, 901, 934, 1290, 1330, 1320],
      [82, 93, 90, 93, 129, 133, 132]
    ]
  )

  onCLick(e: any): void {
    alert(`${e.type} ${e.data} ${e.seriesName}`)
  }
}
