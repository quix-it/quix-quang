import { Injectable, effect, inject, output } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'

import { HashMap, TranslocoService } from '@jsverse/transloco'

import { AVAILABLE_LANGS, DEFAULT_LANG } from './translation-providers'

@Injectable()
export class QuangTranslationService {
  activeLang = output<string | undefined>()

  private readonly _translocoService: TranslocoService = inject(TranslocoService)
  _langChanges = toSignal(this._translocoService.langChanges$)
  langChangesEffect = effect(() => {
    this.activeLang.emit(this._langChanges())
  })
  private readonly _availableLangs = inject(AVAILABLE_LANGS)
  private readonly _defaultLang = inject(DEFAULT_LANG)

  setActiveLang(lang: string): void {
    let targetLang = lang
    if (!this._availableLangs.includes(lang)) {
      targetLang = this._defaultLang
    }
    this._translocoService.setActiveLang(targetLang)
  }

  getActiveLang(): string | undefined {
    return this._langChanges()
  }

  translate(key: string, params?: HashMap): string {
    return this._translocoService.translate(key, params)
  }
}
