import { Routes } from '@angular/router'

import { AuthTestComponent } from './auth-test/auth-test.component'
import { AutocompleteTestComponent } from './autocomplete-test/autocomplete-test.component'
import { DateTestComponent } from './date-test/date-test.component'
import { InputTestComponent } from './input-test/input-test.component'
import { PaginatorTestComponent } from './paginator-test/paginator-test.component'
import { SelectTestComponent } from './select-test/select-test.component'
import { TableTestComponent } from './table-test/table-test.component'
import { ToggleTestComponent } from './toggle-test/toggle-test.component'
import { WysiwygTestComponent } from './wysiwyg-test/wysiwyg-test.component'

const routes: Routes = [
  {
    path: 'auth',
    component: AuthTestComponent,
  },
  {
    path: 'autocomplete',
    component: AutocompleteTestComponent,
  },
  {
    path: 'date',
    component: DateTestComponent,
  },
  {
    path: 'input',
    component: InputTestComponent,
  },
  {
    path: 'paginator',
    component: PaginatorTestComponent,
  },
  {
    path: 'select',
    component: SelectTestComponent,
  },
  {
    path: 'table',
    component: TableTestComponent,
  },
  {
    path: 'toggle',
    component: ToggleTestComponent,
  },
  {
    path: 'wysiwyg',
    component: WysiwygTestComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'input',
  },
]

export default routes
