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
    path: 'device',
    loadComponent: () => import('./pages/device/device.component').then((m) => m.DeviceComponent),
  },
  {
    path: 'form',
    loadComponent: () => import('./pages/form/form.component').then((m) => m.FormComponent),
  },
  {
    path: 'network',
    loadComponent: () => import('./pages/network/network.component').then((m) => m.NetworkComponent),
  },
  {
    path: 'translation',
    loadComponent: () => import('./pages/translation/translation.component').then((m) => m.TranslationComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]
