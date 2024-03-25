import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { QuangKeycloakModule } from '@quix/quang/auth/keycloak'
import { QuangCardsModule } from '@quix/quang/components/cards'
import { QuangMapModule } from '@quix/quang/components/map'
import { QuangMediaModule } from '@quix/quang/components/media'
import { QuangDialogModule, QuangHttpErrorInterceptor, QuangLoaderInterceptor } from '@quix/quang/dialog'
import { QuangUtilityModule } from '@quix/quang/utility'

import { AppRoutingModule } from './app-routing.module'
import { CoreModule } from './core/core.module'
import { AccessibilityModule } from './pages/accessibility/accessibility.module'
import { SharedModule } from './shared/shared.module'
import { TranslocoRootModule } from './transloco/transloco-root.module'

import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'

import { EffectsModule } from '@ngrx/effects'

import { environment } from '../environments/environment'
import { appReducers } from './store/app.reducer'

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
