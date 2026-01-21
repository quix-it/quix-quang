import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../../shared/components/component-documentation/component-documentation.component'
import { ExampleViewerComponent } from '../../../../shared/components/example-viewer/example-viewer.component'
import { QuangTabsComponent } from 'quang/components/tabs'

// Import all examples and their code snippets
import {
  TABS_SIMPLE_HTML,
  TABS_SIMPLE_TS,
  TABS_DISABLED_HTML,
  TABS_DISABLED_TS,
  TABS_EVENTS_HTML,
  TABS_EVENTS_TS,
  TABS_TEMPLATE_HTML,
  TABS_TEMPLATE_TS,
  TABS_INTERACTIVE_HTML,
  TABS_INTERACTIVE_TS,
  TabsSimpleExampleComponent,
  TabsDisabledExampleComponent,
  TabsEventsExampleComponent,
  TabsTemplateExampleComponent,
  TabsInteractiveExampleComponent, TabsContentExampleComponent, TABS_CONTENT_TS, TABS_CONTENT_HTML,
} from '../examples'

@Component({
  selector: 'playground-tabs-showcase',
  standalone: true,
  imports: [
    TranslocoPipe,
    ExampleViewerComponent,
    ComponentDocumentationComponent,
    TabsSimpleExampleComponent,
    TabsDisabledExampleComponent,
    TabsEventsExampleComponent,
    TabsTemplateExampleComponent,
    TabsInteractiveExampleComponent,
    TabsContentExampleComponent,
  ],
  templateUrl: './tabs-showcase.component.html',
  styleUrl: './tabs-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsShowcaseComponent {
  private readonly quangTranslationService = inject(QuangTranslationService)

  // ==================== PROTECTED STATE ====================
  protected readonly QuangTabsComponent = QuangTabsComponent

  protected componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en'
      ? './assets/docs/tabs.md'
      : './assets/docs/tabs.it.md'
  )

  // ==================== CODE SNIPPETS ====================
  protected readonly simpleTs = TABS_SIMPLE_TS
  protected readonly simpleHtml = TABS_SIMPLE_HTML
  protected readonly disabledTs = TABS_DISABLED_TS
  protected readonly disabledHtml = TABS_DISABLED_HTML
  protected readonly eventsTs = TABS_EVENTS_TS
  protected readonly eventsHtml = TABS_EVENTS_HTML
  protected readonly contentTs = TABS_CONTENT_TS
  protected readonly contentHtml = TABS_CONTENT_HTML
  protected readonly templateTs = TABS_TEMPLATE_TS
  protected readonly templateHtml = TABS_TEMPLATE_HTML
  protected readonly interactiveTs = TABS_INTERACTIVE_TS
  protected readonly interactiveHtml = TABS_INTERACTIVE_HTML

  // ==================== PROTECTED METHODS ====================
  protected scrollTo(event: Event, elementId: string): void {
    event.preventDefault()
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
