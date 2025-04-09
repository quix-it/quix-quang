import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { InjectionToken, Provider, inject } from '@angular/core'

import { UrlData, getExcludedUrlsByMethod, isHttpMethod } from '@quang-lib/shared'
import { catchError, from, retry, switchMap, tap, throwError } from 'rxjs'

import { QuangAuthService } from './auth.service'

import { QuangAuthFeature, QuangAuthFeatureKind, quangAuthFeature } from './auth-providers'

export const LOGOUT_RETRIES = new InjectionToken<number>('LOGOUT_RETRIES')
export const LOGOUT_STATUSES = new InjectionToken<number[]>('LOGOUT_STATUSES')
export const LOGOUT_EXCLUDED_URLS = new InjectionToken<UrlData[]>('LOGOUT_EXCLUDED_URLS')

export const logoutOnErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const quangAuthService = inject(QuangAuthService)
  const logoutStatuses = inject(LOGOUT_STATUSES, { optional: true }) ?? [401]
  const excludedUrlsByMethod = getExcludedUrlsByMethod(inject(LOGOUT_EXCLUDED_URLS, { optional: true }) ?? [])
  const retries = inject(LOGOUT_RETRIES, { optional: true }) ?? 4

  if (!isHttpMethod(request.method)) {
    return next(request)
  }

  if (
    Array.from(excludedUrlsByMethod.get(request.method) ?? []).some((excludedUrl) =>
      request.url.match(excludedUrl.replace(/\//g, '\\/'))
    )
  ) {
    return next(request)
  }

  return next(request).pipe(
    retry({ count: retries, delay: 300 }),
    catchError((error: HttpErrorResponse) => {
      if (logoutStatuses.includes(error?.status))
        return from(quangAuthService.checkForAuthentication(true)).pipe(
          tap((isAuthenticated) => {
            if (!isAuthenticated) quangAuthService.logout()
          }),
          switchMap(() => throwError(() => error))
        )
      return throwError(() => error)
    }),
    retry({ count: 1, delay: 500 })
  )
}

export function withLogoutOnError(
  excludedUrls: UrlData[] = [],
  statuses = [401],
  retries = 4
): QuangAuthFeature<QuangAuthFeatureKind.LogoutOnErrorFeature> {
  const providers: Provider[] = [
    {
      provide: LOGOUT_STATUSES,
      useValue: statuses,
    },
    {
      provide: LOGOUT_EXCLUDED_URLS,
      useValue: excludedUrls,
    },
    {
      provide: LOGOUT_RETRIES,
      useValue: retries,
    },
  ]
  return quangAuthFeature(QuangAuthFeatureKind.LogoutOnErrorFeature, providers)
}
