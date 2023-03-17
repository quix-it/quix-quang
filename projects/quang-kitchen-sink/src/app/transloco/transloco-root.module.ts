import { HttpClient } from '@angular/common/http'
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
  HashMap
} from '@ngneat/transloco'
import { Injectable, NgModule } from '@angular/core'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'

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
        prodMode: environment.production
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ]
})
export class TranslocoRootModule {}
