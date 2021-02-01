import {NgModule} from "@angular/core";
import {InputTextComponent} from "./quang-core/input-text/input-text.component";
import {SelectStrgComponent} from "./quang-core/select-strg/select-strg.component";
import {SelectObjComponent} from "./quang-core/select-obj/select-obj.component";
import {InputNumberComponent} from "./quang-core/input-number/input-number.component";

@NgModule({
  declarations: [
    InputTextComponent,
    SelectStrgComponent,
    SelectObjComponent,
    InputNumberComponent
  ],
  imports: [],
  exports: [
    InputTextComponent,
    SelectStrgComponent,
    SelectObjComponent,
    InputNumberComponent
  ]
})
export class QuangCoreModule {

}
