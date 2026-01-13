import { ChangeDetectionStrategy, Component } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'

import { FormLiveExampleComponent } from '../../examples'

@Component({
  selector: 'playground-form-test',
  standalone: true,
  imports: [TranslocoPipe, FormLiveExampleComponent],
  templateUrl: './form-test.component.html',
  styleUrl: './form-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTestComponent {}
