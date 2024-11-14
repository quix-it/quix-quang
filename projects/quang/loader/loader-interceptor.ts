import { HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { inject } from '@angular/core'

import { finalize } from 'rxjs'

import { QuangLoaderService } from './loader.service'

import { EXCLUDED_URL, getExcludedUrlsByMethod, isMethodType } from '../auth/interceptor-methods'

export function quangLoaderInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const excludedUrlByMethod = getExcludedUrlsByMethod(inject(EXCLUDED_URL) ?? [{ url: 'assets', method: 'GET' }])
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
