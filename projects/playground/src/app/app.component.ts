import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { QuangTranslationModule, QuangTranslationService } from '@quix/quang/translation'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuangTranslationModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = signal('playground')

  quangTranslationService = signal(inject(QuangTranslationService))

  changeLanguage(lang: string) {
    this.quangTranslationService().setActiveLang(lang)
  }
}
