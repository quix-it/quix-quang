import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PlanetsComponent } from './planets/planets.component'
import { StarshipsComponent } from './starships/starships.component'

const routes: Routes = [
  { path: 'starships', component: StarshipsComponent },
  { path: 'planets', component: PlanetsComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingStateRoutingModule {}
