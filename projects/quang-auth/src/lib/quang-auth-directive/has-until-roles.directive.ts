import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { select, Store } from '@ngrx/store'

import { distinctUntilChanged, takeUntil } from 'rxjs/operators'
import { selectHasUntilRoles } from '../quang-auth-store/quang-auth.selector'

@Directive({
  selector: '[quangHasUntilRoles]'
})
export class HasUntilRolesDirective {
  /**
   * List of necessary roles
   */
  @Input() quangHasUntilRoles: string[]
  private destroy$ = new Subject()

  constructor (
    private view: ViewContainerRef,
    private template: TemplateRef<any>,
    private authStore: Store<any>
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

  ngOnDestroy (): void {
    this.destroy$.next()
  }
}
