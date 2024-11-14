import { InjectionToken } from '@angular/core'

export const EXCLUDED_URL = new InjectionToken<UrlData[]>('EXCLUDED_URL')

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export function isMethodType(value: string): value is HttpMethod {
  return ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(value)
}

export interface UrlData {
  url: string
  method: HttpMethod
}

/**
 * @example
 * providers: [
 * provideHttpClient(withInterceptors([quangLoaderInterceptor]))
 * ]
 */

export function getExcludedUrlsByMethod(urlData: UrlData[]) {
  const excludedUrlByMethod = new Map<HttpMethod, Set<string>>([
    ['GET', new Set()],
    ['PUT', new Set()],
    ['DELETE', new Set()],
    ['POST', new Set()],
    ['PATCH', new Set()],
  ])
  for (const { method, url } of urlData) {
    excludedUrlByMethod.get(method ?? 'GET')?.add(url)
  }
  return excludedUrlByMethod
}
