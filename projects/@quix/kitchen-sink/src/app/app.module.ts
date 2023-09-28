import { registerLocaleData } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import localeitIT from '@angular/common/locales/it'
import { LOCALE_ID, NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { defineLocale, enGbLocale, itLocale } from 'ngx-bootstrap/chronos'

import {
  QuangCardsModule,
  QuangMapModule,
  QuangMediaModule
} from '@quix/quang/components'
import {
  QuangDialogModule,
  QuangHttpErrorInterceptor,
  QuangLoaderInterceptor
} from '@quix/quang/dialog'
import { QuangKeycloakModule } from '@quix/quang/auth/keycloak'
import { QuangUtilityModule } from '@quix/quang/utility'

import { environment } from '../environments/environment'
import { AccessibilityModule } from './pages/accessibility/accessibility.module'
import { AppRoutingModule } from './app-routing.module'
import { appReducers } from './store/app.reducer'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { HomeComponent } from './pages/home/home.component'
import { SharedModule } from './shared/shared.module'
import { TranslocoRootModule } from './transloco/transloco-root.module'

registerLocaleData(localeitIT)

defineLocale('it', itLocale)
defineLocale('it-it', itLocale)
defineLocale('en-us', enGbLocale)
defineLocale('en', enGbLocale)
// function _window (): any {
//   return window
// }

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    HttpClientModule,
    TranslocoRootModule,
    QuangDialogModule,
    QuangCardsModule,
    QuangUtilityModule,
    SharedModule,
    ReactiveFormsModule,
    QuangMediaModule,
    QuangMapModule.forRoot({ googleKey: environment.googleKey }),
    QuangKeycloakModule,
    AccessibilityModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it-it' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: QuangLoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: QuangHttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
