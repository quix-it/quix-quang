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
import { QuangCardsModule } from '../../../../@quix/quang/cards/src/lib/quang-cards.module'
import { DeviceComponent } from './device/device.component'
import { DeviceMotionComponent } from './device-motion/device-motion.component'
import { QuangInputDateModule } from '../../../../@quix/quang/components/input-date/src/input-date.module'
import { QuangInputFileModule } from '../../../../@quix/quang/components/input-file/src/input-file.module'
import { QuangInputTextModule } from '../../../../@quix/quang/components/input-text/src/input-text.module'

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
    QuangCardsModule,
    QuangInputDateModule,
    QuangInputFileModule,
    QuangInputTextModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'utility' }]
})
export class KsUtilityModule {}
