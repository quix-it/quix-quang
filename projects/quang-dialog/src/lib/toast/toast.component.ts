import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild
} from '@angular/core'
import { QuangToast } from './toast.model'
import { Observable, of, Subscription } from 'rxjs'
import { ToastsState } from './toast-store/reducers/toast.reducers'
import { Store } from '@ngrx/store'
import { delay, take } from 'rxjs/operators'
import { ToastSelectors } from './toast-store/selectors'
import { QuangDialogStateModule } from '../quang-dialog.reducers'

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
  private readonly toastState$: Observable<any> = this.store.select(ToastSelectors.selectToast)
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
   * @param renderer html access
   * @param store store access
   */
  constructor (
    private readonly renderer: Renderer2,
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
    this.subscription = this.toastState$.subscribe((data: ToastsState) => {
      if (data.toastData) {
        this.data = data.toastData
        this.open()
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
