import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { QuangEventSourceService } from './quang-event-source/quang-event-source.service'
import { QuangEventBusService } from './quang-event-bus/quang-event-bus.service'
import { QuangWebsocketService } from './quang-websocket/quang-websocket.service'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    QuangEventSourceService,
    QuangEventBusService,
    QuangWebsocketService
  ]
})
export class QuangEventModule { }
