import { Directive, TemplateRef, ViewContainerRef, inject, input } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

import { distinctUntilChanged } from 'rxjs/operators'

import { QuangAuthService } from '../auth.service'

@Directive({
  selector: '[quangHasAtLeastOneRole]',
  standalone: true
})
export class QuangHasAtLeastOneRoleDirective {
  targetRoles = input.required<string[]>({ alias: 'quangHasAtLeastOneRole' })
  viewContainerRef = inject(ViewContainerRef)
  templateRef = inject(TemplateRef)
  authService = inject(QuangAuthService)
  takeUntilDestroyed = takeUntilDestroyed()

  constructor() {
    /**
     * check with the selector if the user has at least one necessary role,
     * if he has them he displays the element otherwise he does not render them
     */

    toObservable(this.authService.roles)
      .pipe(distinctUntilChanged(), this.takeUntilDestroyed)
      .subscribe(() => {
        const hasRole = this.authService.roles().some((role) => this.targetRoles().includes(role))
        if (hasRole) {
          this.viewContainerRef.createEmbeddedView(this.templateRef)
        } else {
          this.viewContainerRef.clear()
        }
      })
  }
}
