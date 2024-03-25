import { Component } from '@angular/core'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { Planet } from './planet.model'

import { PlanetsActions } from '../planets-store/actions'

import { PlanetsSelectors } from '../planets-store/selectors'

import { TrainingStateModuleStore } from '../training-state-store/training-state.reducers'

@Component({
  selector: 'ks-planets',
  templateUrl: './planets.component.html',
  styles: []
})
export class PlanetsComponent {
  planets$: Observable<Planet[] | null> = this.store.select(PlanetsSelectors.selectPlanets)
  PlanetActions = PlanetsActions

  constructor(public readonly store: Store<TrainingStateModuleStore>) {}
}
