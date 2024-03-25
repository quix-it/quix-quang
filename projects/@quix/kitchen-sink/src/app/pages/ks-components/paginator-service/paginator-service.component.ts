import { Component } from '@angular/core'

import { QuangPaginatorService } from '@quix/quang/components/paginator'

@Component({
  selector: 'ks-paginator-service',
  templateUrl: './paginator-service.component.html',
  styles: []
})
export class PaginatorServiceComponent {
  size = 10
  page = 0
  sizeList = [10, 15, 25, 50]
  all = Array(100)
    .fill('')
    .map((v, i) => ({ value: i, text: `Item${i}` }))

  list = this.paginatorService.getPage(this.all, this.page, this.size)

  constructor(private readonly paginatorService: QuangPaginatorService) {}

  pageChange(p: number): void {
    this.page = p
    this.makePage()
  }

  sizeChange(s: number): void {
    this.size = s
    this.makePage()
  }

  makePage(): void {
    this.list = this.paginatorService.getPage(this.all, this.page, this.size)
  }
}
