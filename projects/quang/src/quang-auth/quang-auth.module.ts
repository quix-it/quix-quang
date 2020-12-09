import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HasRolesDirective} from "./quang-auth/quang-auth-directive/has-roles.directive";
import {HasUntilRolesDirective} from "./quang-auth/quang-auth-directive/has-until-roles.directive";

import {StoreModule} from "@ngrx/store";
import {quangAuthReducer} from "./quang-auth-module-store/quang-auth-module.reducer";
import {QUANGAUTH_KEY} from "./quang-auth-module-store/quang-auth-module.selector";
import {QuangAuthService} from "./quang-auth/quang-auth.service";
import {QuangAuthConfig} from "./quang-auth.config";
import {IsAuthenticatedDirective} from './quang-auth/quang-auth-directive/is-authenticated.directive';
import {OAuthModule} from "angular-oauth2-oidc";

function _window(): any {
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
  static forRoot(config?: QuangAuthConfig): ModuleWithProviders {
    return {
      ngModule: QuangAuthModule,
      providers: [
        {provide: QuangAuthConfig, useValue: config}
      ]
    };
  }
}
