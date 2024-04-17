import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Inject, Injectable, Optional } from '@angular/core'

import { Observable, finalize } from 'rxjs'

import { QuangLoaderService } from './loader.service'

import { EXCLUDED_URL, METHOD_TYPE, UrlData, isMethodType } from './loader-config'

@Injectable()
export class QuangLoaderInterceptor implements HttpInterceptor {
  excludedUrlByMethod = new Map<METHOD_TYPE, Set<string>>([
    ['GET', new Set()],
    ['PUT', new Set()],
    ['DELETE', new Set()],
    ['POST', new Set()],
    ['PATCH', new Set()]
  ])

  constructor(
    private readonly loaderService: QuangLoaderService,
    @Optional()
    @Inject(EXCLUDED_URL)
    readonly defaultExcludedUrls: UrlData[] | null
  ) {
    this.addExcludedUrls(defaultExcludedUrls ?? [])
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request', request)
    if (!isMethodType(request.method)) {
      return next.handle(request)
    }

    if (
      Array.from(this.excludedUrlByMethod.get(request.method) ?? []).some((urlData) =>
        request.url.match(urlData.replace(/\//g, '\\/'))
      )
    ) {
      return next.handle(request)
    }

    this.loaderService.show()

    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.hide()
      })
    )
  }

  public addExcludedUrls(urlData: UrlData[]) {
    for (const url of urlData) {
      this.excludedUrlByMethod.get(url.method ?? 'GET')?.add(url.url)
    }
  }
}
