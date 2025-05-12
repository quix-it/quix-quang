import { HttpClient } from '@angular/common/http'
import { Component, computed, inject, viewChild } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { delay, firstValueFrom } from 'rxjs'

import { AppService } from '../../../app.service'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'

@Component({
  selector: 'playground-loader-test-page',
  imports: [AngularSvgIconModule, TranslocoPipe, ComponentDocumentationComponent],
  templateUrl: './loader-test-page.component.html',
  styleUrl: './loader-test-page.component.scss',
})
export class LoaderTestPageComponent {
  protected LoaderTestPageComponent = LoaderTestPageComponent
  private readonly http = inject(HttpClient)
  private readonly appService = inject(AppService)
  private readonly testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      console.log('testComponent', document.getElementById('testComponent'))
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  componentsReadmePath = './assets/docs/loader.md'

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
