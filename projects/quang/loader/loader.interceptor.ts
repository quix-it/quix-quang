import { HttpInterceptorFn } from '@angular/common/http'
import { InjectionToken, inject } from '@angular/core'

import { finalize } from 'rxjs'

import { UrlData, getExcludedUrlsByMethod, isHttpMethod } from '@quix/quang/shared'

import { QuangLoaderService } from './loader.service'

export const LOADER_EXCLUDED_URLS = new InjectionToken<UrlData[]>('LOADER_EXCLUDED_URLS')

/**
 *  @deprecated
 *  @see {@link LOADER_EXCLUDED_URLS}
 */
export const EXCLUDED_URL = LOADER_EXCLUDED_URLS

export const quangLoaderInterceptor: HttpInterceptorFn = (request, next) => {
  const excludedUrlsByMethod = getExcludedUrlsByMethod(inject(LOADER_EXCLUDED_URLS, { optional: true }) ?? [])
  const loaderService = inject(QuangLoaderService)
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

  loaderService.show()

  return next(request).pipe(
    finalize(() => {
      loaderService.hide()
    })
  )
}
