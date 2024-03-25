import { HttpClient } from '@angular/common/http'
import { Injectable, NgModule } from '@angular/core'

import {
  HashMap,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TranslocoModule,
  translocoConfig
} from '@ngneat/transloco'
import { Observable } from 'rxjs'

import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private readonly http: HttpClient) {}

  getTranslation(lang: string): Observable<HashMap<any>> {
    return this.http.get<Translation>(`/kitchen-sink/assets/i18n/${lang}.json`)
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['it', 'en'],
        defaultLang: 'it',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: false,
        prodMode: environment.production,
        missingHandler: {
          logMissingKey: false
        }
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ]
})
export class TranslocoRootModule {}
