import { inject } from '@angular/core'
import type { CanActivateFn } from '@angular/router'

import { QuangAuthService } from '../auth.service'

export const quangIsAuthenticatedGuard: CanActivateFn = async () => {
  const authService = inject(QuangAuthService)
  return authService.getAuthResult()
}
