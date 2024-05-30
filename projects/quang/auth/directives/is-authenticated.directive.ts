import { Directive, TemplateRef, ViewContainerRef, inject } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

import { distinctUntilChanged } from 'rxjs/operators'

import { AuthService } from '../auth.service'

@Directive({
  selector: '[quangIsAuthenticated]',
  standalone: true
})
export class QuangIsAuthenticatedDirective {
  viewContainerRef = inject(ViewContainerRef)
  templateRef = inject(TemplateRef)
  authService = inject(AuthService)
  takeUntilDestroyed = takeUntilDestroyed()

  constructor() {
    /**
     * Check if the user in the store is authenticated and define whether to render or not
     */
    toObservable(this.authService.isAuthenticated)
      .pipe(distinctUntilChanged(), this.takeUntilDestroyed)
      .subscribe(() => {
        if (this.authService.isAuthenticated()) {
          this.viewContainerRef.createEmbeddedView(this.templateRef)
        } else {
          this.viewContainerRef.clear()
        }
      })
  }
}
