import { NgForOf, NgIf } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  Optional,
  TemplateRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangLoaderComponent } from '@quang/loader'
import { QuangModalComponent } from '@quang/overlay/modal'
import { QuangPopoverDirective } from '@quang/overlay/popover'
import { QuangToastComponent } from '@quang/overlay/toast'
import { QuangTooltipDirective } from '@quang/overlay/tooltip'
import { QuangTranslationService } from '@quang/translation'
import { SvgIconComponent } from 'angular-svg-icon'
import { delay, firstValueFrom } from 'rxjs'

import { AppService } from './app.service'
import { QuangToastService } from '@quang/overlay/toast/toast.service'

import { WysiwygTestComponent } from './pages/components-test-page/wysiwyg-test/wysiwyg-test.component'

export const DEPLOY_URL = new InjectionToken<string>('DEPLOY_URL')

@Component({
  selector: 'playground-root',
  imports: [
    RouterOutlet,
    NgIf,
    TranslocoPipe,
    QuangModalComponent,
    QuangToastComponent,
    QuangTooltipDirective,
    QuangPopoverDirective,
    QuangLoaderComponent,
    NgForOf,
    SvgIconComponent,
    WysiwygTestComponent,
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  style: HTMLLinkElement

  @ViewChild('customToast') customToast?: TemplateRef<any>

  title = signal('playground')

  quangTranslationService = inject(QuangTranslationService)

  quangToast = inject(QuangToastService)

  showModal = signal(false)

  content = signal('content')

  appService = inject(AppService)

  colorScheme = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

  constructor(
    private http: HttpClient,
    @Optional() @Inject(DEPLOY_URL) private readonly deployUrl: string
  ) {
    this.style = document.createElement('link')
    this.style.rel = 'stylesheet'
    document.head.appendChild(this.style)
  }

  changeLanguage(lang: string) {
    this.quangTranslationService.setActiveLang(lang)
  }

  async showLoader() {
    for (let i = 0; i < 20; i++) {
      const x = await firstValueFrom(this.http.get('https://jsonplaceholder.typicode.com/todos/1').pipe(delay(300)))
      console.log('call', x)
    }
  }

  openModal(): void {
    this.showModal.set(true)
  }

  closeModal(): void {
    this.showModal.set(false)
  }

  btnAction(): void {
    this.content.update((content) => `${content}!!!`)
  }

  openToast(type: 'success' | 'warning' | 'error', customIcon?: boolean): void {
    this.quangToast.openToast({
      type,
      title: type,
      position: 'bottom-center',
      text: 'beauty button here',
      customTemplate: this.customToast,
      showCloseButton: true,
      customIcon: customIcon ? './assets/icons/svg/calendar.svg' : '',
      timing: 5000,
    })
  }

  testApiCall(): void {
    this.appService.testHttpGet()
  }

  testUnauthorized(): void {
    this.appService.testHttpUnauthorized()
  }

  changeTheme(value: 'light' | 'dark') {
    this.style.href = `${this.deployUrl ?? ''}${value}.css`
    document.body.setAttribute('data-bs-theme', value)
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(value)
  }
}
