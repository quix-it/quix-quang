import { Directive, EmbeddedViewRef, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { QuangAuthService } from '../auth.service'

@Directive({
  selector: '[quangIsNotAuthenticated]',
  standalone: true
})
export class QuangIsNotAuthenticatedDirective {
  viewContainerRef = inject(ViewContainerRef)
  templateRef = inject(TemplateRef)
  embeddedViewRef: EmbeddedViewRef<any> | null = null
  authService = inject(QuangAuthService)
  takeUntilDestroyed = takeUntilDestroyed()

  showViewIfNotAuthenticated = effect(() => {
    if (this.authService.isAuthenticated()) {
      this.viewContainerRef.clear()
      this.embeddedViewRef = null
    } else if (!this.embeddedViewRef) this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef)
  })
}
