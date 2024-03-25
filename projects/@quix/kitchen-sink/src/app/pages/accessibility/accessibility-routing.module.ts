import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { FormComponent } from './form/form.component'
import { MasterComponent } from './master/master.component'

const routes: Routes = [
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'master',
    component: MasterComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessibilityRoutingModule {}
