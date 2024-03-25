import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ForComponent } from './for/for.component'
import { IntersectionComponent } from './intersection/intersection.component'
import { ScrollComponent } from './scroll/scroll.component'

const routes: Routes = [
  { path: 'for', component: ForComponent },
  { path: 'scroll', component: ScrollComponent },
  { path: 'intersection', component: IntersectionComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingScrollRoutingModule {}
