import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { selectHasRoles, selectUserRoles } from '../quang-auth-store/selectors/quang-auth.selectors'

/**
 * directive decorator
 */
@Directive({
  selector: '[quangHasRoles]'
})
/**
 * has role directive
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
   * Check if the user in the store has the required roles and define whether to render or not
   */
  ngOnInit (): void {
    this.authStore
      .select(selectHasRoles(this.quangHasRoles))
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
    this.destroy$.complete()
  }
}
