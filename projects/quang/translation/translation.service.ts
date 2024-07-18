import { Injectable, effect, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'

import { HashMap, SetTranslationOptions, Translation, TranslocoService } from '@jsverse/transloco'

import { AVAILABLE_LANGS, DEFAULT_LANG } from './translation-providers'

@Injectable()
export class QuangTranslationService {
  activeLang = signal<string | null>(null)

  private readonly _translocoService: TranslocoService = inject(TranslocoService)
  _langChanges = toSignal(this._translocoService.langChanges$, { initialValue: null })
  langChangesEffect = effect(() => {
    this.activeLang.set(this._langChanges())
  })
  private readonly _availableLangs = inject(AVAILABLE_LANGS)
  private readonly _defaultLang = inject(DEFAULT_LANG)

  setActiveLang(lang: string): void {
    const targetLang = this._availableLangs.includes(lang) ? lang : this._defaultLang
    this._translocoService.setActiveLang(targetLang)
  }

  getActiveLang(): string | null {
    return this._langChanges()
  }

  translate(key: string, params?: HashMap): string {
    return this._translocoService.translate(key, params)
  }

  setTranslation(translation: Translation, lang?: string, options?: SetTranslationOptions) {
    return this._translocoService.setTranslation(translation, lang, options)
  }

  setTranslationKey(key: string, value: string, options?: Omit<SetTranslationOptions, 'merge'>) {
    return this._translocoService.setTranslationKey(key, value, options)
  }
}
