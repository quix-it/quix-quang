import { Component } from '@angular/core'
import { ChartCandlestick } from '../../../../../quang/components/chart/src/lib/chart-candlestick/chart-candlestick.model'

@Component({
  selector: 'ks-candlestick',
  templateUrl: './candlestick.component.html',
  styles: []
})
export class CandlestickComponent {
  config: string[] = []
  data = new ChartCandlestick(
    ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27'],
    [
      [20, 34, 10, 38],
      [40, 35, 30, 50],
      [1, 10, 30, 50],
      [40, 35, 30, 50]
    ]
  )

  onCLick(e: any): void {
    alert(`${e.type} ${e.data} ${e.seriesName}`)
  }
}
