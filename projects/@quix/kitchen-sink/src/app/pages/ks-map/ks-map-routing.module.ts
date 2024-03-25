import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GoogleComponent } from './google/google.component'
import { OsComponent } from './os/os.component'

const routes: Routes = [
  { path: 'google', component: GoogleComponent },
  { path: 'os', component: OsComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KsMapRoutingModule {}
