import { NgModule } from '@angular/core'
import { QuangStorageService } from './quang-storage-service/quang-storage.service'
import { NgxWebstorageModule } from 'ngx-webstorage'
import { QuangValidatorsService } from './quang-validators/quang-validators.service'
import { QuangLayoutService } from './quang-layout/quang-layout.service'
import { QuangDeviceMotionService } from './device-motion/device-motion.service'
import { QuangPageService } from './page/page.service'
import { QuangDeviceService } from './device/device.service'

@NgModule({
  declarations: [],
  imports: [NgxWebstorageModule.forRoot()],
  providers: [
    QuangStorageService,
    QuangValidatorsService,
    QuangLayoutService,
    QuangDeviceMotionService,
    QuangPageService,
    QuangDeviceService
  ],
  exports: []
})
export class QuangUtilityModule {}
