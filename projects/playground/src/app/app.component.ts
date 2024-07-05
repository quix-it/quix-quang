import { NgIf } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, inject, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangLoaderComponent } from '@quix/quang/loader'
import { QuangModalComponent } from '@quix/quang/overlay/modal'
import { QuangPopoverDirective } from '@quix/quang/overlay/popover'
import { QuangPopoverComponent } from '@quix/quang/overlay/popover/popover.component'
import { QuangToastComponent } from '@quix/quang/overlay/toast'
import { QuangToastService } from '@quix/quang/overlay/toast/toast.service'
import { QuangTooltipDirective } from '@quix/quang/overlay/tooltip'
import { QuangTranslationService } from '@quix/quang/translation'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    TranslocoPipe,
    QuangModalComponent,
    QuangToastComponent,
    QuangTooltipDirective,
    QuangPopoverDirective,
    QuangLoaderComponent,
    QuangPopoverComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild('customToast') customToast?: TemplateRef<any>
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
    for (let i = 0; i < 20; i++) {
      this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe((x) => {
        console.log('call', x)
      })
    }
  }

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

  openToast(): void {
    this.quangToast().openToast({
      type: 'warning',
      title: 'Hello world!',
      position: 'bottom-center',
      text: 'beauty button here',
      customTemplate: this.customToast,
      showCloseButton: true,
      customIcon: './assets/icons/svg/calendar.svg',
      timing: 50000000
    })
  }
}
