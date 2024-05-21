import { Directive, OnInit, TemplateRef, ViewContainerRef, inject, input } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

import { distinctUntilChanged } from 'rxjs/operators'

import { AuthService } from '../auth.service'

@Directive({
  selector: '[quangHasEveryRole]',
  standalone: true
})
export class QuangHasEveryRoleDirective implements OnInit {
  targetRoles = input.required<string[]>({ alias: 'quangHasEveryRole' })
  viewContainerRef = inject(ViewContainerRef)
  templateRef = inject(TemplateRef)
  authService = inject(AuthService)
  takeUntilDestroyed = takeUntilDestroyed()

  /**
   * check with the selector if the user has at least one necessary role,
   * if he has them he displays the element otherwise he does not render them
   */
  ngOnInit(): void {
    toObservable(this.authService.roles)
      .pipe(distinctUntilChanged(), this.takeUntilDestroyed)
      .subscribe(() => {
        const hasRole = this.authService.roles().every((role) => this.targetRoles().includes(role))
        if (hasRole) {
          this.viewContainerRef.createEmbeddedView(this.templateRef)
        } else {
          this.viewContainerRef.clear()
        }
      })
  }
}
