import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http'
import { Inject, Injectable, Optional, inject } from '@angular/core'

import { Observable, finalize } from 'rxjs'

import { QuangLoaderService } from './loader.service'

import { EXCLUDED_URL, METHOD_TYPE, UrlData, isMethodType } from './loader-config'

export const excludedUrlByMethod = new Map<METHOD_TYPE, Set<string>>([
  ['GET', new Set()],
  ['PUT', new Set()],
  ['DELETE', new Set()],
  ['POST', new Set()],
  ['PATCH', new Set()]
])

export const loaderInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  console.log('request', request)
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

export function addExcludedUrls(urlData: UrlData[]) {
  for (const url of urlData) {
    excludedUrlByMethod.get(url.method ?? 'GET')?.add(url.url)
  }
}

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
