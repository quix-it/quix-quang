import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatLegacyChipsModule } from '@angular/material/legacy-chips'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'

import { QuangCardsModule } from '@quix/quang/components/cards'

import { SharedModule } from '../../shared/shared.module'
import { ForComponent } from './for/for.component'
import { IntersectionComponent } from './intersection/intersection.component'
import { ScrollComponent } from './scroll/scroll.component'
import { TrainingScrollRoutingModule } from './training-scroll-routing.module'

@NgModule({
  declarations: [ForComponent, ScrollComponent, IntersectionComponent],
  imports: [
    CommonModule,
    TrainingScrollRoutingModule,
    SharedModule,
    TranslocoModule,
    MatLegacyChipsModule,
    QuangCardsModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'scroll' }]
})
export class TrainingScrollModule {}
