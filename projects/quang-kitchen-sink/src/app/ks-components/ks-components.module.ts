import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { TextComponent } from './text/text.component'
import { NumberComponent } from './number/number.component'
import { SharedModule } from '../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EmailComponent } from './email/email.component'
import { TelComponent } from './tel/tel.component'
import { TextAreaComponent } from './text-area/text-area.component'
import { UrlComponent } from './url/url.component'
import { PasswordComponent } from './password/password.component'
import { CheckboxComponent } from './checkbox/checkbox.component'
import { ColorComponent } from './color/color.component'
import { FileComponent } from './file/file.component'
import { FractionComponent } from './fraction/fraction.component'
import { RadioComponent } from './radio/radio.component'
import { SearchComponent } from './search/search.component'
import { TextEditorComponent } from './text-editor/text-editor.component'
import { ToggleComponent } from './toggle/toggle.component'
import { SelectObjComponent } from './select-obj/select-obj.component'
import { SelectStrgComponent } from './select-strg/select-strg.component'
import { MultiSelectStrgComponent } from './multi-select-strg/multi-select-strg.component'
import { MultiSelectObjComponent } from './multi-select-obj/multi-select-obj.component'
import { SliderComponent } from './slider/slider.component'
import { PaginatorComponent } from './paginator/paginator.component'
import { DatalistComponent } from './datalist/datalist.component'
import { AutocompleteStrgComponent } from './autocomplete-strg/autocomplete-strg.component'
import { AutocompleteStrgAsyncComponent } from './autocomplete-strg-async/autocomplete-strg-async.component'
import { AutocompleteObjAsyncComponent } from './autocomplete-obj-async/autocomplete-obj-async.component'
import { AutocompleteObjComponent } from './autocomplete-obj/autocomplete-obj.component'
import { AuthDownloadComponent } from './auth-download/auth-download.component'
import { AuthImageComponent } from './auth-image/auth-image.component'
import { QuillModule } from 'ngx-quill'
import { CustomIconsComponent } from './custom-icons/custom-icons.component'
import { KsComponentsRoutingModule } from './ks-components-routing.module'
import { PaginatorModule } from 'projects/quang-components/paginator/src/paginator.module'
import { QuangCardsModule } from 'projects/quang-cards/src/lib/quang-cards.module'
import { QuangAuthDownloadModule } from 'projects/quang-components/quang-auth-donwload/src/quang-auth-download.module'
import { QuangAuthImageModule } from 'projects/quang-components/quang-auth-image/src/quang-auth-image.module'
import { AutocompleteObjModule } from 'projects/quang-components/autocomplete-obj/src/autocomplete-obj.module'
import { AutocompleteObjAsyncModule } from 'projects/quang-components/autocomplete-obj-async/src/autocomplete-obj-async.module'
import { AutocompleteStrgModule } from 'projects/quang-components/autocomplete-strg/src/autocomplete-strg.module'
import { AutocompleteStrgAsyncModule } from 'projects/quang-components/autocomplete-strg-async/src/autocomplete-strg-async.module'
import { InputCheckboxModule } from 'projects/quang-components/input-checkbox/src/input-checkbox.module'
import { InputColorModule } from 'projects/quang-components/input-color/src/input-color.module'
import { DatalistModule } from 'projects/quang-components/datalist/src/datalist.module'
import { InputEmailModule } from 'projects/quang-components/input-email/src/input-email.module'
import { InputFileModule } from 'projects/quang-components/input-file/src/input-file.module'
import { InputFractionModule } from 'projects/quang-components/input-fraction/src/input-fraction.module'
import { MultiSelectObjModule } from 'projects/quang-components/multi-select-obj/src/multi-select-obj.module'
import { MultiSelectStrgModule } from 'projects/quang-components/multi-select-strg/src/multi-select-strg.module'
import { InputNumberModule } from 'projects/quang-components/input-number/src/input-number.module'
import { InputPasswordModule } from 'projects/quang-components/input-password/src/input-password.module'
import { InputRadioModule } from 'projects/quang-components/input-radio/src/input-radio.module'
import { InputSearchModule } from 'projects/quang-components/input-search/src/input-search.module'
import { InputUrlModule } from 'projects/quang-components/input-url/src/input-url.module'
import { SelectObjModule } from 'projects/quang-components/select-obj/src/select-obj.module'
import { SelectStrgModule } from 'projects/quang-components/select-strg/src/select-strg.module'
import { SliderModule } from 'projects/quang-components/slider/src/slider.module'
import { InputTelModule } from 'projects/quang-components/input-tel/src/input-tel.module'
import { InputTextModule } from 'projects/quang-components/input-text/src/input-text.module'
import { TextAreaModule } from 'projects/quang-components/text-area/src/text-area.module'
import { TextEditorModule } from 'projects/quang-components/text-editor/src/text-editor.module'
import { TextViewModule } from 'projects/quang-components/text-view/src/text-view.module'
import { ToggleModule } from 'projects/quang-components/toggle/src/toggle.module'
import { PaginatorServiceComponent } from './paginator-service/paginator-service.component'

@NgModule({
  declarations: [
    TextComponent,
    NumberComponent,
    EmailComponent,
    TelComponent,
    TextAreaComponent,
    UrlComponent,
    PasswordComponent,
    CheckboxComponent,
    ColorComponent,
    FileComponent,
    FractionComponent,
    RadioComponent,
    SearchComponent,
    TextEditorComponent,
    ToggleComponent,
    SelectObjComponent,
    SelectStrgComponent,
    MultiSelectStrgComponent,
    MultiSelectObjComponent,
    SliderComponent,
    PaginatorComponent,
    DatalistComponent,
    AutocompleteStrgComponent,
    AutocompleteStrgAsyncComponent,
    AutocompleteObjAsyncComponent,
    AutocompleteObjComponent,
    AuthDownloadComponent,
    AuthImageComponent,
    CustomIconsComponent,
    PaginatorServiceComponent
  ],
  imports: [
    CommonModule,
    KsComponentsRoutingModule,
    SharedModule,
    TranslocoModule,
    ReactiveFormsModule,
    QuillModule,
    FormsModule,
    QuangCardsModule,
    QuangAuthDownloadModule,
    QuangAuthImageModule,
    AutocompleteObjModule,
    AutocompleteObjAsyncModule,
    AutocompleteStrgModule,
    AutocompleteStrgAsyncModule,
    InputCheckboxModule,
    InputColorModule,
    DatalistModule,
    InputEmailModule,
    InputFileModule,
    InputFractionModule,
    MultiSelectObjModule,
    MultiSelectStrgModule,
    InputNumberModule,
    PaginatorModule,
    InputPasswordModule,
    InputRadioModule,
    InputSearchModule,
    InputUrlModule,
    SelectObjModule,
    SelectStrgModule,
    SliderModule,
    InputTelModule,
    InputTextModule,
    TextAreaModule,
    TextEditorModule,
    TextViewModule,
    ToggleModule,
    PaginatorServiceComponent
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'core' }]
})
export class KsComponentsModule {}
