import { Injectable } from '@angular/core'
/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for paginator management
 */
export class QuixPaginatorService {

  /**
   * Returns the portion of the list given the page and the number of items per page
   * @param list list to be paged
   * @param pageNumber page number
   * @param pageSize page size
   */
  getPage (list: Array<any>, pageNumber: number, pageSize: number): Array<any> {
    const start = pageNumber * pageSize
    const end = (pageNumber + 1) * pageSize
    return list.slice(start, end)
  }
}
