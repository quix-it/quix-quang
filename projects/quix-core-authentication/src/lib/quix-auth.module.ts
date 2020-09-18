import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuangAuthConfig } from "./quang-auth.model";
import {StoreModule} from "@ngrx/store";
import {COREAUTHENTICATION_KEY, QuixAuthReducers} from "./quix-auth.reducers";
import {OAuthModule} from "angular-oauth2-oidc";
import {EffectsModule} from "@ngrx/effects";
import {QuixAuthService} from "./services/quix-auth.service";
import {UserIsLoggedDirective} from "./directives/user-is-logged.directive";

import {HasRolesDirective} from "./directives/has-roles.directive";
import { HasUntilRolesDirective } from './directives/has-until-roles.directive';
import {QuixStorageService} from "./storage/quix-storage.service";
import {QuixWindowService} from "./window/quix-window.service";
import {QuixAuthEffects} from "./quix-auth.effects";
import {QuixAuthInterceptor} from "./interceptors/quix-auth.interceptor";
import {QuixLocaleService} from "./services/quix-locale.service";

@NgModule({
  declarations: [
    UserIsLoggedDirective,
    HasRolesDirective,
    HasUntilRolesDirective
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(COREAUTHENTICATION_KEY, QuixAuthReducers),
    EffectsModule.forFeature([]),
    OAuthModule.forRoot(),
  ],
  providers:[
    QuixAuthService,
    QuixStorageService,
    QuixWindowService,
    QuixAuthEffects,
    QuixAuthInterceptor,
    QuixLocaleService
  ],
  exports: [
    UserIsLoggedDirective,
    HasRolesDirective,
    HasUntilRolesDirective
  ]
})
export class QuixAuthModule {  static forRoot(config: QuangAuthConfig): ModuleWithProviders {
  return {
    ngModule: QuixAuthModule,
    providers: [
      {provide: QuangAuthConfig, useValue: config}
    ]
  };
}}
