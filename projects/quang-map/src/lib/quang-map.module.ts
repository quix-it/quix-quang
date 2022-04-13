import { ModuleWithProviders, NgModule } from '@angular/core'
import { GoogleMapComponent } from './google-map/google-map.component'
import { CommonModule } from '@angular/common'
import { QuangMapConfig } from './quang-map.config'
import { OpenStreetMapComponent } from './osmap/osmap.component'
import { QuangGoogleMapService } from './google-map/google-map.service'

@NgModule({
  declarations: [
    GoogleMapComponent,
    OpenStreetMapComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [QuangGoogleMapService],
  exports: [
    GoogleMapComponent,
    OpenStreetMapComponent
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
