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
import { QuangCardsModule } from '../../../../quang-cards/src/lib/quang-cards.module'
import { DeviceComponent } from './device/device.component'
import { DeviceMotionComponent } from './device-motion/device-motion.component'
import { InputDateModule } from 'projects/quang-components/input-date/public-api'
import { InputFileModule } from 'projects/quang-components/input-file/public-api'
import { InputTextModule } from '@quix/quang/components/input-text/src/public_api'

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
    InputDateModule,
    InputFileModule,
    InputTextModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'utility' }]
})
export class KsUtilityModule {}
