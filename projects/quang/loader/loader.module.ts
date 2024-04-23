import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ModuleWithProviders, NgModule } from '@angular/core'

import { QuangLoaderInterceptor } from './loader-interceptor.service'
import { QuangLoaderService } from './loader.service'

let forRootInstances = 0

@NgModule({})
export class QuangLoaderModule {
  static forRoot(): ModuleWithProviders<QuangLoaderModule> {
    forRootInstances++
    if (forRootInstances > 1) {
      throw new Error(
        'QuangLoaderModule.forRoot() called multiple times. import it in the AppModule or CoreModule once only.'
      )
    }
    return {
      ngModule: QuangLoaderModule,
      providers: [
        QuangLoaderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: QuangLoaderInterceptor,
          multi: true
        }
      ]
    }
  }
}
