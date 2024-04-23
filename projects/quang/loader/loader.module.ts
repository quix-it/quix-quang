import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ModuleWithProviders, NgModule } from '@angular/core'

import { EXCLUDED_URL, UrlData, quangLoaderInterceptor } from './loader-interceptor'

let forRootInstances = 0

@NgModule({
  imports: [],
  exports: []
})
export class QuangLoaderModule {
  static forRoot(urlData: UrlData[]): ModuleWithProviders<QuangLoaderModule> {
    forRootInstances++
    if (forRootInstances > 1) {
      throw new Error(
        'QuangLoaderModule.forRoot() called multiple times. import it in the AppModule or CoreModule once only.'
      )
    }
    return {
      ngModule: QuangLoaderModule,
      providers: [
        {
          provide: EXCLUDED_URL,
          useValue: urlData
        },
        provideHttpClient(withInterceptors([quangLoaderInterceptor]))
      ]
    }
  }
}
