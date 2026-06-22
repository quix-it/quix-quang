import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../../shared/components/component-documentation/component-documentation.component'
import { ExampleViewerComponent } from '../../../../shared/components/example-viewer/example-viewer.component'
import { QuangDateComponent } from 'quang/components/date'

import {
  DATE_FULL_HTML,
  DATE_FULL_TS,
  DATE_NO_TIME_HTML,
  DATE_NO_TIME_TS,
  DATE_RANGE_HTML,
  DATE_RANGE_TS,
  DATE_SWITCH_HTML,
  DATE_SWITCH_TS,
  DateFullExampleComponent,
  DateNoTimeExampleComponent,
  DateRangeExampleComponent,
  DateSwitchDateRangeExampleComponent,
  TIME_ONLY_HTML,
  TIME_ONLY_TS,
  TimeOnlyExampleComponent,
} from '../examples'

@Component({
  selector: 'playground-date-showcase',
  standalone: true,
  imports: [
    TranslocoPipe,
    ExampleViewerComponent,
    ComponentDocumentationComponent,
    DateFullExampleComponent,
    DateNoTimeExampleComponent,
    TimeOnlyExampleComponent,
    DateRangeExampleComponent,
    DateSwitchDateRangeExampleComponent,
  ],
  templateUrl: './date-showcase.component.html',
  styleUrl: './date-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateShowcaseComponent {
  private readonly quangTranslationService = inject(QuangTranslationService)

  protected readonly QuangDateComponent = QuangDateComponent

  protected componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? './assets/docs/date.md' : './assets/docs/date.it.md'
  )

  protected readonly fullTs = DATE_FULL_TS
  protected readonly fullHtml = DATE_FULL_HTML

  protected readonly noTimeTs = DATE_NO_TIME_TS
  protected readonly noTimeHtml = DATE_NO_TIME_HTML

  protected readonly timeOnlyTs = TIME_ONLY_TS
  protected readonly timeOnlyHtml = TIME_ONLY_HTML

  protected readonly rangeTs = DATE_RANGE_TS
  protected readonly rangeHtml = DATE_RANGE_HTML

  protected readonly switchTs = DATE_SWITCH_TS
  protected readonly switchHtml = DATE_SWITCH_HTML

  protected scrollTo(event: Event, elementId: string): void {
    event.preventDefault()
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
