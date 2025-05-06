import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'components',
    loadChildren: () => import('./pages/components-test-pages/components-test-pages.routes'),
  },
  {
    path: 'overlay',
    loadChildren: () => import('./pages/overlay-test-pages/overlay-test-pages.routes'),
  },
  {
    path: '',
    redirectTo: 'components',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'components',
  },
]
