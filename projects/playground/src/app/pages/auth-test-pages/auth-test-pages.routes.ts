import { Routes } from '@angular/router'

import { AuthTestComponent } from './auth-test/auth-test.component'

const routes: Routes = [
  {
    path: 'auth',
    component: AuthTestComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
]

export default routes
