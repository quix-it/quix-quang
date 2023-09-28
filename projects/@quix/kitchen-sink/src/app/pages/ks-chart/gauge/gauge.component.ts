import { Component } from '@angular/core'
import { ChartGauge } from '@quix/quang/components/chart'

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
