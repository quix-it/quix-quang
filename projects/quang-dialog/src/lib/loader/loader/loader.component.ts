import { Component, ElementRef, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core'
import {  Observable, Subscription } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { selectLoader } from '../loader-store/loader.selector'
import { QuangDialogConfig } from '../../quang-dialog.config'

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
  configModule: QuangDialogConfig = null

  constructor (
    private store: Store<any>,
    @Optional() config?: QuangDialogConfig
  ) {
    this.configModule = config
  }

  ngOnInit (): void {
    this.observeLoader()
  }

  observeLoader () {
    this.loader$ = this.store.pipe(select(selectLoader))
    if (!this.configModule.production) {
      this.loaderSubscription$ = this.loader$.subscribe(
        loaderNumber => {
          this.activeLoader = loaderNumber
        })
    }
  }

  ngOnDestroy () {
    if (this.loaderSubscription$) {
      this.loaderSubscription$.unsubscribe()
    }
  }
}
