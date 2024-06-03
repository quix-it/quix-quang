import { HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { InjectionToken, inject } from '@angular/core'

import { finalize } from 'rxjs'

import { QuangLoaderService } from './loader.service'

export const EXCLUDED_URL = new InjectionToken<UrlData[]>('EXCLUDED_URL')

export type METHOD_TYPE = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export function isMethodType(value: string): value is METHOD_TYPE {
  return value === 'GET' || value === 'POST' || value === 'PUT' || value === 'DELETE' || value === 'PATCH'
}

export interface UrlData {
  url: string
  method: METHOD_TYPE
}

export function quangLoaderInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const excludedUrlByMethod = getExcludedUrlsByMethod(inject(EXCLUDED_URL))
  const loaderService = inject(QuangLoaderService)
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

  loaderService.show()

  return next(request).pipe(
    finalize(() => {
      loaderService.hide()
    })
  )
}

function getExcludedUrlsByMethod(urlData: UrlData[]) {
  const excludedUrlByMethod = new Map<METHOD_TYPE, Set<string>>([
    ['GET', new Set()],
    ['PUT', new Set()],
    ['DELETE', new Set()],
    ['POST', new Set()],
    ['PATCH', new Set()]
  ])
  for (const url of urlData) {
    excludedUrlByMethod.get(url.method ?? 'GET')?.add(url.url)
  }
  return excludedUrlByMethod
}
