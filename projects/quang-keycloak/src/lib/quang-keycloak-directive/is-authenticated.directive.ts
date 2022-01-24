import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { Store } from '@ngrx/store'
import { distinctUntilChanged, takeUntil } from 'rxjs/operators'
import { QuangKeycloakSelectors } from '../quang-keycloak-store/selectors'

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
   * @param authStore auth store access
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
   * Check if the user in the store is authenticated and define whether to render or not
   */
  ngOnInit (): void {
    this.authStore
      .select(QuangKeycloakSelectors.selectIsAuthenticated)
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
  }
}
