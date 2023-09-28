import { Component } from '@angular/core'
import { TrainingStateModuleStore } from '../training-state-store/training-state.reducers'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { Planet } from './planet.model'
import { PlanetsSelectors } from '../planets-store/selectors'
import { PlanetsActions } from '../planets-store/actions'

@Component({
  selector: 'ks-planets',
  templateUrl: './planets.component.html',
  styles: []
})
export class PlanetsComponent {
  planets$: Observable<Planet[] | null> = this.store.select(
    PlanetsSelectors.selectPlanets
  )
  PlanetActions = PlanetsActions

  constructor(public readonly store: Store<TrainingStateModuleStore>) {}
}
