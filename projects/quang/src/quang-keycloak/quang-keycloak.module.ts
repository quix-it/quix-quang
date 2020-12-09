import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HasRolesDirective} from "./quang-keycloak/quang-keycloak-directive/has-roles.directive";
import {QuangKeycloakService} from "./quang-keycloak/quang-keycloak.service";
import {HasUntilRolesDirective} from "./quang-keycloak/quang-keycloak-directive/has-until-roles.directive";
import {IsAuthenticatedDirective} from "./quang-keycloak/quang-keycloak-directive/is-authenticated.directive";
import {KeycloakAngularModule} from "keycloak-angular";

import {QuangKeycloakConfig} from "./quang-keycloak.config";
import {StoreModule} from "@ngrx/store";
import {QUANGKEYCLOAK_KEY} from "./quang-keycloak-module-store/quang-keycloak-module.selector";
import {quangkeycloakReducer} from "./quang-keycloak-module-store/quang-keycloak-module.reducer";


@NgModule({
  declarations: [
    HasRolesDirective,
    HasUntilRolesDirective,
    IsAuthenticatedDirective
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(QUANGKEYCLOAK_KEY, quangkeycloakReducer),
    KeycloakAngularModule
  ],
  exports: [
    HasRolesDirective,
    HasUntilRolesDirective,
    IsAuthenticatedDirective
  ],
  providers: [
    QuangKeycloakService,

  ]
})
export class QuangKeycloakModule {
  static forRoot(config?: QuangKeycloakConfig): ModuleWithProviders {
    return {
      ngModule: QuangKeycloakModule,
      providers: [
        {provide: QuangKeycloakConfig, useValue: config}
      ]
    };
  }
}
