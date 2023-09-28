import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TrainingScrollRoutingModule } from './training-scroll-routing.module'
import { ForComponent } from './for/for.component'
import { SharedModule } from '../shared/shared.module'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { ScrollComponent } from './scroll/scroll.component'
import { IntersectionComponent } from './intersection/intersection.component'
import { QuangCardsModule } from '../../../../quang/components/cards/src/lib/quang-cards.module'
import { MatLegacyChipsModule } from '@angular/material/legacy-chips'

@NgModule({
  declarations: [ForComponent, ScrollComponent, IntersectionComponent],
  imports: [
    CommonModule,
    TrainingScrollRoutingModule,
    QuangCardsModule,
    SharedModule,
    TranslocoModule,
    MatLegacyChipsModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'scroll' }]
})
export class TrainingScrollModule {}
