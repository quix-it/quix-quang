import { Directive, EmbeddedViewRef, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { QuangAuthService } from '../auth.service'

@Directive({
  selector: '[quangHasEveryRole]',
  standalone: true
})
export class QuangHasEveryRoleDirective {
  targetRoles = input.required<string[]>({ alias: 'quangHasEveryRole' })
  viewContainerRef = inject(ViewContainerRef)
  embeddedViewRef: EmbeddedViewRef<any> | null = null
  templateRef = inject(TemplateRef)
  authService = inject(QuangAuthService)
  takeUntilDestroyed = takeUntilDestroyed()

  hideViewIfNotAllowed = effect(() => {
    if (this.authService.showDebugInformation)
      console.debug({ userRoles: this.authService.roles(), rolesToCheck: this.targetRoles() })
    const isAllowed = this.authService.hasEveryRole(this.targetRoles())
    if (isAllowed) {
      if (!this.embeddedViewRef) this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear()
      this.embeddedViewRef = null
    }
  })
}
