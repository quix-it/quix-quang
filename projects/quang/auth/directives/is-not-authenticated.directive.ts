import { Directive, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

import { distinctUntilChanged } from 'rxjs/operators'

import { AuthService } from '../auth.service'

@Directive({
  selector: '[quangIsNotAuthenticated]',
  standalone: true
})
export class QuangIsNotAuthenticatedDirective implements OnInit {
  viewContainerRef = inject(ViewContainerRef)
  templateRef = inject(TemplateRef)
  authService = inject(AuthService)
  takeUntilDestroyed = takeUntilDestroyed()

  /**
   * Check if the user in the store is authenticated and define whether to render or not
   */
  ngOnInit(): void {
    toObservable(this.authService.isAuthenticated)
      .pipe(distinctUntilChanged(), this.takeUntilDestroyed)
      .subscribe(() => {
        if (!this.authService.isAuthenticated()) {
          this.viewContainerRef.createEmbeddedView(this.templateRef)
        } else {
          this.viewContainerRef.clear()
        }
      })
  }
}
