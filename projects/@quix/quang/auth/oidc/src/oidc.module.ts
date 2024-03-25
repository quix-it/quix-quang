import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'

import { StoreModule } from '@ngrx/store'
import { OAuthModule } from 'angular-oauth2-oidc'

import { quangAuthReducer } from './oidc-module.reducer'
import { QUANGOIDC_KEY } from './oidc-module.selectors'

import { QuangOpenIdConnectService } from './oidc.service'

import { QuangHasAtLeastOneRoleDirective } from './directives/has-at-least-one-role.directive'
import { QuangHasEveryRoleDirective } from './directives/has-every-role.directive'
import { QuangIsAuthenticatedDirective } from './directives/is-authenticated.directive'
import { QuangIsNotAuthenticatedDirective } from './directives/is-not-authenticated.directive'
import { QuangOpenIdConnectConfig } from './oidc.config'

@NgModule({
  declarations: [
    QuangHasEveryRoleDirective,
    QuangHasAtLeastOneRoleDirective,
    QuangIsAuthenticatedDirective,
    QuangIsNotAuthenticatedDirective
  ],
  imports: [CommonModule, StoreModule.forFeature(QUANGOIDC_KEY, quangAuthReducer), OAuthModule.forRoot()],
  providers: [QuangOpenIdConnectService],
  exports: [
    QuangHasEveryRoleDirective,
    QuangHasAtLeastOneRoleDirective,
    QuangIsAuthenticatedDirective,
    QuangIsNotAuthenticatedDirective
  ]
})
export class QuangOpenIdConnectModule {
  static forRoot(config?: QuangOpenIdConnectConfig): ModuleWithProviders<QuangOpenIdConnectModule> {
    return {
      ngModule: QuangOpenIdConnectModule,
      providers: [{ provide: QuangOpenIdConnectConfig, useValue: config }]
    }
  }
}
