import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'

import { Store } from '@ngrx/store'
import { Subject } from 'rxjs'
import { distinctUntilChanged, takeUntil } from 'rxjs/operators'

import { QuangKeycloakSelectors } from '../store/selectors'

@Directive({
  selector: '[quangIsAuthenticated]'
})
export class QuangIsAuthenticatedDirective implements OnInit, OnDestroy {
  private readonly onDestroy$ = new Subject<void>()

  /**
   * constructor
   * @param authStore auth store access
   * @param view view access
   * @param template template access
   */
  constructor(
    private readonly authStore: Store<any>,
    private readonly view: ViewContainerRef,
    private readonly template: TemplateRef<any>
  ) {}

  /**
   * Check if the user in the store is authenticated and define whether to render or not
   */
  ngOnInit(): void {
    this.authStore
      .select(QuangKeycloakSelectors.selectIsAuthenticated)
      .pipe(distinctUntilChanged(), takeUntil(this.onDestroy$))
      .subscribe((is) => {
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
  ngOnDestroy(): void {
    this.onDestroy$.next()
    this.onDestroy$.complete()
  }
}
