import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'components',
    loadChildren: () => import('./pages/components-test-pages/components-test-pages.routes').then((m) => m.default),
  },
  {
    path: 'overlay',
    loadChildren: () => import('./pages/overlay-test-pages/overlay-test-pages.routes').then((m) => m.default),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth-test-pages/auth-test-pages.routes').then((m) => m.default),
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'data-handling',
    loadComponent: () => import('./pages/data-handling/data-handling.component').then((m) => m.DataHandlingComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]
