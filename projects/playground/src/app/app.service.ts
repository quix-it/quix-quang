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
}
