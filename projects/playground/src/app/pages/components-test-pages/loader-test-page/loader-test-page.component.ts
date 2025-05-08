import { HttpClient } from '@angular/common/http'
import { Component, inject } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { delay, firstValueFrom } from 'rxjs'

import { AppService } from '../../../app.service'

@Component({
  selector: 'playground-loader-test-page',
  imports: [AngularSvgIconModule, TranslocoPipe],
  templateUrl: './loader-test-page.component.html',
  styleUrl: './loader-test-page.component.scss',
})
export class LoaderTestPageComponent {
  private readonly http = inject(HttpClient)
  private readonly appService = inject(AppService)

  async showLoader() {
    for (let i = 0; i < 20; i++) {
      const x = await firstValueFrom(this.http.get('https://jsonplaceholder.typicode.com/todos/1').pipe(delay(300)))
      console.log('call', x)
    }
  }

  testApiCall(): void {
    this.appService.testHttpGet()
  }

  testUnauthorized(): void {
    this.appService.testHttpUnauthorized()
  }
}
