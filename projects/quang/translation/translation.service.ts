import { Injectable, inject } from '@angular/core'

import { TranslocoService } from '@ngneat/transloco'

import { AVAILABLE_LANGS, DEFAULT_LANG } from './translation.module'

@Injectable({
  providedIn: 'root'
})
export class QuangTranslationService {
  private readonly translocoService: TranslocoService = inject(TranslocoService)

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
