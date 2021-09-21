import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { distinctUntilChanged, takeUntil } from 'rxjs/operators'
import { select, Store } from '@ngrx/store'
import { selectHasRoles } from '../quang-keycloak-store/quang-keycloak.selector'
/**
 * directive decorator
 */
@Directive({
  selector: '[quangHasRoles]'
})
/**
 * has roles directive
 */
export class HasRolesDirective implements OnInit, OnDestroy {
  /**
   * the list of role needed to view the item
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
   * check with the selector if the user has all the necessary roles,
   * if he has them he displays the element otherwise he does not render them
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

  /**
   * unsubscribe the observable
   */
  ngOnDestroy (): void {
    this.destroy$.next('')
  }
}
