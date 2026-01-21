import { Routes } from '@angular/router'

import { AutocompleteShowcaseComponent } from './autocomplete-test/showcase/autocomplete-showcase.component'
import { AutocompleteTestComponent } from './autocomplete-test/test/autocomplete-test.component'
import { DateShowcaseComponent } from './date-test/showcase/date-showcase.component'
import { DateTestComponent } from './date-test/test/date-test.component'
import { InputTestComponent } from './input-test/input-test.component'
import { LoaderTestPageComponent } from './loader-test-page/loader-test-page.component'
import { PaginatorTestComponent } from './paginator-test/paginator-test.component'
import { RadioGroupShowcaseComponent } from './radio-group-test/showcase/radio-group-showcase.component'
import { RadioGroupTestComponent } from './radio-group-test/test/radio-group-test.component'
import { SelectShowcaseComponent } from './select-test/showcase/select-showcase/select-showcase.component'
import { SelectTestComponent } from './select-test/test/select-test.component'
import { TableTestComponent } from './table-test/table-test.component'
import { TabsShowcaseComponent } from './tabs-test/showcase/tabs-showcase.component'
import { TabsTestComponent } from './tabs-test/test/tabs-test.component'
import { ToggleShowcaseComponent } from './toggle-test/showcase/toggle-showcase.component'
import { ToggleTestComponent } from './toggle-test/toggle-test.component'
import { WysiwygTestComponent } from './wysiwyg-test/wysiwyg-test.component'

const routes: Routes = [
  {
    path: 'autocomplete',
    component: AutocompleteShowcaseComponent,
  },
  {
    path: 'autocomplete/test',
    component: AutocompleteTestComponent,
  },
  {
    path: 'date',
    component: DateShowcaseComponent,
  },
  {
    path: 'date/test',
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
    component: SelectShowcaseComponent,
  },
  {
    path: 'select/test',
    component: SelectTestComponent,
  },
  {
    path: 'radio-group',
    component: RadioGroupShowcaseComponent,
  },
  {
    path: 'radio-group/test',
    component: RadioGroupTestComponent,
  },
  {
    path: 'table',
    component: TableTestComponent,
  },
  {
    path: 'tabs',
    component: TabsShowcaseComponent,
  },
  {
    path: 'tabs/test',
    component: TabsTestComponent,
  },
  {
    path: 'toggle',
    component: ToggleShowcaseComponent,
  },
  {
    path: 'toggle/test',
    component: ToggleTestComponent,
  },
  {
    path: 'wysiwyg',
    component: WysiwygTestComponent,
  },
  {
    path: 'loader',
    component: LoaderTestPageComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'input',
  },
]

export default routes
