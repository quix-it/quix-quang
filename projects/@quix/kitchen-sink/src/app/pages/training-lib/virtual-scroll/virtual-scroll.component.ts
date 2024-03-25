import { Component } from '@angular/core'

@Component({
  selector: 'ks-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styles: []
})
export class VirtualScrollComponent {
  cards: number[] = Array.from({ length: 100000 }).map((_, i) => i)
}
