import { InjectionToken } from '@angular/core'

export const EXCLUDED_URL = new InjectionToken<UrlData[]>('EXCLUDED_URL')

export type METHOD_TYPE = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export function isMethodType(value: string): value is METHOD_TYPE {
  return value === 'GET' || value === 'POST' || value === 'PUT' || value === 'DELETE' || value === 'PATCH'
}

export interface UrlData {
  url: string
  method: METHOD_TYPE
}
