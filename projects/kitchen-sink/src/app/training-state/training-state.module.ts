import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TrainingStateRoutingModule } from './training-state-routing.module'
import { StarshipsComponent } from './starships/starships.component'
import { PlanetsComponent } from './planets/planets.component'
import { StoreModule } from '@ngrx/store'
import { TRAINING_STATE_KEY } from './training-state-store/training-state.selector'
import { trainingStateReducers } from './training-state-store/training-state.reducers'
import { EffectsModule } from '@ngrx/effects'
import { PlanetsEffects } from './planets-store/effects'
import { PlanetsFormComponent } from './planets/planets-form/planets-form.component'
import { PlanetsListComponent } from './planets/planets-list/planets-list.component'
import { TranslocoModule } from '@ngneat/transloco'
import { SharedModule } from '../shared/shared.module'
import { QuangCardsModule } from '../../../../@quix/quang/cards/src/lib/quang-cards.module'

@NgModule({
  declarations: [
    StarshipsComponent,
    PlanetsComponent,
    PlanetsFormComponent,
    PlanetsListComponent
  ],
  imports: [
    CommonModule,
    TrainingStateRoutingModule,
    SharedModule,
    QuangCardsModule,
    StoreModule.forFeature(TRAINING_STATE_KEY, trainingStateReducers),
    EffectsModule.forFeature([PlanetsEffects.PlanetsEffects]),
    TranslocoModule
  ]
})
export class TrainingStateModule {}
