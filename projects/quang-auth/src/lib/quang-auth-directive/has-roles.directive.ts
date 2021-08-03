import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { distinctUntilChanged, takeUntil } from 'rxjs/operators'
import { select, Store } from '@ngrx/store'
import { selectHasRoles } from '../quang-auth-store/quang-auth.selector'

@Directive({
  selector: '[quangHasRoles]'
})
/**
 *
 */
export class HasRolesDirective implements OnInit, OnDestroy {
  /**
   * List of necessary roles
   */
  @Input() quangHasRoles: string[]
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
