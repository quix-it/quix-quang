import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { QuangEventSourceService } from './quang-event-source/quang-event-source.service'
import { QuangEventBusService } from './quang-event-bus/quang-event-bus.service'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    QuangEventSourceService,
    QuangEventBusService
  ]
})
export class QuangEventModule { }
