import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'

import { StoreModule } from '@ngrx/store'
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular'

import { quangKeycloakReducer } from './keycloak-module.reducer'
import { QUANGKEYCLOAK_KEY } from './keycloak-module.selectors'

import { QuangKeycloakService } from './keycloak.service'

import { QuangHasAtLeastOneRoleDirective } from './directives/has-at-least-one-role.directive'
import { QuangHasEveryRoleDirective } from './directives/has-every-role.directive'
import { QuangIsAuthenticatedDirective } from './directives/is-authenticated.directive'
import { QuangIsNotAuthenticatedDirective } from './directives/is-not-authenticated.directive'
import { QuangKeycloakConfig } from './keycloak.config'

@NgModule({
  declarations: [
    QuangHasEveryRoleDirective,
    QuangHasAtLeastOneRoleDirective,
    QuangIsAuthenticatedDirective,
    QuangIsNotAuthenticatedDirective
  ],
  imports: [CommonModule, StoreModule.forFeature(QUANGKEYCLOAK_KEY, quangKeycloakReducer), KeycloakAngularModule],
  exports: [
    QuangHasEveryRoleDirective,
    QuangHasAtLeastOneRoleDirective,
    QuangIsAuthenticatedDirective,
    QuangIsNotAuthenticatedDirective
  ],
  providers: [KeycloakService, QuangKeycloakService]
})
export class QuangKeycloakModule {
  static forRoot(config?: QuangKeycloakConfig): ModuleWithProviders<QuangKeycloakModule> {
    return {
      ngModule: QuangKeycloakModule,
      providers: [{ provide: QuangKeycloakConfig, useValue: config }, KeycloakService, QuangKeycloakService]
    }
  }
}
