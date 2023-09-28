import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ControlComponent } from './control/control.component'
import { GroupComponent } from './group/group.component'
import { ArrayComponent } from './array/array.component'
import { ArrayArrayComponent } from './array-array/array-array.component'
import { ArrayGroupComponent } from './array-group/array-group.component'
import { GroupArrayComponent } from './group-array/group-array.component'
import { GroupGroupComponent } from './group-group/group-group.component'
import { SyncValidatorComponent } from './sync-validator/sync-validator.component'
import { AsyncValidatorComponent } from './async-validator/async-validator.component'

const routes: Routes = [
  { path: 'control', component: ControlComponent },
  { path: 'group', component: GroupComponent },
  { path: 'group-array', component: GroupArrayComponent },
  { path: 'group-group', component: GroupGroupComponent },
  { path: 'array', component: ArrayComponent },
  { path: 'array-array', component: ArrayArrayComponent },
  { path: 'array-group', component: ArrayGroupComponent },
  { path: 'sync-validator', component: SyncValidatorComponent },
  { path: 'async-validator', component: AsyncValidatorComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingFormRoutingModule {}
