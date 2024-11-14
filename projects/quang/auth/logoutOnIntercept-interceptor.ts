import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { InjectionToken, inject } from '@angular/core'

import { catchError, throwError } from 'rxjs'

import { QuangAuthService } from './auth.service'

import { UrlData, getExcludedUrlsByMethod, isMethodType } from './interceptor-methods'

export const ON_STATUS_LOGOUT = new InjectionToken<number[]>('ON_STATUS_LOGOUT')
export const LOGOUT_EXCLUDED_URL = new InjectionToken<UrlData[]>('LOGOUT_EXCLUDED_URL')

export function logoutOnIntercept(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const quangAuthService = inject(QuangAuthService)
  const statusLogutList = inject(ON_STATUS_LOGOUT, { optional: true }) ?? [401]
  const excludedUrlByMethod = getExcludedUrlsByMethod(
    inject(LOGOUT_EXCLUDED_URL, { optional: true }) ?? [{ url: 'assets', method: 'GET' }]
  )

  if (!isMethodType(request.method)) {
    return next(request)
  }

  if (
    Array.from(excludedUrlByMethod.get(request.method) ?? []).some((urlData) =>
      request.url.match(urlData.replace(/\//g, '\\/'))
    )
  ) {
    return next(request)
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (statusLogutList.includes(error?.status)) {
        quangAuthService.logout()
      }
      return throwError(() => error)
    })
  )
}
