import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class QuixPaginatorService {

  constructor () {
  }

  /**
   * Returns the portion of the list given the page and the number of items per page
   * @param list
   * @param pageNumber
   * @param pageSize
   */
  getPage (list: Array<any>, pageNumber: number, pageSize: number): Array<any> {
    const start = pageNumber * pageSize
    const end = (pageNumber + 1) * pageSize
    return list.slice(start, end)
  }
}
