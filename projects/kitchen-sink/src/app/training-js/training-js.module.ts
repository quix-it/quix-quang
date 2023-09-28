import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TrainingJsRoutingModule } from './training-js-routing.module'
import { TrainingMapComponent } from './training-map/training-map.component'
import { TrainingArrayComponent } from './training-array/training-array.component'
import { SharedModule } from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { QuangCardsModule } from '../../../../@quix/quang/cards/src/lib/quang-cards.module'

@NgModule({
  declarations: [TrainingMapComponent, TrainingArrayComponent],
  imports: [
    CommonModule,
    TrainingJsRoutingModule,
    SharedModule,
    QuangCardsModule,
    ReactiveFormsModule,
    TranslocoModule,
    TabsModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'js' }]
})
export class TrainingJsModule {}
