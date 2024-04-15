import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { delay } from 'rxjs'

import { QuangLoaderInterceptor } from '@quix/quang/components/loader/loader-interceptor.service'
import { QuangLoaderComponent } from '@quix/quang/components/loader/loader.component'
import { QuangLoaderService } from '@quix/quang/components/loader/loader.service'
import { QuangTranslationModule, QuangTranslationService } from '@quix/quang/translation'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuangTranslationModule, QuangLoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    QuangLoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: QuangLoaderInterceptor,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = signal('playground')

  quangTranslationService = signal(inject(QuangTranslationService))

  constructor(private http: HttpClient) {}

  changeLanguage(lang: string) {
    this.quangTranslationService().setActiveLang(lang)
  }

  showLoader() {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(delay(500))
      .subscribe((x) => {
        console.log('call', x)
      })
  }
}
