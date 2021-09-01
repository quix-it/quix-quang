import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { QuixEventSourceService } from './event-source/event-source.service'
import { QuixEventBusService } from './event-bus/quix-event-bus.service'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    QuixEventSourceService,
    QuixEventBusService
  ]
})
export class QuangEventModule { }
