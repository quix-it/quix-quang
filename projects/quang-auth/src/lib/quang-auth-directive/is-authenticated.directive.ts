import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectIsAuthenticated } from '../quang-auth-store/selectors/quang-auth.selectors'
import { distinctUntilChanged, takeUntil } from 'rxjs/operators'

/**
 * directive decorator
 */
@Directive({
  selector: '[quangIsAuthenticated]'
})
/**
 * is authenticated directive
 */
export class IsAuthenticatedDirective implements OnInit, OnDestroy {
  /**
   * subject of convenience to turn off the subscription to the observable
   * @private
   */
  private readonly destroy$ = new Subject()

  /**
   * constructor
   * @param authStore store access
   * @param view view access
   * @param template template access
   */
  constructor (
    private readonly authStore: Store<any>,
    private readonly view: ViewContainerRef,
    private readonly template: TemplateRef<any>
  ) {
  }

  /**
   * Check if the user in the store is logged and define whether to render or not
   */
  ngOnInit (): void {
    this.authStore
      .select(selectIsAuthenticated)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(is => {
        if (is) {
          this.view.createEmbeddedView(this.template)
        } else {
          this.view.clear()
        }
      })
  }

  /**
   * unsubscribe the observable
   */
  ngOnDestroy (): void {
    this.destroy$.next('')
    this.destroy$.complete()
  }
}
