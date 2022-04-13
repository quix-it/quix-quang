import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { Store } from '@ngrx/store'

import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators'
import { QuangKeycloakSelectors } from '../quang-keycloak-store/selectors'

/**
 * directive decorator
 */
@Directive({
  selector: '[quangHasUntilRoles]'
})
/**
 * has until role directive
 */
export class HasUntilRolesDirective implements OnInit, OnDestroy {
  /**
   * list that defines the possibility of displaying the element if you have at least one role among those in input
   */
  @Input() quangHasUntilRoles: string[]
  /**
   * subject of convenience to turn off the subscription to the observable
   * @private
   */
  private readonly destroy$ = new Subject()

  /**
   * constructor
   * @param view view access
   * @param template template access
   * @param authStore store access
   */
  constructor (
    private readonly view: ViewContainerRef,
    private readonly template: TemplateRef<any>,
    private readonly authStore: Store<any>
  ) {
  }

  /**
   * check with the selector if the user has at least one necessary role,
   * if he has them he displays the element otherwise he does not render them
   */
  ngOnInit (): void {
    this.authStore
      .select(QuangKeycloakSelectors.selectHasUntilRoles(this.quangHasUntilRoles))
    .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(hasRole => {
        if (hasRole) {
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
