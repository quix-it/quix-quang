import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DateRangeComponent } from './date-range/date-range.component'
import { DateTimeComponent } from './date-time/date-time.component'
import { DateComponent } from './date/date.component'
import { TimeComponent } from './time/time.component'

const routes: Routes = [
  { path: 'date', component: DateComponent },
  { path: 'date-range', component: DateRangeComponent },
  { path: 'date-time', component: DateTimeComponent },
  { path: 'time', component: TimeComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KsDateRoutingModule {}
