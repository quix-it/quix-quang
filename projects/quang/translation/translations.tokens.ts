import { InjectionToken } from '@angular/core'

export const AVAILABLE_LANGS = new InjectionToken<string[]>('AVAILABLE_LANGS')
export const DEFAULT_LANG = new InjectionToken<string>('DEFAULT_LANG')
export const FALLBACK_LANG = new InjectionToken<string>('FALLBACK_LANG')
export const TRANSLATIONS_BASE_PATH = new InjectionToken<string>('TRANSLATIONS_BASE_PATH')
