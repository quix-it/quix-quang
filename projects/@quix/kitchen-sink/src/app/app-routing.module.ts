import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'js',
    loadChildren: async (): Promise<any> =>
      await import('./pages/training-js/training-js.module').then((m) => m.TrainingJsModule)
  },
  {
    path: 'form',
    loadChildren: async () =>
      await import('./pages/training-form/training-form.module').then((m) => m.TrainingFormModule)
  },
  {
    path: 'scroll',
    loadChildren: async () =>
      await import('./pages/training-scroll/training-scroll.module').then((m) => m.TrainingScrollModule)
  },
  {
    path: 'quang-cards',
    loadChildren: async () => await import('./pages/ks-cards/ks-cards.module').then((m) => m.KsCardsModule)
  },
  {
    path: 'quang-calendar',
    loadChildren: async () => await import('./pages/ks-calendar/ks-calendar.module').then((m) => m.KsCalendarModule)
  },
  {
    path: 'quang-chart',
    loadChildren: async () => await import('./pages/ks-chart/ks-chart.module').then((m) => m.KsChartModule)
  },
  {
    path: 'quang-components',
    loadChildren: async () =>
      await import('./pages/ks-components/ks-components.module').then((m) => m.KsComponentsModule)
  },
  {
    path: 'quang-date',
    loadChildren: async () => await import('./pages/ks-date/ks-date.module').then((m) => m.KsDateModule)
  },
  {
    path: 'lib',
    loadChildren: async () => await import('./pages/training-lib/training-lib.module').then((m) => m.TrainingLibModule)
  },
  {
    path: 'quang-dialog',
    loadChildren: async () => await import('./pages/ks-dialog/ks-dialog.module').then((m) => m.KsDialogModule)
  },
  {
    path: 'quang-utility',
    loadChildren: async () => await import('./pages/ks-utility/ks-utility.module').then((m) => m.KsUtilityModule)
  },
  {
    path: 'quang-image',
    loadChildren: async () => await import('./pages/ks-media/ks-media.module').then((m) => m.KsMediaModule)
  },
  {
    path: 'quang-map',
    loadChildren: async () => await import('./pages/ks-map/ks-map.module').then((m) => m.KsMapModule)
  },
  {
    path: 'quang-keycloak',
    loadChildren: async () => await import('./pages/ks-keycloak/ks-keycloak.module').then((m) => m.KsKeycloakModule)
  },
  {
    path: 'quang-event',
    loadChildren: async () => await import('./pages/ks-event/ks-event.module').then((m) => m.KsEventModule)
  },
  {
    path: 'ngrx',
    loadChildren: async () =>
      await import('./pages/training-state/training-state.module').then((m) => m.TrainingStateModule)
  },
  {
    path: 'quang-auth',
    loadChildren: async () => await import('./pages/ks-auth/ks-auth.module').then((m) => m.KsAuthModule)
  },
  {
    path: 'accessibility',
    loadChildren: async () =>
      await import('./pages/accessibility/accessibility.module').then((m) => m.AccessibilityModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
