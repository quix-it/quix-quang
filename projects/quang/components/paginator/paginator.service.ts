import { Injectable } from '@angular/core'

@Injectable()
export class QuangPaginatorService {
  // Returns the portion of the list given the page and the number of items per page
  getPage<T>(list: readonly T[], pageNumber: number, pageSize: number): T[] {
    const start = pageNumber * pageSize
    const end = (pageNumber + 1) * pageSize
    return list.slice(start, end)
  }
}
