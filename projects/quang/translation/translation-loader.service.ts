import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'

import { Translation, TranslocoLoader } from '@jsverse/transloco'
import { Observable } from 'rxjs'

import { TRANSLATIONS_BASE_PATH } from './translations.tokens'

@Injectable()
export class QuangTranslationLoaderService implements TranslocoLoader {
  private readonly httpClient: HttpClient = inject(HttpClient)

  private readonly translationBasePath = inject(TRANSLATIONS_BASE_PATH, { optional: true })

  getTranslation(lang: string): Observable<Translation> | Promise<Translation> {
    return this.httpClient.get<Translation>(`${this.translationBasePath ?? './'}assets/i18n/${lang}.json`)
  }
}
