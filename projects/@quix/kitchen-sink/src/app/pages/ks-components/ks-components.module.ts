import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { QuillModule } from 'ngx-quill'

import {
  QuangAutocompleteObjAsyncModule,
  QuangAutocompleteObjModule,
  QuangAutocompleteStrgAsyncModule,
  QuangAutocompleteStrgModule,
  QuangCardsModule,
  QuangDatalistModule,
  QuangInputCheckboxModule,
  QuangInputColorModule,
  QuangInputEmailModule,
  QuangInputFileModule,
  QuangInputFractionModule,
  QuangInputNumberModule,
  QuangInputPasswordModule,
  QuangInputRadioModule,
  QuangInputSearchModule,
  QuangInputTelModule,
  QuangInputTextModule,
  QuangInputUrlModule,
  QuangMultiSelectObjModule,
  QuangMultiSelectStrgModule,
  QuangPaginatorModule,
  QuangPaginatorService,
  QuangSelectObjModule,
  QuangSelectStrgModule,
  QuangSliderModule,
  QuangTextAreaModule,
  QuangToggleModule,
  QuangWysiwygEditorModule,
  QuangWysiwygViewModule
} from '@quix/quang/components'
import {
  QuangDownloadModule,
  QuangImageSrcModule
} from '@quix/quang/directives'

import { SharedModule } from '../../shared/shared.module'
import { AuthDownloadComponent } from './auth-download/auth-download.component'
import { AuthImageComponent } from './auth-image/auth-image.component'
import { AutocompleteObjAsyncComponent } from './autocomplete-obj-async/autocomplete-obj-async.component'
import { AutocompleteObjComponent } from './autocomplete-obj/autocomplete-obj.component'
import { AutocompleteStrgAsyncComponent } from './autocomplete-strg-async/autocomplete-strg-async.component'
import { AutocompleteStrgComponent } from './autocomplete-strg/autocomplete-strg.component'
import { CheckboxComponent } from './checkbox/checkbox.component'
import { ColorComponent } from './color/color.component'
import { CustomIconsComponent } from './custom-icons/custom-icons.component'
import { DatalistComponent } from './datalist/datalist.component'
import { EmailComponent } from './email/email.component'
import { FileComponent } from './file/file.component'
import { FractionComponent } from './fraction/fraction.component'
import { KsComponentsRoutingModule } from './ks-components-routing.module'
import { MultiSelectObjComponent } from './multi-select-obj/multi-select-obj.component'
import { MultiSelectStrgComponent } from './multi-select-strg/multi-select-strg.component'
import { NumberComponent } from './number/number.component'
import { PaginatorServiceComponent } from './paginator-service/paginator-service.component'
import { PaginatorComponent } from './paginator/paginator.component'
import { PasswordComponent } from './password/password.component'
import { RadioComponent } from './radio/radio.component'
import { SearchComponent } from './search/search.component'
import { SelectObjComponent } from './select-obj/select-obj.component'
import { SelectStrgComponent } from './select-strg/select-strg.component'
import { SliderComponent } from './slider/slider.component'
import { TelComponent } from './tel/tel.component'
import { TextAreaComponent } from './text-area/text-area.component'
import { TextEditorComponent } from './text-editor/text-editor.component'
import { TextComponent } from './text/text.component'
import { ToggleComponent } from './toggle/toggle.component'
import { UrlComponent } from './url/url.component'

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
    FormsModule,
    QuillModule,
    QuangCardsModule,
    QuangDownloadModule,
    QuangImageSrcModule,
    QuangAutocompleteObjModule,
    QuangAutocompleteObjAsyncModule,
    QuangAutocompleteStrgModule,
    QuangAutocompleteStrgAsyncModule,
    QuangInputCheckboxModule,
    QuangInputColorModule,
    QuangDatalistModule,
    QuangInputEmailModule,
    QuangInputFileModule,
    QuangInputFractionModule,
    QuangMultiSelectObjModule,
    QuangMultiSelectStrgModule,
    QuangInputNumberModule,
    QuangPaginatorModule,
    QuangInputPasswordModule,
    QuangInputRadioModule,
    QuangInputSearchModule,
    QuangInputUrlModule,
    QuangSelectObjModule,
    QuangSelectStrgModule,
    QuangSliderModule,
    QuangInputTelModule,
    QuangInputTextModule,
    QuangTextAreaModule,
    QuangWysiwygEditorModule,
    QuangWysiwygViewModule,
    QuangToggleModule
  ],
  providers: [
    QuangPaginatorService,
    { provide: TRANSLOCO_SCOPE, useValue: 'core' }
  ]
})
export class KsComponentsModule {}
