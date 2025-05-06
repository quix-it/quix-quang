import { Routes } from '@angular/router'

import { OverlayTestPagesComponent } from './overlay-test-pages.component'

const routes: Routes = [
  {
    path: 'tooltip',
    component: OverlayTestPagesComponent,
  },
  {
    path: '**',
    redirectTo: 'tooltip',
    pathMatch: 'full',
  },
]

export default routes
