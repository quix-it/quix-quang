import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'components-test',
    loadChildren: () => import('./pages/components-test-page/input-test-page.routes'),
  },
  {
    path: '',
    redirectTo: 'components-test',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'components-test',
  },
]
