import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { QuillModule } from 'ngx-quill'

import { QuangAutocompleteObjModule } from '@quix/quang/components/autocomplete/object'
import { QuangAutocompleteObjAsyncModule } from '@quix/quang/components/autocomplete/object-async'
import { QuangAutocompleteStrgModule } from '@quix/quang/components/autocomplete/string'
import { QuangAutocompleteStrgAsyncModule } from '@quix/quang/components/autocomplete/string-async'
import { QuangCardsModule } from '@quix/quang/components/cards'
import { QuangDatalistModule } from '@quix/quang/components/datalist'
import { QuangInputCheckboxModule } from '@quix/quang/components/input/checkbox'
import { QuangInputColorModule } from '@quix/quang/components/input/color'
import { QuangInputEmailModule } from '@quix/quang/components/input/email'
import { QuangInputFileModule } from '@quix/quang/components/input/file'
import { QuangInputFractionModule } from '@quix/quang/components/input/fraction'
import { QuangInputNumberModule } from '@quix/quang/components/input/number'
import { QuangInputPasswordModule } from '@quix/quang/components/input/password'
import { QuangInputRadioModule } from '@quix/quang/components/input/radio'
import { QuangInputSearchModule } from '@quix/quang/components/input/search'
import { QuangInputTelModule } from '@quix/quang/components/input/tel'
import { QuangInputTextModule } from '@quix/quang/components/input/text'
import { QuangTextAreaModule } from '@quix/quang/components/input/text-area'
import { QuangInputUrlModule } from '@quix/quang/components/input/url'
import { QuangPaginatorModule, QuangPaginatorService } from '@quix/quang/components/paginator'
import { QuangMultiSelectObjModule } from '@quix/quang/components/select/multi-select-obj'
import { QuangMultiSelectStrgModule } from '@quix/quang/components/select/multi-select-strg'
import { QuangSelectObjModule } from '@quix/quang/components/select/select-obj'
import { QuangSelectStrgModule } from '@quix/quang/components/select/select-strg'
import { QuangSliderModule } from '@quix/quang/components/slider'
import { QuangToggleModule } from '@quix/quang/components/toggle'
import { QuangWysiwygEditorModule } from '@quix/quang/components/wysiwyg/editor'
import { QuangWysiwygViewModule } from '@quix/quang/components/wysiwyg/view'
import { QuangDownloadModule } from '@quix/quang/directives/download'
import { QuangImageSrcModule } from '@quix/quang/directives/image-src'

import { SharedModule } from '../../shared/shared.module'
import { KsComponentsRoutingModule } from './ks-components-routing.module'

import { PaginatorServiceComponent } from './paginator-service/paginator-service.component'

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
import { MultiSelectObjComponent } from './multi-select-obj/multi-select-obj.component'
import { MultiSelectStrgComponent } from './multi-select-strg/multi-select-strg.component'
import { NumberComponent } from './number/number.component'
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
  providers: [QuangPaginatorService, { provide: TRANSLOCO_SCOPE, useValue: 'core' }]
})
export class KsComponentsModule {}
