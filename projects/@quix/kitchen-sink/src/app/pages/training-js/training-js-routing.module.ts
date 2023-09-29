import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { TrainingArrayComponent } from './training-array/training-array.component'
import { TrainingMapComponent } from './training-map/training-map.component'

const routes: Routes = [
  { path: 'array', component: TrainingArrayComponent },
  { path: 'map', component: TrainingMapComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingJsRoutingModule {}
