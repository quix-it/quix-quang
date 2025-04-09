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

import { QUANG_LOGGING_BEHAVIOR } from 'quang'

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
})
export class QuangHasAtLeastOneRoleDirective {
  logLevel = inject(QUANG_LOGGING_BEHAVIOR, { optional: true })

  targetRoles = input.required<string[]>({ alias: 'quangHasAtLeastOneRole' })

  viewContainerRef = inject(ViewContainerRef)

  embeddedViewRef: EmbeddedViewRef<unknown> | null = null

  templateRef = inject(TemplateRef)

  authService = inject(QuangAuthService)

  takeUntilDestroyed = takeUntilDestroyed()

  changeDetectorRef = inject(ChangeDetectorRef)

  hideViewIfNotAllowed = effect(() => {
    if (this.logLevel === 'verbose')
      console.debug({ userRoles: this.authService.roles(), rolesToCheck: this.targetRoles() })
    const isAllowed = this.authService.hasAtLeastOneRole(this.targetRoles())
    if (isAllowed) {
      if (!this.embeddedViewRef) this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear()
      this.embeddedViewRef = null
    }
    this.changeDetectorRef.markForCheck()
  })
}
