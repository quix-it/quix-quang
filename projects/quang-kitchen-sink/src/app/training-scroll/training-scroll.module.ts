import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TrainingScrollRoutingModule } from './training-scroll-routing.module'
import { ForComponent } from './for/for.component'
import { SharedModule } from '../shared/shared.module'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { MatChipsModule } from '@angular/material/chips'
import { ScrollComponent } from './scroll/scroll.component'
import { IntersectionComponent } from './intersection/intersection.component'
import { QuangCardsModule } from '../../../../quang/cards/src/lib/quang-cards.module'

@NgModule({
  declarations: [ForComponent, ScrollComponent, IntersectionComponent],
  imports: [
    CommonModule,
    TrainingScrollRoutingModule,
    QuangCardsModule,
    SharedModule,
    TranslocoModule,
    MatChipsModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'scroll' }]
})
export class TrainingScrollModule {}
