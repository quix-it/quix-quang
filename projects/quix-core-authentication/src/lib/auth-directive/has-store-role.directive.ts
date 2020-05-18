import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

import {Subject} from "rxjs";
import {distinctUntilChanged, takeUntil} from "rxjs/operators";
import {QuixAuthService} from "../auth/quix-auth.service";

@Directive({
  selector: '[quixHasStoreRole]'
})
export class HasStoreRoleDirective implements OnInit, OnDestroy {
  @Input() quixHasStoreRole: string;
  private destroy$ = new Subject();

  constructor(
    private authService: QuixAuthService,
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
  }

  ngOnInit(): void {
    this.authService.hasStoredRole(this.quixHasStoreRole).pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(hasRole => {
      if (hasRole) {
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
