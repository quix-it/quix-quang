import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'

@Component({
  selector: 'ks-http-error',
  templateUrl: './http-error.component.html',
  styles: []
})
export class HttpErrorComponent {
  constructor(private readonly http: HttpClient) {}

  call(): void {
    this.http.get('test/test').subscribe()
  }
}
