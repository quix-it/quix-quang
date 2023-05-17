import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { KsKeycloakRoutingModule } from './ks-keycloak-routing.module'
import { ConfigComponent } from './config/config.component'
import { DirectiveComponent } from './directive/directive.component'
import { SelectorComponent } from './selector/selector.component'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { SharedModule } from '../shared/shared.module'
import { GuardComponent } from './guard/guard.component'
import { QuangCardsModule } from '../../../../quang-cards/src/lib/quang-cards.module'

@NgModule({
  declarations: [
    ConfigComponent,
    DirectiveComponent,
    SelectorComponent,
    GuardComponent
  ],
  imports: [
    CommonModule,
    KsKeycloakRoutingModule,
    SharedModule,
    QuangCardsModule,
    TranslocoModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'keycloak' }]
})
export class KsKeycloakModule {}
