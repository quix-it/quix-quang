import { HttpClient } from '@angular/common/http'
import { Injectable, Optional, inject } from '@angular/core'

import { HashMap, Translation, TranslocoLoader } from '@ngneat/transloco'
import { Observable } from 'rxjs'

import { TRANSLATIONS_BASE_PATH } from './translation-providers'

@Injectable()
export class QuangTranslationLoaderService implements TranslocoLoader {
  private readonly httpClient: HttpClient = inject(HttpClient)
  @Optional() private readonly translationBasePath: string = inject(TRANSLATIONS_BASE_PATH)

  getTranslation(lang: string): Observable<HashMap<any>> {
    return this.httpClient.get<Translation>(`${this.translationBasePath ?? '/'}assets/i18n/${lang}.json`)
  }
}
