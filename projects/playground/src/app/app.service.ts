import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class AppService {
  http = inject(HttpClient)

  testHttpGet(): any {
    this.http.get('https://httpbin.org/get').subscribe(() => {})
  }

  testHttpUnauthorized(): any {
    this.http.get('https://httpbin.org/status/401').subscribe(() => {})
  }
}
