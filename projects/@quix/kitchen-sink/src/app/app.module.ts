import { LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { appReducers } from './app-store/app.reducers'
import { StoreModule } from '@ngrx/store'
import { environment } from '../environments/environment'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { TranslocoRootModule } from './transloco/transloco-root.module'
import { HomeComponent } from './home/home.component'
import { defineLocale, itLocale, enGbLocale } from 'ngx-bootstrap/chronos'
import { SharedModule } from './shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'
import { AccessibilityModule } from './accessibility/accessibility.module'
import { QuangDialogModule } from '../../../quang/dialog/src/lib/quang-dialog.module'
import { QuangUtilityModule } from '../../../quang/utility/src/lib/quang-utility.module'
import { QuangMapModule } from '../../../quang/components/map/src/lib/quang-map.module'
import { QuangKeycloakModule } from '../../../quang/auth/keycloak/src/lib/quang-keycloak.module'
import { QuangMediaModule } from '../../../quang/components/media/src/lib/quang-media.module'
import { QuangLoaderInterceptor } from '../../../quang/dialog/src/lib/loader/quang-loader.interceptor'
import { QuangHttpErrorInterceptor } from '../../../quang/dialog/src/http-error/error.interceptor'
import { QuangCardsModule } from '../../../quang/components/cards/src/lib/quang-cards.module'
import { registerLocaleData } from '@angular/common'
import localeitIT from '@angular/common/locales/it'

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
