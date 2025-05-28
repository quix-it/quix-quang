import { ChangeDetectionStrategy, Component } from '@angular/core'

import { AuthTestComponent } from './auth-test/auth-test.component'
import { AutocompleteTestComponent } from './autocomplete-test/autocomplete-test.component'
import { DateTestComponent } from './date-test/date-test.component'
import { InputTestComponent } from './input-test/input-test.component'
import { PaginatorTestComponent } from './paginator-test/paginator-test.component'
import { SelectTestComponent } from './select-test/select-test.component'
import { TableTestComponent } from './table-test/table-test.component'
import { ToggleTestComponent } from './toggle-test/toggle-test.component'
import { WysiwygTestComponent } from './wysiwyg-test/wysiwyg-test.component'

@Component({
  selector: 'playground-components-test-page',
  imports: [
    AuthTestComponent,
    InputTestComponent,
    DateTestComponent,
    ToggleTestComponent,
    SelectTestComponent,
    PaginatorTestComponent,
    WysiwygTestComponent,
    AutocompleteTestComponent,
    TableTestComponent,
  ],
  standalone: true,
  templateUrl: './components-test-page.component.html',
  styleUrl: './components-test-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsTestPageComponent {}
