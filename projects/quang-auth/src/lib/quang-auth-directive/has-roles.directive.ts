import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { distinctUntilChanged, takeUntil } from 'rxjs/operators'
import { select, Store } from '@ngrx/store'
import { selectHasRoles } from '../quang-auth-store/quang-auth.selector'

@Directive({
  selector: '[quangHasRoles]'
})
export class HasRolesDirective implements OnInit, OnDestroy {
  /**
   * List of necessary roles
   */
  @Input() quangHasRoles: string[]
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
      select(selectHasRoles, { rolesId: this.quangHasRoles }),
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
