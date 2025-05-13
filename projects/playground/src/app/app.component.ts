import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, Inject, InjectionToken, Optional, inject, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { QuangLoaderComponent } from 'quang/loader'
import { QuangToastComponent } from 'quang/overlay/toast'
import { QuangTranslationService } from 'quang/translation'

import { AppService } from './app.service'
import { QuangToastService } from 'quang/overlay/toast/toast.service'

import { MenuComponent } from './core/menu/menu.component'

export const DEPLOY_URL = new InjectionToken<string>('DEPLOY_URL')

@Component({
  selector: 'playground-root',
  imports: [RouterOutlet, QuangToastComponent, QuangLoaderComponent, MenuComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  title = signal('playground')

  quangTranslationService = inject(QuangTranslationService)

  quangToast = inject(QuangToastService)

  showModal = signal(false)

  appService = inject(AppService)

  changeLanguage(lang: string) {
    this.quangTranslationService.setActiveLang(lang)
  }
}
