import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
/**
 * utility for autocomplete management
 */
export class QuixAutocompleteAsyncService {
  /**
   * constructor
   * @param http
   */
  constructor (
    private readonly http: HttpClient
  ) {
  }

  /**
   * Build the url based on the configurations and make an http call passing the search parameter in the url
   * @param baseUrl
   * @param url
   * @param param
   */
  getRestList (baseUrl: string, url: string, param: string) {
    if (param) {
      return this.http.get(`${baseUrl}${url}/${param}`)
    }
    return this.http.get(baseUrl + url)

  }

  /**
   * Build the url based on the configurations and make an http call passing the parameter as url parameters
   * @param baseUrl
   * @param url
   * @param param
   * @param paramId
   */
  getList (baseUrl: string, url: string, param: string, paramId: string) {
    const urlParam = { params: new HttpParams().set(paramId, param) }
    return this.http.get(`${baseUrl}${url}`, urlParam)
  }
}
