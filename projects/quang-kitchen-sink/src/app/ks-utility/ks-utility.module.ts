import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { KsUtilityRoutingModule } from './ks-utility-routing.module'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { LayoutComponent } from './layout/layout.component'
import { StorageComponent } from './storage/storage.component'
import { ValidationComponent } from './validation/validation.component'
import { SharedModule } from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'
import { PageComponent } from './page/page.component'
import { QuangDateModule } from '../../../../quang-date/src/lib/quang-date.module'
import { QuangComponentsModule } from '../../../../quang-components/src/lib/quang-components.module'
import { QuangCardsModule } from '../../../../quang-cards/src/lib/quang-cards.module'
import { DeviceComponent } from './device/device.component'
import { DeviceMotionComponent } from './device-motion/device-motion.component'

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
    SharedModule,
    QuangCardsModule,
    TranslocoModule,
    ReactiveFormsModule,
    QuangDateModule,
    QuangComponentsModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'utility' }]
})
export class KsUtilityModule {}
