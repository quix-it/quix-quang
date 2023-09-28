import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core'
import { Store } from '@ngrx/store'
import { Subject } from 'rxjs'
import { distinctUntilChanged, takeUntil } from 'rxjs/operators'

import { QuangKeycloakSelectors } from '../store/selectors'

@Directive({
  selector: '[quangHasAtLeastOneRole]'
})
export class QuangHasAtLeastOneRoleDirective implements OnInit, OnDestroy {
  @Input() quangHasAtLeastOneRole: string[]

  private readonly onDestroy$ = new Subject<void>()

  /**
   * constructor
   * @param view view access
   * @param template template access
   * @param authStore store access
   */
  constructor(
    private readonly view: ViewContainerRef,
    private readonly template: TemplateRef<any>,
    private readonly authStore: Store<any>
  ) {}

  /**
   * check with the selector if the user has at least one necessary role,
   * if he has them he displays the element otherwise he does not render them
   */
  ngOnInit(): void {
    this.authStore
      .select(
        QuangKeycloakSelectors.selectHasUntilRoles(this.quangHasAtLeastOneRole)
      )
      .pipe(distinctUntilChanged(), takeUntil(this.onDestroy$))
      .subscribe((hasRole) => {
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
  ngOnDestroy(): void {
    this.onDestroy$.next()
    this.onDestroy$.complete()
  }
}
