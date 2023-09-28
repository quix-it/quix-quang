import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { KsEventRoutingModule } from './ks-event-routing.module'
import { BusComponent } from './bus/bus.component'
import { SourceComponent } from './source/source.component'
import { SharedModule } from '../shared/shared.module'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { QuangCardsModule } from '../../../../quang/components/cards/src/lib/quang-cards.module'
import { QuangWebsocketComponent } from './websocket/quang-websocket.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [BusComponent, SourceComponent, QuangWebsocketComponent],
  imports: [
    CommonModule,
    KsEventRoutingModule,
    SharedModule,
    QuangCardsModule,
    TranslocoModule,
    FormsModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'event' }]
})
export class KsEventModule {}
