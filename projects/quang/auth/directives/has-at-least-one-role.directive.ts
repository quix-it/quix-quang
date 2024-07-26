import { Directive, EmbeddedViewRef, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { QuangAuthService } from '../auth.service'

/**
 * This directive conditionally renders the associated template if the authenticated user
 * has at least one of the specified roles. By using the `QuangAuthService.hasAtLeastOneRole()` method it checks the user's roles against
 * the required roles provided through the `quangHasAtLeastOneRole` directive.
 *
 * @example
 * <div *quangHasAtLeastOneRole="['admin', 'editor']">
 *   This content will only be visible to users with 'admin' or 'editor' roles.
 * </div>
 */
@Directive({
  selector: '[quangHasAtLeastOneRole]',
  standalone: true
})
export class QuangHasAtLeastOneRoleDirective {
  targetRoles = input.required<string[]>({ alias: 'quangHasAtLeastOneRole' })
  viewContainerRef = inject(ViewContainerRef)
  embeddedViewRef: EmbeddedViewRef<any> | null = null
  templateRef = inject(TemplateRef)
  authService = inject(QuangAuthService)
  takeUntilDestroyed = takeUntilDestroyed()

  hideViewIfNotAllowed = effect(() => {
    if (this.authService.showDebugInformation)
      console.debug({ userRoles: this.authService.roles(), rolesToCheck: this.targetRoles() })
    const isAllowed = this.authService.hasAtLeastOneRole(this.targetRoles())
    if (isAllowed) {
      if (!this.embeddedViewRef) this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear()
      this.embeddedViewRef = null
    }
  })
}
