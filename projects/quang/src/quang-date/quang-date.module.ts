import { NgModule} from '@angular/core';
import {InputDateRangeComponent} from "./quang-date/input-date-range/input-date-range.component";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    InputDateRangeComponent
  ],
  imports:[
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    CommonModule,
    TranslateModule,
  ],
  exports: [
    InputDateRangeComponent
  ]
})
export class QuangDateModule {
}
