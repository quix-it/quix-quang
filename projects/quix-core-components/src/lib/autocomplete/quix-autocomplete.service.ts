import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuixAutocompleteAsyncService {
  constructor(
    private http: HttpClient
  ) {
  }
  getRestList(baseUrl: string, url: string, param: string) {
    if(param){
    return this.http.get(baseUrl + url + '/' + param)
    } else {
      return this.http.get(baseUrl + url)
    }
  }
  getList(baseUrl: string, url: string, param: string, paramId: string) {
    const urlParam = {params: new HttpParams().set(paramId, param)};
    return this.http.get(baseUrl + url, urlParam)
  }
}
