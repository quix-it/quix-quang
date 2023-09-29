import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'


import { SharedModule } from '../../shared/shared.module'
import { GoogleComponent } from './google/google.component'
import { KsMapRoutingModule } from './ks-map-routing.module'
import { OsComponent } from './os/os.component'
import { QuangCardsModule } from '@quix/quang/components/cards'
import { QuangMapModule } from '@quix/quang/components/map'

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
