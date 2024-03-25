import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for autocomplete management
 */
export class QuixAutocompleteAsyncService {
  /**
   * constructor
   * @param http http utility
   */
  constructor (
    private readonly http: HttpClient
  ) {
  }

  /**
   * Build the url based on the configurations and make an http call passing the search parameter in the url
   * @param baseUrl prject base url
   * @param url api url
   * @param param api params
   */
  getRestList (baseUrl: string, url: string, param: string): Observable<any> {
    if (param) {
      return this.http.get(`${baseUrl}${url}/${param}`)
    }
    return this.http.get(baseUrl + url)
  }

  /**
   * Build the url based on the configurations and make an http call passing the parameter as url parameters
   * @param baseUrl project base url
   * @param url api url
   * @param param api param value
   * @param paramId api param name
   */
  getList (baseUrl: string, url: string, param: string, paramId: string): Observable<any> {
    const urlParam = { params: new HttpParams().set(paramId, param) }
    return this.http.get(`${baseUrl}${url}`, urlParam)
  }
}
