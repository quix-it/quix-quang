import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'

import { QuangCardsModule } from '@quix/quang/components/cards'

import { SharedModule } from '../../shared/shared.module'
import { ConfigComponent } from './config/config.component'
import { DirectiveComponent } from './directive/directive.component'
import { GuardComponent } from './guard/guard.component'
import { KsKeycloakRoutingModule } from './ks-keycloak-routing.module'
import { SelectorComponent } from './selector/selector.component'

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
