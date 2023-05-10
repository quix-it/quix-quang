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
import { QuangCardsModule } from 'projects/quang-cards/src/public-api'
import { KsComponentsRoutingModule } from './ks-components-routing.module'
import { QuangAuthDownloadModule } from 'projects/quang-components/quang-auth-donwload/public-api'
import { QuangAuthImageModule } from 'projects/quang-components/quang-auth-image/public-api'
import { AutocompleteObjModule } from 'projects/quang-components/autocomplete-obj/public-api'
import { AutocompleteObjAsyncModule } from 'projects/quang-components/autocomplete-obj-async/public-api'
import { AutocompleteStrgModule } from 'projects/quang-components/autocomplete-strg/public-api'
import { AutocompleteStrgAsyncModule } from 'projects/quang-components/autocomplete-strg-async/public-api'
import { InputCheckboxModule } from 'projects/quang-components/input-checkbox/public-api'
import { InputColorModule } from 'projects/quang-components/input-color/public-api'
import { DatalistModule } from 'projects/quang-components/datalist/public-api'
import { InputEmailModule } from 'projects/quang-components/input-email/public-api'
import { InputFileModule } from 'projects/quang-components/input-file/public-api'
import { InputFractionModule } from 'projects/quang-components/input-fraction/public-api'
import { MultiSelectObjModule } from 'projects/quang-components/multi-select-obj/public-api'
import { MultiSelectStrgModule } from 'projects/quang-components/multi-select-strg/public-api'
import { InputNumberModule } from 'projects/quang-components/input-number/public-api'
import { PaginatorModule } from 'projects/quang-components/paginator/public-api'
import { InputPasswordModule } from 'projects/quang-components/input-password/public-api'
import { InputRadioModule } from 'projects/quang-components/input-radio/public-api'
import { InputSearchModule } from 'projects/quang-components/input-search/public-api'
import { SelectObjModule } from 'projects/quang-components/select-obj/public-api'
import { SelectStrgModule } from 'projects/quang-components/select-strg/public-api'
import { SliderModule } from 'projects/quang-components/slider/public-api'
import { InputTelModule } from 'projects/quang-components/input-tel/public-api'
import { InputTextModule } from 'projects/quang-components/input-text/public-api'
import { TextAreaModule } from 'projects/quang-components/text-area/public-api'
import { TextViewModule } from 'projects/quang-components/text-view/public-api'
import { TextEditorModule } from 'projects/quang-components/text-editor/public-api'
import { ToggleModule } from 'projects/quang-components/toggle/public-api'
import { InputUrlModule } from 'projects/quang-components/input-url/public-api'

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
    CustomIconsComponent
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
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'core' }]
})
export class KsComponentsModule {}
