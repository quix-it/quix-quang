import { Component, ElementRef, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { selectLoader } from '../loader-store/loader.selector'
import { QuangDialogConfig } from '../../quang-dialog.config'

@Component({
  selector: 'quix-loader',
  templateUrl: './loader.component.html',
  styles: ['']
})
export class LoaderComponent implements OnInit, OnDestroy {
  /**
   * loader html element
   */
  @ViewChild('loader') loader: ElementRef<HTMLDivElement> | null = null
  /**
   * loader subscription
   */
  loaderSubscription$: Subscription = new Subscription()
  /**
   * observable for loader state
   */
  loader$: Observable<any> = this.store.pipe(select(selectLoader))
  /**
   * counter for active call
   */
  activeLoader: number = 0
  /**
   * wrapper for module configuration
   */
  configModule: QuangDialogConfig = null

  constructor (
    private readonly store : Store<any>,
    @Optional() config?: QuangDialogConfig
  ) {
    this.configModule = config
  }

  ngOnInit (): void {
    this.observeLoader()
  }

  /**
   * if we are in a development environment it traces the changes in the loader state
   */
  observeLoader (): void {
    if (!this.configModule.production) {
      this.loaderSubscription$ = this.loader$.subscribe((loaderNumber) => {
        this.activeLoader = loaderNumber
      })
    }
  }

  ngOnDestroy (): void {
    if (this.loaderSubscription$) {
      this.loaderSubscription$.unsubscribe()
    }
  }
}
