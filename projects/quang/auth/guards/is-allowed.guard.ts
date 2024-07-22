import { inject } from '@angular/core'
import type { CanActivateFn } from '@angular/router'

import { QuangAuthService } from '../auth.service'

export const isAllowedGuardFactory =
  (roles: string[], behavior: 'every' | 'atLeastOne'): CanActivateFn =>
  async () => {
    const authService = inject(QuangAuthService)
    const isAuthenticated = await authService.getAuthResult()
    if (!isAuthenticated) return false
    const isAllowedFunction = behavior === 'every' ? authService.hasEveryRole : authService.hasAtLeastOneRole
    return isAllowedFunction(roles)
  }
