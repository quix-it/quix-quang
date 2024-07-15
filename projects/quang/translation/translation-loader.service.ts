import { HttpClient } from '@angular/common/http'
import { Injectable, Optional, inject } from '@angular/core'

import { Translation, TranslocoLoader } from '@jsverse/transloco'
import { TranslocoLoaderData } from '@jsverse/transloco/lib/transloco.loader'
import { Observable } from 'rxjs'

import { TRANSLATIONS_BASE_PATH } from './translation-providers'

@Injectable()
export class QuangTranslationLoaderService implements TranslocoLoader {
  private readonly httpClient: HttpClient = inject(HttpClient)
  @Optional() private readonly translationBasePath: string = inject(TRANSLATIONS_BASE_PATH)

  getTranslation(lang: string, data?: TranslocoLoaderData): Observable<Translation> | Promise<Translation> {
    console.log('loading translation --->', lang, 'path', this.translationBasePath)
    return this.httpClient.get<Translation>(`${this.translationBasePath ?? './'}assets/i18n/${lang}.json`)
  }
}
