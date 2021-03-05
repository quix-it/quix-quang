import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuixPaginatorService {

  constructor() {
  }

  getPage(list: Array<any>, pageNumber: number, pageSize: number) {
    const start = pageNumber * pageSize;
    const end = (pageNumber + 1) * pageSize;
    return list.slice(start, end)
  }
}
