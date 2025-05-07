import { Routes } from '@angular/router'

import { ModalTestPageComponent } from './modal-test-page/modal-test-page.component'
import { PopoverTestPageComponent } from './popover-test-page/popover-test-page.component'
import { TooltipTestPageComponent } from './tooltip-test-page/tooltip-test-page.component'

const routes: Routes = [
  {
    path: 'tooltip',
    component: TooltipTestPageComponent,
  },
  {
    path: 'popover',
    component: PopoverTestPageComponent,
  },
  {
    path: 'modal',
    component: ModalTestPageComponent,
  },
  {
    path: '**',
    redirectTo: 'tooltip',
    pathMatch: 'full',
  },
]

export default routes
