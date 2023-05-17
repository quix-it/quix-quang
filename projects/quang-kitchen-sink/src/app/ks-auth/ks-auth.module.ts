import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { KsAuthRoutingModule } from './ks-auth-routing.module'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { SharedModule } from '../shared/shared.module'
import { AuthConfigComponent } from './auth-config/auth-config.component'
import { AuthDirectiveComponent } from './auth-directive/auth-directive.component'
import { AuthSelectorComponent } from './auth-selector/auth-selector.component'
import { AuthGuardComponent } from './auth-guard/auth-guard.component'
import { QuangCardsModule } from '../../../../quang-cards/src/lib/quang-cards.module'

@NgModule({
  declarations: [
    AuthConfigComponent,
    AuthDirectiveComponent,
    AuthSelectorComponent,
    AuthGuardComponent,
    AuthGuardComponent,
    AuthSelectorComponent,
    AuthDirectiveComponent,
    AuthConfigComponent
  ],
  imports: [
    CommonModule,
    KsAuthRoutingModule,
    SharedModule,
    QuangCardsModule,
    TranslocoModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'auth' }]
})
export class KsAuthModule {}
