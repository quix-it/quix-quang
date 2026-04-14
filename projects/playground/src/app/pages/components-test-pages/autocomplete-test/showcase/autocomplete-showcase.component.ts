import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../../shared/components/component-documentation/component-documentation.component'
import { ExampleViewerComponent } from '../../../../shared/components/example-viewer/example-viewer.component'
import { QuangAutocompleteComponent } from 'quang/components/autocomplete'

// Import all examples and their code snippets
import {
  AUTOCOMPLETE_ASYNC_HTML,
  AUTOCOMPLETE_ASYNC_TS,
  AUTOCOMPLETE_FREE_TEXT_HTML,
  AUTOCOMPLETE_FREE_TEXT_TS,
  AUTOCOMPLETE_INTERACTIVE_HTML,
  AUTOCOMPLETE_INTERACTIVE_TS,
  AUTOCOMPLETE_MULTIPLE_HTML,
  AUTOCOMPLETE_MULTIPLE_TS,
  AUTOCOMPLETE_MULTIPLE_WITH_FREE_TEXT_HTML,
  AUTOCOMPLETE_MULTIPLE_WITH_FREE_TEXT_TS,
  AUTOCOMPLETE_SIMPLE_HTML,
  AUTOCOMPLETE_SIMPLE_TS,
  AUTOCOMPLETE_TEMPLATE_HTML,
  AUTOCOMPLETE_TEMPLATE_TS,
  AutocompleteAsyncExampleComponent,
  AutocompleteFreeTextExampleComponent,
  AutocompleteInteractiveExampleComponent,
  AutocompleteMultipleExampleComponent,
  AutocompleteMultipleWithFreeTextExampleComponent,
  AutocompleteSimpleExampleComponent,
  AutocompleteTemplateExampleComponent,
} from '../examples'

@Component({
  selector: 'playground-autocomplete-showcase',
  standalone: true,
  imports: [
    TranslocoPipe,
    ExampleViewerComponent,
    ComponentDocumentationComponent,
    AutocompleteSimpleExampleComponent,
    AutocompleteAsyncExampleComponent,
    AutocompleteFreeTextExampleComponent,
    AutocompleteMultipleExampleComponent,
    AutocompleteMultipleWithFreeTextExampleComponent,
    AutocompleteInteractiveExampleComponent,
    AutocompleteTemplateExampleComponent,
  ],
  templateUrl: './autocomplete-showcase.component.html',
  styleUrl: './autocomplete-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteShowcaseComponent {
  private readonly quangTranslationService = inject(QuangTranslationService)

  // ==================== PROTECTED STATE ====================
  protected readonly QuangAutocompleteComponent = QuangAutocompleteComponent

  protected componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en'
      ? './assets/docs/autocomplete.md'
      : './assets/docs/autocomplete.it.md'
  )

  // ==================== CODE SNIPPETS ====================
  protected readonly simpleTs = AUTOCOMPLETE_SIMPLE_TS
  protected readonly simpleHtml = AUTOCOMPLETE_SIMPLE_HTML
  protected readonly asyncTs = AUTOCOMPLETE_ASYNC_TS
  protected readonly asyncHtml = AUTOCOMPLETE_ASYNC_HTML
  protected readonly freeTextTs = AUTOCOMPLETE_FREE_TEXT_TS
  protected readonly freeTextHtml = AUTOCOMPLETE_FREE_TEXT_HTML
  protected readonly multipleTs = AUTOCOMPLETE_MULTIPLE_TS
  protected readonly multipleHtml = AUTOCOMPLETE_MULTIPLE_HTML
  protected readonly multipleWithFreeTextTs = AUTOCOMPLETE_MULTIPLE_WITH_FREE_TEXT_TS
  protected readonly multipleWithFreeTextHtml = AUTOCOMPLETE_MULTIPLE_WITH_FREE_TEXT_HTML
  protected readonly interactiveTs = AUTOCOMPLETE_INTERACTIVE_TS
  protected readonly interactiveHtml = AUTOCOMPLETE_INTERACTIVE_HTML

  protected readonly templateTs = AUTOCOMPLETE_TEMPLATE_TS
  protected readonly templateHtml = AUTOCOMPLETE_TEMPLATE_HTML

  // ==================== PROTECTED METHODS ====================
  protected scrollTo(event: Event, elementId: string): void {
    event.preventDefault()
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
