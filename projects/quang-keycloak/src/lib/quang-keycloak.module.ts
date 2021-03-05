import { ModuleWithProviders, NgModule } from '@angular/core'
import { HasRolesDirective } from './quang-keycloak-directive/has-roles.directive'
import { IsAuthenticatedDirective } from './quang-keycloak-directive/is-authenticated.directive'
import { CommonModule } from '@angular/common'
import { HasUntilRolesDirective } from './quang-keycloak-directive/has-until-roles.directive'
import { StoreModule } from '@ngrx/store'
import { QUANGKEYCLOAK_KEY } from './quang-keycloak-module.selector'
import { quangkeycloakReducer } from './quang-keycloak-module.reducer'
import { KeycloakAngularModule } from 'keycloak-angular'
import { QuangKeycloakService } from './quang-keycloak.service'
import { QuangKeycloakConfig } from './quang-keycloak.config'

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
  static forRoot (config?: QuangKeycloakConfig): ModuleWithProviders {
    return {
      ngModule: QuangKeycloakModule,
      providers: [
        { provide: QuangKeycloakConfig, useValue: config }
      ]
    }
  }
}
