import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthConfigComponent } from './auth-config/auth-config.component'
import { AuthDirectiveComponent } from './auth-directive/auth-directive.component'
import { AuthGuardComponent } from './auth-guard/auth-guard.component'
import { AuthSelectorComponent } from './auth-selector/auth-selector.component'

const routes: Routes = [
  { path: 'config', component: AuthConfigComponent },
  { path: 'directive', component: AuthDirectiveComponent },
  { path: 'selector', component: AuthSelectorComponent },
  { path: 'guard', component: AuthGuardComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KsAuthRoutingModule {}
