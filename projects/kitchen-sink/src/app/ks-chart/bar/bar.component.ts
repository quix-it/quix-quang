import { Component } from '@angular/core'
import { ChartArea } from '../../../../../@quix/quang/chart/src/lib/chart-area/chart-area.model'

@Component({
  selector: 'ks-bar',
  templateUrl: './bar.component.html',
  styles: []
})
export class BarComponent {
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
