import { Component, ElementRef, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { QuangDialogConfig } from '../../dialog.config'
import { QuangDialogStateModule } from '../../dialog.reducer'
import { QuangLoaderSelectors } from '../store/selectors'
/**
 * loader component decorator
 */
@Component({
  selector: 'quang-loader',
  templateUrl: './loader.component.html',
  styles: ['']
})
/**
 * loader component
 */
export class QuangLoaderComponent implements OnInit, OnDestroy {
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
  loader$: Observable<any> = this.store.select(QuangLoaderSelectors.selectLoader)
  /**
   * counter for active call
   */
  activeLoader: number = 0
  /**
   * wrapper for module configuration
   */
  configModule: QuangDialogConfig = new QuangDialogConfig(false)

  /**
   * constructor
   * @param store store access
   * @param config module config
   */
  constructor (
    private readonly store: Store<QuangDialogStateModule>,
    @Optional() config?: QuangDialogConfig
  ) {
    this.configModule = config
  }

  /**
   * init observer
   */
  ngOnInit (): void {
    this.observeLoader()
  }

  /**
   * if we are in a development environment it traces the changes in the loader state
   */
  observeLoader (): void {
    if (!this.configModule?.production) {
      this.loaderSubscription$ = this.loader$.subscribe((loaderNumber) => {
        this.activeLoader = loaderNumber
      })
    }
  }

  /**
   * unsubscribe the observable
   */
  ngOnDestroy (): void {
    if (this.loaderSubscription$) {
      this.loaderSubscription$.unsubscribe()
    }
  }
}
