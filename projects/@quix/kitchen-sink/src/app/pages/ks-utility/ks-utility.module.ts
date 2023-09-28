import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'

import {
  QuangCardsModule,
  QuangInputDateModule,
  QuangInputFileModule,
  QuangInputTextModule
} from '@quix/quang/components'

import { SharedModule } from '../../shared/shared.module'
import { DeviceMotionComponent } from './device-motion/device-motion.component'
import { DeviceComponent } from './device/device.component'
import { KsUtilityRoutingModule } from './ks-utility-routing.module'
import { LayoutComponent } from './layout/layout.component'
import { PageComponent } from './page/page.component'
import { StorageComponent } from './storage/storage.component'
import { ValidationComponent } from './validation/validation.component'

@NgModule({
  declarations: [
    LayoutComponent,
    StorageComponent,
    ValidationComponent,
    PageComponent,
    DeviceComponent,
    DeviceMotionComponent
  ],
  imports: [
    CommonModule,
    KsUtilityRoutingModule,
    TranslocoModule,
    ReactiveFormsModule,
    SharedModule,
    QuangCardsModule,
    QuangCardsModule,
    QuangInputDateModule,
    QuangInputFileModule,
    QuangInputTextModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'utility' }]
})
export class KsUtilityModule {}
