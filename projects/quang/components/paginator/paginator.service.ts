import { Injectable } from '@angular/core'

@Injectable()
export class QuangPaginatorService {
  // Returns the portion of the list given the page and the number of items per page
  getPage(list: any[], pageNumber: number, pageSize: number): any[] {
    const start = pageNumber * pageSize
    const end = (pageNumber + 1) * pageSize
    return list.slice(start, end)
  }
}
