import { Component } from '@angular/core'
import { ChartGauge } from '../../../../../quang/components/chart/src/lib/chart-gauge/chart-gauge.model'

@Component({
  selector: 'ks-gauge',
  templateUrl: './gauge.component.html',
  styles: []
})
export class GaugeComponent {
  data: ChartGauge = new ChartGauge('velocità', 200)

  onCLick(e: any): void {
    alert(`${e.type} ${e.data.value} ${e.seriesName}`)
  }
}
