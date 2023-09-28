import { Component } from '@angular/core'
import { ChartDoughnut } from '../../../../../@quix/quang/chart/src/lib/chart-doughnut/chart-doughnut.model'

@Component({
  selector: 'ks-doughnut',
  templateUrl: './doughnut.component.html',
  styles: []
})
export class DoughnutComponent {
  config: string[] = []
  data = [
    new ChartDoughnut(335, 'uno'),
    new ChartDoughnut(310, 'due'),
    new ChartDoughnut(234, 'tre'),
    new ChartDoughnut(135, 'quattro'),
    new ChartDoughnut(1548, 'cinque')
  ]

  onCLick(e: any): void {
    alert(`${e.type} ${e.data.name} ${e.data.value} ${e.seriesName}`)
  }
}
