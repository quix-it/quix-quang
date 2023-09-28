import { ModuleWithProviders, NgModule } from '@angular/core'
import { QuangHasEveryRoleDirective } from './directives/has-every-role.directive'
import { QuangIsAuthenticatedDirective } from './directives/is-authenticated.directive'
import { CommonModule } from '@angular/common'
import { QuangHasAtLeastOneRoleDirective } from './directives/has-at-least-one-role.directive'
import { StoreModule } from '@ngrx/store'
import { QUANGKEYCLOAK_KEY } from './keycloak-module.selectors'
import { quangKeycloakReducer } from './keycloak-module.reducer'
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular'
import { QuangKeycloakService } from './keycloak.service'
import { QuangKeycloakConfig } from './keycloak.config'
import { QuangIsNotAuthenticatedDirective } from './directives/is-not-authenticated.directive'

@NgModule({
  declarations: [
    QuangHasEveryRoleDirective,
    QuangHasAtLeastOneRoleDirective,
    QuangIsAuthenticatedDirective,
    QuangIsNotAuthenticatedDirective
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(QUANGKEYCLOAK_KEY, quangKeycloakReducer),
    KeycloakAngularModule
  ],
  exports: [
    QuangHasEveryRoleDirective,
    QuangHasAtLeastOneRoleDirective,
    QuangIsAuthenticatedDirective,
    QuangIsNotAuthenticatedDirective
  ],
  providers: [
    KeycloakService,
    QuangKeycloakService
  ]
})
export class QuangKeycloakModule {
  static forRoot (config?: QuangKeycloakConfig): ModuleWithProviders<QuangKeycloakModule> {
    return {
      ngModule: QuangKeycloakModule,
      providers: [
        { provide: QuangKeycloakConfig, useValue: config }
      ]
    }
  }
}
