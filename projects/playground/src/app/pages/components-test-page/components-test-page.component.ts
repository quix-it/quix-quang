import { ChangeDetectionStrategy, Component } from '@angular/core'

import { TranslocoPipe } from '@ngneat/transloco'

import { InputTestComponent } from './input-test/input-test.component'

@Component({
  selector: 'playground-components-test-page',
  standalone: true,
  imports: [InputTestComponent, TranslocoPipe],
  templateUrl: './components-test-page.component.html',
  styleUrl: './components-test-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsTestPageComponent {}
