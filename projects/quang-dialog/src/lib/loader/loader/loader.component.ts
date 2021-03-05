import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { selectLoader } from '../loader-store/loader.selector'

@Component({
  selector: 'quix-loader',
  templateUrl: './loader.component.html',
  styles: ['']
})
export class LoaderComponent implements OnInit, OnDestroy {
  loaderSubscription$: Subscription
  loader$: Observable<any>
  @ViewChild('loader') loader: ElementRef<HTMLDivElement>
  activeLoader: number

  constructor (
    private store: Store<any>
  ) {
  }

  ngOnInit (): void {
    this.observeLoader()
  }

  observeLoader () {
    this.loader$ = this.store.pipe(select(selectLoader))
    this.loaderSubscription$ = this.loader$.subscribe(
      loaderNumber => {
        this.activeLoader = loaderNumber
      })
  }

  ngOnDestroy () {
    if (this.loaderSubscription$) {
      this.loaderSubscription$.unsubscribe()
    }
  }
}
