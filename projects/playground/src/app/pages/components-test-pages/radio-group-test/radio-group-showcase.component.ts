import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component'
import { QuangRadioGroupComponent } from 'quang/components/radio-group'

import {
  RADIO_GROUP_STANDARD_HTML,
  RADIO_GROUP_STANDARD_TS,
  RADIO_GROUP_TEMPLATE_HTML,
  RADIO_GROUP_TEMPLATE_TS,
  RadioGroupStandardExampleComponent,
  RadioGroupTemplateExampleComponent,
} from './examples'

@Component({
  selector: 'playground-radio-group-showcase',
  standalone: true,
  imports: [
    TranslocoPipe,
    ExampleViewerComponent,
    ComponentDocumentationComponent,
    RadioGroupStandardExampleComponent,
    RadioGroupTemplateExampleComponent,
  ],
  templateUrl: './radio-group-showcase.component.html',
  styleUrl: './radio-group-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupShowcaseComponent {
  private readonly quangTranslationService = inject(QuangTranslationService)

  protected readonly QuangRadioGroupComponent = QuangRadioGroupComponent

  protected componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en'
      ? './assets/docs/radio-group.md'
      : './assets/docs/radio-group.it.md'
  )

  protected readonly standardTs = RADIO_GROUP_STANDARD_TS
  protected readonly standardHtml = RADIO_GROUP_STANDARD_HTML
  protected readonly templateTs = RADIO_GROUP_TEMPLATE_TS
  protected readonly templateHtml = RADIO_GROUP_TEMPLATE_HTML

  protected scrollTo(event: Event, elementId: string): void {
    event.preventDefault()
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
