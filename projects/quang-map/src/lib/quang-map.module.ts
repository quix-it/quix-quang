import { ModuleWithProviders, NgModule } from '@angular/core'
import { GoogleMapComponent } from './google-map/google-map.component'
import { CommonModule } from '@angular/common'
import { QuangMapConfig } from './quang-map.config'
import { OpenStreetMapComponent } from './osmap/osmap.component'
import { QuixGoogleMapService } from './google-map/google-map.service'

@NgModule({
  declarations: [
    GoogleMapComponent,
    OpenStreetMapComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [QuixGoogleMapService],
  exports: [
    GoogleMapComponent,
    OpenStreetMapComponent
  ]
})
export class QuangMapModule {
  static forRoot (config?: QuangMapConfig): ModuleWithProviders<any> {
    return {
      ngModule: QuangMapModule,
      providers: [
        { provide: QuangMapConfig, useValue: config }
      ]
    }
  }
}
