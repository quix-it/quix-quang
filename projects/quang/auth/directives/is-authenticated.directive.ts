import { Directive, EmbeddedViewRef, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { QuangAuthService } from '../auth.service'

@Directive({
  selector: '[quangIsAuthenticated]',
  standalone: true
})
export class QuangIsAuthenticatedDirective {
  viewContainerRef = inject(ViewContainerRef)
  templateRef = inject(TemplateRef)
  embeddedViewRef: EmbeddedViewRef<any> | null = null
  authService = inject(QuangAuthService)
  takeUntilDestroyed = takeUntilDestroyed()

  hideViewIfNotAuthenticated = effect(() => {
    if (this.authService.isAuthenticated()) {
      if (!this.embeddedViewRef) this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear()
      this.embeddedViewRef = null
    }
  })
}
