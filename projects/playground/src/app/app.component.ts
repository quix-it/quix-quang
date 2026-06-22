import { ChangeDetectionStrategy, Component, InjectionToken, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { QuangLoaderComponent } from 'quang/loader'
import { QuangToastComponent } from 'quang/overlay/toast'
import { QuangTranslationService } from 'quang/translation'

import { ThemeService } from './shared/services/theme.service'

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
  private readonly themeService = inject(ThemeService)
  private readonly quangTranslationService = inject(QuangTranslationService)

  constructor() {
    const theme = localStorage.getItem('theme') || 'light'
    this.themeService.changeTheme(theme as 'light' | 'dark')
    const language = localStorage.getItem('language') || 'en'
    this.quangTranslationService.setActiveLang(language)
  }
}
