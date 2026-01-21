import { ChangeDetectionStrategy, Component } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'

import { ExampleViewerComponent } from '../../../../shared/components/example-viewer/example-viewer.component'

import { FORM_LIVE_EXAMPLE_HTML, FORM_LIVE_EXAMPLE_TS, FormLiveExampleComponent } from '../../examples'

@Component({
  selector: 'playground-form-example-showcase',
  standalone: true,
  imports: [TranslocoPipe, ExampleViewerComponent, FormLiveExampleComponent],
  templateUrl: './form-example-showcase.component.html',
  styleUrl: './form-example-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormExampleShowcaseComponent {
  protected readonly liveExampleTs = FORM_LIVE_EXAMPLE_TS
  protected readonly liveExampleHtml = FORM_LIVE_EXAMPLE_HTML
}
