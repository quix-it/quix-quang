import { ModuleWithProviders, NgModule } from '@angular/core'
import { GoogleMapComponent } from './google-map/google-map.component'
import { CommonModule } from '@angular/common'
import { OSMapComponent } from './osmap/osmap.component'
import { GoogleMapService } from './google-map/google-map.service'
import { QuangMapConfig } from './quang-map.config'

@NgModule({
  declarations: [
    GoogleMapComponent,
    OSMapComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [GoogleMapService],
  exports: [
    GoogleMapComponent,
    OSMapComponent
  ],
})
export class QuangMapModule {
  static forRoot (config?: QuangMapConfig): ModuleWithProviders {
    return {
      ngModule: QuangMapModule,
      providers: [
        { provide: QuangMapConfig, useValue: config }
      ]
    }
  }
}
