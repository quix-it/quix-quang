import { NgModule } from '@angular/core'
import { QuangStorageService } from './storage-service/storage.service'
import { NgxWebstorageModule } from 'ngx-webstorage'
import { QuangValidatorsService } from './validators/validators.service'
import { QuangLayoutService } from './layout/layout.service'
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
