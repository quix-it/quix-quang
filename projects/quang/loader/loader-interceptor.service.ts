import { HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { inject } from '@angular/core'

import { finalize } from 'rxjs'

import { QuangLoaderService } from './loader.service'

import { EXCLUDED_URL, METHOD_TYPE, UrlData, isMethodType } from './loader-config'

export function quangLoaderInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const excludedUrlByMethod = getExcludedUrlsByMethod(inject(EXCLUDED_URL))
  const loaderService = inject(QuangLoaderService)
  console.log('ciao')
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
