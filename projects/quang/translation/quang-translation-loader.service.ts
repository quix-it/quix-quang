import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'

import { HashMap, Translation, TranslocoLoader } from '@ngneat/transloco'
import { Observable } from 'rxjs'

@Injectable()
export class QuangTranslationLoaderService implements TranslocoLoader {
  private readonly httpClient: HttpClient = inject(HttpClient)

  getTranslation(lang: string): Observable<HashMap<any>> {
    return this.httpClient.get<Translation>(`/assets/i18n/${lang}.json`)
  }
}
