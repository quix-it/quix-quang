import { ModuleWithProviders, NgModule } from '@angular/core'
import { HasRolesDirective } from './quang-auth-directive/has-roles.directive'
import { IsAuthenticatedDirective } from './quang-auth-directive/is-authenticated.directive'
import { CommonModule } from '@angular/common'
import { HasUntilRolesDirective } from './quang-auth-directive/has-until-roles.directive'
import { StoreModule } from '@ngrx/store'
import { QUANGAUTH_KEY } from './quang-auth-module.selector'
import { quangAuthReducer } from './quang-auth-module.reducer'
import { QuangAuthService } from './quang-auth.service'
import { OAuthModule } from 'angular-oauth2-oidc'
import { QuangAuthConfig } from './quang-auth.config'

function _window (): any {
  return window
}

@NgModule({
  declarations: [
    HasRolesDirective,
    HasUntilRolesDirective,
    IsAuthenticatedDirective,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(QUANGAUTH_KEY, quangAuthReducer),
    OAuthModule.forRoot({
      resourceServer: _window().oidcApiConfig
    })
  ],
  providers: [
    QuangAuthService
  ],
  exports: [
    HasRolesDirective,
    HasUntilRolesDirective,
    IsAuthenticatedDirective
  ]
})
export class QuangAuthModule {
  static forRoot (config?: QuangAuthConfig): ModuleWithProviders<any> {
    return {
      ngModule: QuangAuthModule,
      providers: [
        { provide: QuangAuthConfig, useValue: config }
      ]
    }
  }
}
