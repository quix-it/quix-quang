import {NgModule} from "@angular/core";
import {GoogleMapComponent} from "./quang-map/google-map/google-map.component";
import {GoogleMapService} from "./quang-map/google-map/google-map.service";
import {OSMapComponent} from "./quang-map/osmap/osmap.component";
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    GoogleMapComponent,
    OSMapComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  providers: [GoogleMapService],
  exports: [
    GoogleMapComponent,
    OSMapComponent
  ],
})
export class QuangMapModule {
}
