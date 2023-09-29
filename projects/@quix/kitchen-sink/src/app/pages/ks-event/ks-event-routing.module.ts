import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { BusComponent } from './bus/bus.component'
import { SourceComponent } from './source/source.component'
import { QuangWebsocketComponent } from './websocket/quang-websocket.component'

const routes: Routes = [
  { path: 'bus', component: BusComponent },
  { path: 'source', component: SourceComponent },
  { path: 'websocket', component: QuangWebsocketComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KsEventRoutingModule {}
