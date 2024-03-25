import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TranslocoModule } from '@ngneat/transloco'
import { StoreModule } from '@ngrx/store'

import { QuangCardsModule } from '@quix/quang/components/cards'

import { SharedModule } from '../../shared/shared.module'
import { TrainingStateRoutingModule } from './training-state-routing.module'

import { PlanetsFormComponent } from './planets/planets-form/planets-form.component'
import { PlanetsListComponent } from './planets/planets-list/planets-list.component'
import { PlanetsComponent } from './planets/planets.component'
import { StarshipsComponent } from './starships/starships.component'

import { PlanetsEffects } from './planets-store/effects'
import { StarshipsEffects } from './starships-store/effects/starships.effects'
import { EffectsModule } from '@ngrx/effects'

import { trainingStateReducers } from './training-state-store/training-state.reducers'
import { TRAINING_STATE_KEY } from './training-state-store/training-state.selector'

@NgModule({
  declarations: [StarshipsComponent, PlanetsComponent, PlanetsFormComponent, PlanetsListComponent],
  imports: [
    CommonModule,
    TrainingStateRoutingModule,
    SharedModule,
    QuangCardsModule,
    StoreModule.forFeature(TRAINING_STATE_KEY, trainingStateReducers),
    EffectsModule.forFeature([PlanetsEffects.PlanetsEffects, StarshipsEffects]),
    TranslocoModule
  ]
})
export class TrainingStateModule {}
