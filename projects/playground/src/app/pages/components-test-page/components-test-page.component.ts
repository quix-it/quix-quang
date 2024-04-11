import { ChangeDetectionStrategy, Component } from '@angular/core'

import { DateTestComponent } from './date-test/date-test.component'
import { InputTestComponent } from './input-test/input-test.component'
import { ToggleTestComponent } from './toggle-test/toggle-test.component'

@Component({
  selector: 'playground-components-test-page',
  standalone: true,
  imports: [InputTestComponent, DateTestComponent, ToggleTestComponent],
  templateUrl: './components-test-page.component.html',
  styleUrl: './components-test-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsTestPageComponent {}
