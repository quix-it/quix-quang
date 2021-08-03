import { ModuleWithProviders, NgModule } from '@angular/core'
import { HasRolesDirective } from './quang-keycloak-directive/has-roles.directive'
import { IsAuthenticatedDirective } from './quang-keycloak-directive/is-authenticated.directive'
import { CommonModule } from '@angular/common'
import { HasUntilRolesDirective } from './quang-keycloak-directive/has-until-roles.directive'
import { StoreModule } from '@ngrx/store'
import { QUANGKEYCLOAK_KEY } from './quang-keycloak-module.selector'
import { quangKeycloakReducer } from './quang-keycloak-module.reducer'
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular'
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
    StoreModule.forFeature(QUANGKEYCLOAK_KEY, quangKeycloakReducer),
    KeycloakAngularModule
  ],
  exports: [
    HasRolesDirective,
    HasUntilRolesDirective,
    IsAuthenticatedDirective
  ],
  providers: [
    KeycloakService,
    QuangKeycloakService,
  ]
})
export class QuangKeycloakModule {
  static forRoot (config?: QuangKeycloakConfig): ModuleWithProviders<any> {
    return {
      ngModule: QuangKeycloakModule,
      providers: [
        { provide: QuangKeycloakConfig, useValue: config }
      ]
    }
  }
}
