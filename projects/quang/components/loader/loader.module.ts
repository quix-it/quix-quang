import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule, Provider } from '@angular/core'

import { QuangLoaderService } from './loader.service'

let forRootInstances = 0

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [QuangLoaderService]
})
export class QuangLoaderModule {
  // providers: Provider[] = []
  // static forRoot(): ModuleWithProviders<QuangLoaderModule> {
  //   if (forRootInstances > 0) {
  //     throw new Error(
  //       'QuangLoaderModule.forRoot() called multiple times. import it in the AppModule or CoreModule once only.'
  //     )
  //   }
  //   return {
  //     ngModule: QuangLoaderModule,
  //     providers: [QuangLoaderService]
  //   }
  // }
}
