import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectHasRoles, selectHasUntilRoles} from "../store/user.selector";
import {distinctUntilChanged, takeUntil} from "rxjs/operators";

@Directive({
  selector: '[quixHasUntilRoles]'
})
export class HasUntilRolesDirective {

  @Input() quixHasUntilRoles: string[];
  private destroy$ = new Subject()

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>,
    private authStore: Store<any>
  ) {
  }
  ngOnInit(): void {
    this.authStore.pipe(
      select(selectHasUntilRoles, {rolesId: this.quixHasUntilRoles}),
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

  ngOnDestroy(): void {
    this.destroy$.next()
  }
}
