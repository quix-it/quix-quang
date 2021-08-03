import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { select, Store } from '@ngrx/store'

import { distinctUntilChanged, takeUntil } from 'rxjs/operators'
import { selectHasUntilRoles } from '../quang-keycloak-store/quang-keycloak.selector'

@Directive({
  selector: '[quangHasUntilRoles]'
})
export class HasUntilRolesDirective {
  /**
   * list that defines the possibility of displaying the element if you have at least one role among those in input
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
   * check with the selector if the user has at least one necessary role,
   * if he has them he displays the element otherwise he does not render them
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

  ngOnDestroy (): void {
    this.destroy$.next()
  }
}
