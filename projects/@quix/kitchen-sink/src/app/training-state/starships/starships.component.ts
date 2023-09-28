import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subject, Subscription } from 'rxjs'
import { Starship } from './starship.model'
import { StarshipsSelectors } from '../starships-store/selectors'
import { AppState } from '../../app-store/app.reducers'
import { StarshipsActions } from '../starships-store/actions'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'ks-starships',
  templateUrl: './starships.component.html',
  styles: []
})
export class StarshipsComponent implements OnInit, OnDestroy {
  starships$: Observable<Starship[]> = this.store.select(StarshipsSelectors.selectStarships)
  falcon$: Observable<Starship | undefined> = this.store.select(StarshipsSelectors.selectStarshipById('https://swapi.dev/api/starships/10/'))
  starships: Starship[] = []
  starshipsSubscription$: Subscription = new Subscription()
  destroy$ = new Subject<any>()

  constructor (
    private readonly store: Store<AppState>
  ) { }

  ngOnInit (): void {
    // this.observeStarships()
  }

  observeStarships (): void {
    this.starships$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(s => {
      this.starships = s
    })
  }

  getStarships (): void {
    this.store.dispatch(StarshipsActions.getStarships())
  }

  ngOnDestroy (): void {
    this.destroy$.next('')
    this.destroy$.complete()
  }
}
