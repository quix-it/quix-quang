import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../../shared/components/component-documentation/component-documentation.component'
import { ExampleViewerComponent } from '../../../../shared/components/example-viewer/example-viewer.component'
import { QuangCheckboxComponent } from 'quang/components/checkbox'

import {
  TOGGLE_BASIC_EXAMPLE_HTML,
  TOGGLE_BASIC_EXAMPLE_TS,
  TOGGLE_INTERACTIVE_EXAMPLE_HTML,
  TOGGLE_INTERACTIVE_EXAMPLE_TS,
  ToggleBasicExampleComponent,
  ToggleInteractiveExampleComponent,
} from '../examples'

@Component({
  selector: 'playground-toggle-showcase',
  standalone: true,
  imports: [
    TranslocoPipe,
    ExampleViewerComponent,
    ComponentDocumentationComponent,
    ToggleBasicExampleComponent,
    ToggleInteractiveExampleComponent,
  ],
  templateUrl: './toggle-showcase.component.html',
  styleUrl: './toggle-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleShowcaseComponent {
  private readonly quangTranslationService = inject(QuangTranslationService)

  protected readonly basicTs = TOGGLE_BASIC_EXAMPLE_TS
  protected readonly basicHtml = TOGGLE_BASIC_EXAMPLE_HTML

  protected readonly interactiveTs = TOGGLE_INTERACTIVE_EXAMPLE_TS
  protected readonly interactiveHtml = TOGGLE_INTERACTIVE_EXAMPLE_HTML

  protected readonly checkboxComponentType = QuangCheckboxComponent

  protected readonly componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? './assets/docs/checkbox.md' : './assets/docs/checkbox.it.md'
  )

  protected scrollTo(event: Event, elementId: string): void {
    event.preventDefault()
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
