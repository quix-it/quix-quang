import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'ks-loader',
  templateUrl: './loader.component.html',
  styles: []
})
export class LoaderComponent {
  constructor (
    private readonly http: HttpClient
  ) {}

  call (): void {
    this.http.get('https://picsum.photos/2000/2000').subscribe()
  }

}
