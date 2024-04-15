import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { delay, of } from 'rxjs'

import { QuangLoaderComponent } from '@quix/quang/components/loader/loader.component'
import { QuangTranslationModule, QuangTranslationService } from '@quix/quang/translation'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuangTranslationModule, QuangLoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
    // for (let i = 0; i < 20; i++) {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(delay(500))
      .subscribe((x) => {
        console.log('call', x)
      })
  }
  // }
}
