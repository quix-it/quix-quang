import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'

import { QuangCardsModule } from '@quix/quang/components/cards'

import { SharedModule } from '../../shared/shared.module'
import { BusComponent } from './bus/bus.component'
import { KsEventRoutingModule } from './ks-event-routing.module'
import { SourceComponent } from './source/source.component'
import { QuangWebsocketComponent } from './websocket/quang-websocket.component'

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
