import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'

import { QuangCardsModule } from '@quix/quang/components/cards'

import { SharedModule } from '../../shared/shared.module'
import { CardActionHeaderComponent } from './card-action-header/card-action-header.component'
import { CardActionComponent } from './card-action/card-action.component'
import { CardHeaderComponent } from './card-header/card-header.component'
import { CardImageComponent } from './card-image/card-image.component'
import { CardSimpleComponent } from './card-simple/card-simple.component'
import { CardComponent } from './card/card.component'
import { KsCardsRoutingModule } from './ks-cards-routing.module'

@NgModule({
  declarations: [
    CardComponent,
    CardHeaderComponent,
    CardSimpleComponent,
    CardActionHeaderComponent,
    CardActionComponent,
    CardImageComponent
  ],
  imports: [
    CommonModule,
    KsCardsRoutingModule,
    SharedModule,
    QuangCardsModule,
    TranslocoModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'components' }]
})
export class KsCardsModule {}
