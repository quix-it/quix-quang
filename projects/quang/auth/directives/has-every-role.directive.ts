import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { QuangAuthService } from '../auth.service'

/**
 * This directive conditionally renders the associated template if the authenticated user
 * has every of the specified roles. By using the `QuangAuthService.hasEveryRole()` method it checks the user's roles against
 * the required roles provided through the `quangHasEveryRole` required input.
 *
 * @example
 * <div *quangHasEveryRole="['admin', 'editor']">
 *   This content will only be visible to users with 'admin' and 'editor' roles.
 * </div>
 */
@Directive({
  selector: '[quangHasEveryRole]',
  standalone: true,
})
export class QuangHasEveryRoleDirective {
  targetRoles = input.required<string[]>({ alias: 'quangHasEveryRole' })

  viewContainerRef = inject(ViewContainerRef)

  embeddedViewRef: EmbeddedViewRef<any> | null = null

  templateRef = inject(TemplateRef)

  authService = inject(QuangAuthService)

  takeUntilDestroyed = takeUntilDestroyed()

  changeDetectorRef = inject(ChangeDetectorRef)

  hideViewIfNotAllowed = effect(() => {
    if (this.authService.showDebugInformation)
      // eslint-disable-next-line no-console
      console.debug({ userRoles: this.authService.roles(), rolesToCheck: this.targetRoles() })
    const isAllowed = this.authService.hasEveryRole(this.targetRoles())
    if (isAllowed) {
      if (!this.embeddedViewRef) this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear()
      this.embeddedViewRef = null
    }
    this.changeDetectorRef.markForCheck()
  })
}
