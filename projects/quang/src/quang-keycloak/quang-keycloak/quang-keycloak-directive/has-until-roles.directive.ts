import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject} from "rxjs";
import {select, Store} from "@ngrx/store";

import {distinctUntilChanged, takeUntil} from "rxjs/operators";
import {selectHasUntilRoles} from "../quang-keycloak-store/quang-keycloack.selector";


@Directive({
  selector: '[quangHasUntilRoles]'
})
export class HasUntilRolesDirective {

  @Input() quangHasUntilRoles: string[];
  private destroy$ = new Subject()

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>,
    private authStore: Store<any>
  ) {
  }
  ngOnInit(): void {
    this.authStore.pipe(
      select(selectHasUntilRoles, {rolesId: this.quangHasUntilRoles}),
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
