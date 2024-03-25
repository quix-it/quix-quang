import { Injectable, inject } from '@angular/core'

import { AVAILABLE_LANGS } from './translation.module'

@Injectable({
  providedIn: 'root'
})
export class QuangTranslationService {
  private readonly translocoService: TranslocoService

  private readonly availableLangs = inject(AVAILABLE_LANGS)
  private readonly defaultLang = inject(DEFAULT_LANG)

  setActiveLang(lang: string): void {
    let targetLang = lang
    if (!this.availableLangs.includes(lang)) {
      targetLang = this.defaultLang
    }
    this.translocoService.setActiveLang(targetLang)
  }
}
