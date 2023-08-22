import { Component } from '@angular/core'

@Component({
  selector: 'ks-paginator',
  templateUrl: './paginator.component.html',
  styles: []
})
export class PaginatorComponent {
  size = 10
  page = 1
  sizeList = [5, 10, 15, 25, 50]
  list = Array(100).map((v, i) => ({ value: i, text: `Item${i}` }))

  pageChange (p: number): void {
    this.page = p
  }

  sizeChange (s: number): void {
    this.size = s
  }
}
