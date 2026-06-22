import { Routes } from '@angular/router'

import { FormExampleShowcaseComponent } from './showcase/form-example-showcase/form-example-showcase.component'
import { FormValidatorsShowcaseComponent } from './showcase/form-validators-showcase/form-validators-showcase.component'
import { FormTestComponent } from './test/form-test/form-test.component'

const routes: Routes = [
  {
    path: 'test',
    component: FormTestComponent,
  },
  {
    path: 'validators',
    component: FormValidatorsShowcaseComponent,
  },
  {
    path: 'example',
    component: FormExampleShowcaseComponent,
  },
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'validators',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'validators',
  },
]

export default routes
