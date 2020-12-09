import {Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject} from "rxjs";
import {select, Store} from "@ngrx/store";
import {distinctUntilChanged, takeUntil} from "rxjs/operators";
import {selectIsAuthenticated} from "../quang-keycloak-store/quang-keycloack.selector";

@Directive({
  selector: '[quangIsAuthenticated]'
})
export class IsAuthenticatedDirective implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  constructor(
    private authStore: Store<any>,
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
  }

  ngOnInit(): void {
    this.authStore.pipe(
      select(selectIsAuthenticated),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(user => {
      if (user) {
        this.view.createEmbeddedView(this.template);
      } else {
        this.view.clear()
      }
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}

