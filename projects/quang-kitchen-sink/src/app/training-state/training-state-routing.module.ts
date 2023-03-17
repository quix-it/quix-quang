import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { StarshipsComponent } from './starships/starships.component'
import { PlanetsComponent } from './planets/planets.component'

const routes: Routes = [
  { path: 'starships', component: StarshipsComponent },
  { path: 'planets', component: PlanetsComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingStateRoutingModule {}
