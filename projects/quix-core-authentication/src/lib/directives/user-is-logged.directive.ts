import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject} from "rxjs";

import {distinctUntilChanged, takeUntil} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {selectLogged} from "../store/user.selector";


@Directive({
  selector: '[quixUserIsLogged]'
})
export class UserIsLoggedDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  constructor(
    private authStore: Store<any>,
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
  }

  ngOnInit(): void {
    this.authStore.pipe(
      select(selectLogged),
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
