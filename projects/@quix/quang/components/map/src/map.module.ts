import { ModuleWithProviders, NgModule } from '@angular/core'
import { QuangGoogleMapComponent } from './google-map/google-map.component'
import { CommonModule } from '@angular/common'
import { QuangMapConfig } from './map.config'
import { QuangOpenStreetMapComponent } from './osmap/osmap.component'
import { QuangGoogleMapService } from './google-map/google-map.service'

@NgModule({
  declarations: [
    QuangGoogleMapComponent,
    QuangOpenStreetMapComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [QuangGoogleMapService],
  exports: [
    QuangGoogleMapComponent,
    QuangOpenStreetMapComponent
  ]
})
export class QuangMapModule {
  static forRoot (config?: QuangMapConfig): ModuleWithProviders<QuangMapModule> {
    return {
      ngModule: QuangMapModule,
      providers: [
        { provide: QuangMapConfig, useValue: config }
      ]
    }
  }
}
