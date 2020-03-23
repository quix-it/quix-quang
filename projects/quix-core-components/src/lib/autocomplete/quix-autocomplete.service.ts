import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class QuixAutocompleteAsyncService {
  constructor(
    private http: HttpClient
  ) {
  }
  getRestList(baseUrl: string, url: string, param: string) {
    return this.http.get(baseUrl + url + '/' + param)
  }
  getList(baseUrl: string, url: string, param: string, paramId: string) {
    const urlParam = {params: new HttpParams().set(paramId, param)};
    return this.http.get(baseUrl + url, urlParam)
  }
}
