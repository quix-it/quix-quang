import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { QuangEventSourceService } from './source/event-source.service'
import { QuangEventBusService } from './bus/event-bus.service'
import { QuangWebsocketService } from './websocket/websocket.service'

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
