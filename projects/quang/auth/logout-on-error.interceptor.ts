import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { InjectionToken, Provider, inject } from '@angular/core'

import { catchError, throwError } from 'rxjs'

import { UrlData, getExcludedUrlsByMethod, isHttpMethod } from '@quix/quang/shared'

import { QuangAuthService } from './auth.service'

import { QuangAuthFeature, QuangAuthFeatureKind, quangAuthFeature } from './auth-providers'

export const LOGOUT_STATUSES = new InjectionToken<number[]>('LOGOUT_STATUSES')
export const LOGOUT_EXCLUDED_URLS = new InjectionToken<UrlData[]>('LOGOUT_EXCLUDED_URLS')

export const logoutOnErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const quangAuthService = inject(QuangAuthService)
  const logoutStatuses = inject(LOGOUT_STATUSES, { optional: true }) ?? [401]
  const excludedUrlsByMethod = getExcludedUrlsByMethod(inject(LOGOUT_EXCLUDED_URLS, { optional: true }) ?? [])

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
    catchError((error: HttpErrorResponse) => {
      if (logoutStatuses.includes(error?.status)) {
        quangAuthService.logout()
      }
      return throwError(() => error)
    })
  )
}

export function withLogoutOnError(
  excludedUrls: UrlData[] = [],
  statuses = [401]
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
  ]
  return quangAuthFeature(QuangAuthFeatureKind.LogoutOnErrorFeature, providers)
}
