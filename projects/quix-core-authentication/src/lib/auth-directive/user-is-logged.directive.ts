import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject} from "rxjs";
import {QuixAuthService} from "../auth/quix-auth.service";
import {distinctUntilChanged, takeUntil} from "rxjs/operators";

@Directive({
  selector: '[quixUserIsLogged]'
})
export class UserIsLoggedDirective implements OnInit, OnDestroy{
  private destroy$ = new Subject();

  constructor(
    private authService: QuixAuthService,
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
  }

  ngOnInit(): void {
    this.authService.getStoredUser().pipe(
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
