import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core'
import { QuangToast } from './toast.model'
import { delay, Observable, of, Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { QuangToastSelectors } from './store/selectors'
import { QuangDialogStateModule } from '../dialog.reducer'
import { take } from 'rxjs/operators'

/**
 * toast component decorator
 */
@Component({
  selector: 'quang-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
/**
 * toast component
 */
export class QuangToastComponent implements AfterViewInit, OnDestroy {
  /**
   * toast wrapper
   */
  data: QuangToast | null = null
  /**
   * observable for toast state
   * @private
   */
  private readonly toastState$: Observable<QuangToast> = this.store.select(QuangToastSelectors.selectToast)
  /**
   * subscription to a toast state
   * @private
   */
  private subscription: Subscription = new Subscription()
  /**
   * html element
   */
  @ViewChild('toastDom', { static: false }) toastDom: ElementRef | null = null

  /**
   * constructor
   * @param store store access
   */
  constructor (
    private readonly store: Store<QuangDialogStateModule>
  ) {
  }

  /**
   * init observer
   */
  ngAfterViewInit (): void {
    this.observeToasts()
  }

  /**
   * observe the change of state of the toast saved in the store
   */
  observeToasts (): void {
    this.subscription = this.toastState$.subscribe((t: QuangToast) => {
      if (t) {
        this.data = t
        if (this.data.timing) {
          setTimeout(() => {
            this.close()
          }, this.data.timing)
        }
      }
    },
    () => {
      alert('Error on toast lifecycle')
    })
  }

  /**
   * view the toast by changing the style of the component
   * if a timing is configured it waits for the time to expire and closes the toast
   */
  open (): void {
    if (this.data?.timing) {
      of('').pipe(
        delay(this.data.timing),
        take(1)
      ).subscribe(() => {
        this.close()
      })
    }
  }

  /**
   * closes the toast by modifying the css rules
   */
  close (): void {
    this.data = null
  }

  /**
   * unsubscribe the observable
   */
  ngOnDestroy (): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
