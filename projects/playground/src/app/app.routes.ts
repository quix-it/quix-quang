import { Routes } from '@angular/router'

import { DataHandlingComponent } from './pages/data-handling/data-handling.component'
import { HomeComponent } from './pages/home/home.component'

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
    path: 'auth',
    loadChildren: () => import('./pages/auth-test-pages/auth-test-pages.routes'),
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'data-handling',
    component: DataHandlingComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]
