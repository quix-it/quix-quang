import { Component } from '@angular/core'

import { of } from 'rxjs'
import { delay, take } from 'rxjs/operators'

@Component({
  selector: 'ks-infinity-scroll',
  templateUrl: './infinity-scroll.component.html',
  styles: []
})
export class InfinityScrollComponent {
  cards: number[] = [1, 2, 3, 4, 5, 6]
  stop: boolean = false

  onScroll(): void {
    this.stop = true
    of('')
      .pipe(delay(500), take(1))
      .subscribe(() => {
        this.cards = this.cards.concat([
          this.cards.length + 1,
          this.cards.length + 2,
          this.cards.length + 3,
          this.cards.length + 4,
          this.cards.length + 5,
          this.cards.length + 6
        ])
        this.stop = false
      })
  }
}
