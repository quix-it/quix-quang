import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { select, Store } from '@ngrx/store'

import { distinctUntilChanged, takeUntil } from 'rxjs/operators'
import { selectHasUntilRoles } from '../quang-auth-store/quang-auth.selector'

@Directive({
  selector: '[quangHasUntilRoles]'
})
/**
 * has until role directive
 */
export class HasUntilRolesDirective {
  /**
   * List of necessary roles
   */
  @Input() quangHasUntilRoles: string[]
  /**
   * subject of convenience to turn off the subscription to the observable
   * @private
   */
  private destroy$ = new Subject()

  constructor (
    private readonly view: ViewContainerRef,
    private readonly template: TemplateRef<any>,
    private readonly authStore: Store<any>
  ) {
  }

  /**
   * Check if the user in the store has the required roles and define whether to render or not
   */
  ngOnInit (): void {
    this.authStore.pipe(
      select(selectHasUntilRoles, { rolesId: this.quangHasUntilRoles }),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(hasRole => {
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
    this.destroy$.next()
  }
}
