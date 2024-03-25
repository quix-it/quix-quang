import { NgModule } from '@angular/core'

import { NgxWebstorageModule } from 'ngx-webstorage'

import { QuangDeviceMotionService } from './device-motion/device-motion.service'
import { QuangDeviceService } from './device/device.service'
import { QuangLayoutService } from './layout/layout.service'
import { QuangPageService } from './page/page.service'
import { QuangStorageService } from './storage-service/storage.service'
import { QuangValidatorsService } from './validators/validators.service'

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
