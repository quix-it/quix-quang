import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core'
import { QuixToast } from './toast.model'
import { Observable, of, Subscription } from 'rxjs'
import { ToastsState } from './toast-store/toast.reducer'
import { select, Store } from '@ngrx/store'
import { selectToast } from './toast-store/toast.selector'
import { delay, take } from 'rxjs/operators'

@Component({
  selector: 'quix-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
/**
 * toast component
 */
export class QuixToastComponent implements AfterViewInit, OnDestroy {
  /**
   * toast wrapper
   */
  data: QuixToast
  /**
   * observable for toast state
   * @private
   */
  private toastState$: Observable<any> = this.store.pipe(select(selectToast))
  /**
   * subscription to a toast state
   * @private
   */
  private subscription: Subscription = new Subscription()
  @ViewChild('toastDom', { static: false }) toastDom: ElementRef

  /**
   * constructor
   * @param renderer html access
   * @param store
   */
  constructor (
    private readonly renderer: Renderer2,
    private readonly store : Store<any>
  ) {
  }

  ngAfterViewInit () {
    this.observeToasts()
  }

  /**
   * observe the change of state of the toast saved in the store
   */
  observeToasts () {
    this.subscription = this.toastState$.subscribe((data: ToastsState) => {
        if (data.toastData) {
          this.data = data.toastData
          this.open()
        }
      },
      (error) => {
        alert('Error on toast lifecycle')
      })
  }

  /**
   * view the toast by changing the style of the component
   * if a timing is configured it waits for the time to expire and closes the toast
   */
  open () {
    this.renderer.setStyle(this.toastDom.nativeElement, 'opacity', '1')
    this.renderer.setStyle(this.toastDom.nativeElement, 'transform', 'scale(1)')
    if (this.data.timing) {
      of('').pipe(
        delay(this.data.timing),
        take(1)
      ).subscribe(() => {
        this.renderer.setStyle(this.toastDom.nativeElement, 'opacity', '0')
        this.renderer.setStyle(this.toastDom.nativeElement, 'transform', 'scale(0)')
      })
    }
  }

  /**
   * closes the toast by modifying the css rules
   */
  close () {
    this.renderer.setStyle(this.toastDom.nativeElement, 'opacity', '0')
    this.renderer.setStyle(this.toastDom.nativeElement, 'transform', 'scale(0)')
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
