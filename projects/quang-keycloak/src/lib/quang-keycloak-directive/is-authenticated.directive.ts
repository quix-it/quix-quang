import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { distinctUntilChanged, takeUntil } from 'rxjs/operators'
import { selectIsAuthenticated } from '../quang-keycloak-store/quang-keycloak.selector'

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
  private destroy$ = new Subject()

  constructor (
    private readonly authStore: Store<any>,
    private readonly view: ViewContainerRef,
    private readonly template: TemplateRef<any>
  ) {
  }

  ngOnInit (): void {
    this.authStore.pipe(
      select(selectIsAuthenticated),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(user => {
      if (user) {
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
    this.destroy$.next()
  }
}

