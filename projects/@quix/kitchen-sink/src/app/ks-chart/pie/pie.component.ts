import { Component } from '@angular/core'
import { ChartPie } from '../../../../../quang/components/chart/src/lib/chart-pie/chart-pie.model'

@Component({
  selector: 'ks-pie',
  templateUrl: './pie.component.html',
  styles: []
})
export class PieComponent {
  data = [
    new ChartPie(335, 'uno'),
    new ChartPie(310, 'due'),
    new ChartPie(234, 'tre'),
    new ChartPie(135, 'quattro'),
    new ChartPie(1548, 'cinque')
  ]

  onCLick(e: any): void {
    alert(`${e.type} ${e.data.name} ${e.data.value} ${e.seriesName}`)
  }
}
