import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../../../shared/components/component-documentation/component-documentation.component'
import { ExampleViewerComponent } from '../../../../../shared/components/example-viewer/example-viewer.component'
import { QuangSelectComponent } from 'quang/components/select'

import {
  SELECT_DYNAMIC_OPTIONS_EXAMPLE_HTML,
  SELECT_DYNAMIC_OPTIONS_EXAMPLE_TS,
  SELECT_MULTIPLE_EXAMPLE_HTML,
  SELECT_MULTIPLE_EXAMPLE_TS,
  SELECT_SINGLE_EXAMPLE_HTML,
  SELECT_SINGLE_EXAMPLE_TS,
  SELECT_TEMPLATE_EXAMPLE_HTML,
  SELECT_TEMPLATE_EXAMPLE_TS,
  SelectDynamicOptionsExampleComponent,
  SelectMultipleExampleComponent,
  SelectSingleExampleComponent,
  SelectTemplateExampleComponent,
} from '../../examples'

@Component({
  selector: 'playground-select-showcase',
  standalone: true,
  imports: [
    TranslocoPipe,
    ExampleViewerComponent,
    ComponentDocumentationComponent,
    SelectSingleExampleComponent,
    SelectMultipleExampleComponent,
    SelectDynamicOptionsExampleComponent,
    SelectTemplateExampleComponent,
  ],
  templateUrl: './select-showcase.component.html',
  styleUrl: './select-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectShowcaseComponent {
  private readonly quangTranslationService = inject(QuangTranslationService)

  protected readonly QuangSelectComponent = QuangSelectComponent

  protected readonly componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? './assets/docs/select.md' : './assets/docs/select.it.md'
  )

  protected readonly singleTs = SELECT_SINGLE_EXAMPLE_TS
  protected readonly singleHtml = SELECT_SINGLE_EXAMPLE_HTML

  protected readonly multipleTs = SELECT_MULTIPLE_EXAMPLE_TS
  protected readonly multipleHtml = SELECT_MULTIPLE_EXAMPLE_HTML

  protected readonly dynamicTs = SELECT_DYNAMIC_OPTIONS_EXAMPLE_TS
  protected readonly dynamicHtml = SELECT_DYNAMIC_OPTIONS_EXAMPLE_HTML

  protected readonly templateTs = SELECT_TEMPLATE_EXAMPLE_TS
  protected readonly templateHtml = SELECT_TEMPLATE_EXAMPLE_HTML

  protected scrollTo(event: Event, elementId: string): void {
    event.preventDefault()
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
