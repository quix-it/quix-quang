import { Route } from '@angular/router'

import { OrderDetailComponent } from './order-detail/order-detail.component'
import { OrderListComponent } from './order-list/order-list.component'

export const routes: Route[] = [
  {
    path: '',
    component: OrderListComponent
  },
  {
    path: 'detail/:id',
    component: OrderDetailComponent
  }
]
