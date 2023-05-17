import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { KsMapRoutingModule } from './ks-map-routing.module'
import { GoogleComponent } from './google/google.component'
import { OsComponent } from './os/os.component'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { SharedModule } from '../shared/shared.module'
import { QuangCardsModule } from '../../../../quang-cards/src/lib/quang-cards.module'
import { QuangMapModule } from '../../../../quang-map/src/lib/quang-map.module'

@NgModule({
  declarations: [GoogleComponent, OsComponent],
  imports: [
    CommonModule,
    KsMapRoutingModule,
    QuangCardsModule,
    TranslocoModule,
    SharedModule,
    QuangMapModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'map' }]
})
export class KsMapModule {}
