import {ModuleWithProviders, NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {QuixCoreAuthenticationModel} from './quix-core-authentication.model';
import {CommonModule} from '@angular/common';
import {QuixWindowService} from './window/quix-window.service';
import {QuixAuthService} from './auth/quix-auth.service';
import {COREAUTHENTICATION_KEY, QuixCoreAuthenticationReducers} from './quix-core-authentication.reducers';
import {HasStoreRoleDirective} from "./auth-directive/has-store-role.directive";
import {HasStoreRolesDirective} from "./auth-directive/has-store-roles.directive";
import {UserIsLoggedDirective} from "./auth-directive/user-is-logged.directive";
import {OAuthModule} from "angular-oauth2-oidc";


@NgModule({
  declarations: [
    HasStoreRoleDirective,
    HasStoreRolesDirective,
    UserIsLoggedDirective
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(COREAUTHENTICATION_KEY, QuixCoreAuthenticationReducers),
    OAuthModule.forRoot()
  ],
  providers: [
    QuixWindowService,
    QuixAuthService
  ],
  exports: [
    HasStoreRoleDirective,
    HasStoreRolesDirective,
    UserIsLoggedDirective
  ]
})
export class QuixCoreAuthenticationModule {
  static forRoot(config: QuixCoreAuthenticationModel): ModuleWithProviders {
    return {
      ngModule: QuixCoreAuthenticationModule,
      providers: [
        {provide: QuixCoreAuthenticationModel, useValue: config}
      ]
    };
  }
}
