import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ConfigComponent } from './config/config.component'
import { DirectiveComponent } from './directive/directive.component'
import { SelectorComponent } from './selector/selector.component'
import { GuardComponent } from './guard/guard.component'

const routes: Routes = [
  { path: 'config', component: ConfigComponent },
  { path: 'directive', component: DirectiveComponent },
  { path: 'selector', component: SelectorComponent },
  { path: 'guard', component: GuardComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KsKeycloakRoutingModule {}
