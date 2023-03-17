import { Component } from '@angular/core'

@Component({
  selector: 'ks-for',
  templateUrl: './for.component.html',
  styles: []
})
export class ForComponent {
  items: Array<{ id: number; value: string }> = Array(10)
    .fill('')
    .map((e, i) => ({ id: i, value: `Value${i}` }))

  objects: { id: number; text: string } = Array(10)
    .fill('')
    .reduce((o, e, i) => {
      o[i] = { id: i, text: `Value${i}` }
      return o
    }, {})

  trackItem(index: number, item: { id: number; value: string }): number {
    return item.id
  }
}
