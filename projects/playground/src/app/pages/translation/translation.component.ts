import { CommonModule, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { QuangTooltipDirective } from 'quang/overlay/tooltip'

@Component({
  selector: 'playground-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslocoPipe, AngularSvgIconModule, QuangTooltipDirective, NgTemplateOutlet],
})
export class TranslationComponent {
  buttonTooltip = signal<string>('utils.copyContent')

  translationFunctions = [
    {
      functionName: 'provideTranslation',
      import: "import { provideTranslation } from 'quang/translation/translation-providers';",
      exampleUsage: `provideTranslation({
  availableLangs: ['it', 'en'],
  defaultLang: 'it',
  fallbackLang: 'it',
});`,
      explanationKey: 'translation.functions.provideTranslation',
    },
    {
      functionName: 'withTranslation',
      import: "import { withTranslation } from 'quang/translation/translation-providers';",
      exampleUsage: `withTranslation({
  availableLangs: ['it', 'en'],
  defaultLang: 'it',
  fallbackLang: 'it',
});`,
      explanationKey: 'translation.functions.withTranslation',
    },
    {
      functionName: 'setActiveLang',
      import:
        "import { QuangTranslationService } from 'quang/translation/translation.service';\nprivate readonly translation = inject(QuangTranslationService);",
      exampleUsage: `this.translation.setActiveLang('en');`,
      explanationKey: 'translation.functions.setActiveLang',
    },
    {
      functionName: 'getActiveLang',
      import:
        "import { QuangTranslationService } from 'quang/translation/translation.service';\nprivate readonly translation = inject(QuangTranslationService);",
      exampleUsage: `lang = this.translation.getActiveLang();`,
      explanationKey: 'translation.functions.getActiveLang',
    },
    {
      functionName: 'translate',
      import:
        "import { QuangTranslationService } from 'quang/translation/translation.service';\nprivate readonly translation = inject(QuangTranslationService);",
      exampleUsage: `this.translation.translate('menu.device');`,
      explanationKey: 'translation.functions.translate',
    },
    {
      functionName: 'setTranslation',
      import:
        "import { QuangTranslationService } from 'quang/translation/translation.service';\nprivate readonly translation = inject(QuangTranslationService);",
      exampleUsage: `this.translation.setTranslation({ key: 'value' }, 'en');`,
      explanationKey: 'translation.functions.setTranslation',
    },
    {
      functionName: 'setTranslationKey',
      import:
        "import { QuangTranslationService } from 'quang/translation/translation.service';\nprivate readonly translation = inject(QuangTranslationService);",
      exampleUsage: `this.translation.setTranslationKey('key', 'value');`,
      explanationKey: 'translation.functions.setTranslationKey',
    },
    {
      functionName: 'translations.tokens',
      import:
        "import { AVAILABLE_LANGS, DEFAULT_LANG, FALLBACK_LANG, TRANSLATIONS_BASE_PATH } from 'quang/translation/translations.tokens';",
      exampleUsage: `{
  provide: AVAILABLE_LANGS, useValue: ['it', 'en'],
  provide: DEFAULT_LANG, useValue: 'it',
  provide: FALLBACK_LANG, useValue: 'it',
  provide: TRANSLATIONS_BASE_PATH, useValue: '/assets/i18n/'
}`,
      explanationKey: 'translation.functions.translationsTokens',
    },
  ]

  copyToClipboard(importText: string, exampleUsage: string): void {
    navigator.clipboard.writeText(`${importText}\n${exampleUsage}`)
    this.buttonTooltip.set('utils.copied')
    setTimeout(() => {
      this.buttonTooltip.set('utils.copyContent')
    }, 2000)
  }
}
