import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { selectIsAuthenticated } from '../quang-auth-store/quang-auth.selector'
import { distinctUntilChanged, takeUntil } from 'rxjs/operators'

@Directive({
  selector: '[quangIsAuthenticated]'
})
export class IsAuthenticatedDirective implements OnInit, OnDestroy {

  private destroy$ = new Subject()

  constructor (
    private authStore: Store<any>,
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
  }

  /**
   * Check if the user in the store is logged and define whether to render or not
   */
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

  ngOnDestroy (): void {
    this.destroy$.next()
  }

}

