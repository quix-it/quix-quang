import { ModuleWithProviders, NgModule } from '@angular/core'
import { HasRolesDirective } from './quang-auth-directive/has-roles.directive'
import { IsAuthenticatedDirective } from './quang-auth-directive/is-authenticated.directive'
import { CommonModule } from '@angular/common'
import { HasUntilRolesDirective } from './quang-auth-directive/has-until-roles.directive'
import { StoreModule } from '@ngrx/store'
import { QUANGAUTH_KEY } from './quang-auth-module.selector'

import { QuangAuthService } from './quang-auth.service'
import { QuangAuthConfig } from './quang-auth.config'
import { IsNotAuthenticatedDirective } from './quang-auth-directive/is-not-authenticated.directive'
import { quangAuthReducer } from './quang-auth-module.reducer'

@NgModule({
  declarations: [
    HasRolesDirective,
    HasUntilRolesDirective,
    IsAuthenticatedDirective,
    IsNotAuthenticatedDirective
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(QUANGAUTH_KEY, quangAuthReducer)
  ],
  providers: [
    QuangAuthService
  ],
  exports: [
    HasRolesDirective,
    HasUntilRolesDirective,
    IsAuthenticatedDirective,
    IsNotAuthenticatedDirective
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
