import { NgForOf, NgIf } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, Inject, InjectionToken, Optional, inject, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { TranslocoPipe } from '@jsverse/transloco'
import { SvgIconComponent } from 'angular-svg-icon'
import { QuangLoaderComponent } from 'quang/loader'
import { QuangToastComponent } from 'quang/overlay/toast'
import { QuangTranslationService } from 'quang/translation'

import { AppService } from './app.service'
import { QuangToastService } from 'quang/overlay/toast/toast.service'

import { MenuComponent } from './core/menu/menu.component'

export const DEPLOY_URL = new InjectionToken<string>('DEPLOY_URL')

@Component({
  selector: 'playground-root',
  imports: [
    RouterOutlet,
    NgIf,
    TranslocoPipe,
    // QuangModalComponent,
    QuangToastComponent,
    // QuangTooltipDirective,
    // QuangPopoverDirective,
    QuangLoaderComponent,
    NgForOf,
    SvgIconComponent,
    MenuComponent,
    // WysiwygTestComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  style: HTMLLinkElement

  title = signal('playground')

  quangTranslationService = inject(QuangTranslationService)

  quangToast = inject(QuangToastService)

  showModal = signal(false)

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

  changeTheme(value: 'light' | 'dark') {
    this.style.href = `${this.deployUrl ?? ''}${value}.css`
    document.body.setAttribute('data-bs-theme', value)
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(value)
  }
}
