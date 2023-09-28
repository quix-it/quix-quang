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
import { QuangPaginatorModule } from '../../../../quang/components/paginator/src/paginator.module'
import { QuangCardsModule } from '../../../../quang/cards/src/lib/quang-cards.module'
import { QuangAuthDownloadModule } from '../../../../quang/directives/quang-auth-download/src/quang-auth-download.module'
import { QuangAuthImageModule } from '../../../../quang/directives/quang-auth-image/src/quang-auth-image.module'
import { QuangAutocompleteObjModule } from '../../../../quang/components/autocomplete/autocomplete-obj/src/autocomplete-obj.module'
import { QuangAutocompleteObjAsyncModule } from '../../../../quang/components/autocomplete-obj-async/src/autocomplete-obj-async.module'
import { QuangAutocompleteStrgModule } from '../../../../quang/components/autocomplete-strg/src/autocomplete-strg.module'
import { QuangAutocompleteStrgAsyncModule } from '../../../../quang/components/autocomplete-strg-async/src/autocomplete-strg-async.module'
import { QuangInputCheckboxModule } from '../../../../quang/components/input/input-checkbox/src/input-checkbox.module'
import { QuangInputColorModule } from '../../../../quang/components/input-color/src/input-color.module'
import { QuangDatalistModule } from '../../../../quang/components/datalist/src/datalist.module'
import { QuangInputEmailModule } from '../../../../quang/components/input-email/src/input-email.module'
import { QuangInputFileModule } from '../../../../quang/components/input-file/src/input-file.module'
import { QuangInputFractionModule } from '../../../../quang/components/input-fraction/src/input-fraction.module'
import { QuangMultiSelectObjModule } from '../../../../quang/components/select/multi-select-obj/src/multi-select-obj.module'
import { QuangMultiSelectStrgModule } from '../../../../quang/components/multi-select-strg/src/multi-select-strg.module'
import { QuangInputNumberModule } from '../../../../quang/components/input-number/src/input-number.module'
import { QuangInputPasswordModule } from '../../../../quang/components/input-password/src/input-password.module'
import { QuangInputRadioModule } from '../../../../quang/components/input-radio/src/input-radio.module'
import { QuangInputSearchModule } from '../../../../quang/components/input-search/src/input-search.module'
import { QuangInputUrlModule } from '../../../../quang/components/input-url/src/input-url.module'
import { QuangSelectObjModule } from '../../../../quang/components/select/select-obj/src/select-obj.module'
import { QuangSelectStrgModule } from '../../../../quang/components/select-strg/src/select-strg.module'
import { QuangSliderModule } from '../../../../quang/components/slider/src/slider.module'
import { QuangInputTelModule } from '../../../../quang/components/input-tel/src/input-tel.module'
import { QuangInputTextModule } from '../../../../quang/components/input-text/src/input-text.module'
import { QuangTextAreaModule } from '../../../../quang/components/input/text-area/src/text-area.module'
import { QuangTextEditorModule } from '../../../../quang/components/wysiwyg/editor/src/text-editor.module'
import { QuangTextViewModule } from '../../../../quang/components/text-view/src/text-view.module'
import { QuangToggleModule } from '../../../../quang/components/toggle/src/toggle.module'
import { QuangPaginatorService } from '../../../../quang/components/paginator/src/paginator.service'
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
    FormsModule,
    QuillModule,
    QuangCardsModule,
    QuangAuthDownloadModule,
    QuangAuthImageModule,
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
    QuangTextEditorModule,
    QuangTextViewModule,
    QuangToggleModule
  ],
  providers: [QuangPaginatorService, { provide: TRANSLOCO_SCOPE, useValue: 'core' }]
})
export class KsComponentsModule {}
