import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'components-test',
    loadComponent: () =>
      import('./pages/components-test-page/components-test-page.component').then((m) => m.ComponentsTestPageComponent)
  },
  {
    path: '',
    redirectTo: 'components-test',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'components-test'
  }
]
