import { NgIf } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { TranslocoPipe } from '@ngneat/transloco'
import { delay } from 'rxjs'

import { QuangModalComponent } from '@quix/quang/components/modal'
import { QuangToastComponent } from '@quix/quang/components/toast'
import { QuangToastService } from '@quix/quang/components/toast/toast.service'
import { QuangTranslationService } from '@quix/quang/translation'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, TranslocoPipe, QuangModalComponent, QuangToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = signal('playground')

  quangTranslationService = signal(inject(QuangTranslationService))
  quangToast = signal(inject(QuangToastService))
  showModal = signal(false)
  content = signal('content')

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

  openModal(): void {
    this.showModal.set(true)
  }

  closeModal(): void {
    setTimeout(() => {
      this.showModal.set(false)
    }, 400)
  }

  btnAction(): void {
    this.content.update((content) => content + '!!!')
  }
}
