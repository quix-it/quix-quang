import { Component } from '@angular/core'
import { ChartTree } from '../../../../../quang/components/chart/src/lib/chart-tree/chart-tree.model'

@Component({
  selector: 'ks-tree',
  templateUrl: './tree.component.html',
  styles: []
})
export class TreeComponent {
  data = [
    new ChartTree('root', false, [
      new ChartTree('lv-1', true, [], 1),
      new ChartTree('lv-1', true, [], 2),
      new ChartTree('lv-1', true, [
        new ChartTree('lv-2', true, [], 1),
        new ChartTree('lv-2', true, [], 2),
        new ChartTree('lv-2', true, [], 3)
      ])
    ])
  ]

  onCLick(e: any): void {
    alert(`${e.type} ${e.data.name} ${e.seriesName}`)
  }
}
