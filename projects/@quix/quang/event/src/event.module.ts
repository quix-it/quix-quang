import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { QuangEventBusService } from './bus/event-bus.service'
import { QuangEventSourceService } from './source/event-source.service'
import { QuangWebsocketService } from './websocket/websocket.service'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [QuangEventSourceService, QuangEventBusService, QuangWebsocketService]
})
export class QuangEventModule {}
