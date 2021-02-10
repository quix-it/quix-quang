import {NgModule} from "@angular/core";
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {InputTextComponent} from "./quang-core/input-text/input-text.component";
import {SelectStrgComponent} from "./quang-core/select-strg/select-strg.component";
import {SelectObjComponent} from "./quang-core/select-obj/select-obj.component";
import {InputNumberComponent} from "./quang-core/input-number/input-number.component";
import {ToggleComponent} from "./quang-core/toggle/toggle.component";

@NgModule({
  declarations: [
    InputTextComponent,
    SelectStrgComponent,
    SelectObjComponent,
    InputNumberComponent,
    ToggleComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [
    InputTextComponent,
    SelectStrgComponent,
    SelectObjComponent,
    InputNumberComponent,
    ToggleComponent
  ]
})
export class QuangCoreModule {

}
