import { ChangeDetectionStrategy, Component } from '@angular/core'

import { AutocompleteTestComponent } from './autocomplete-test/autocomplete-test.component'
import { DateTestComponent } from './date-test/date-test.component'
import { InputTestComponent } from './input-test/input-test.component'
import { PaginatorTestComponent } from './paginator-test/paginator-test.component'
import { SelectTestComponent } from './select-test/select-test.component'
import { ToggleTestComponent } from './toggle-test/toggle-test.component'
import { WysiwygTestComponent } from './wysiwyg-test/wysiwyg-test.component'

@Component({
  selector: 'playground-components-test-page',
  standalone: true,
  imports: [
    InputTestComponent,
    DateTestComponent,
    ToggleTestComponent,
    SelectTestComponent,
    PaginatorTestComponent,
    WysiwygTestComponent,
    AutocompleteTestComponent
  ],
  templateUrl: './components-test-page.component.html',
  styleUrl: './components-test-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsTestPageComponent {}
