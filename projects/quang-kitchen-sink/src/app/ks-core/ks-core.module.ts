import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { KsCoreRoutingModule } from './ks-core-routing.module'
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
import { PaginatorServiceComponent } from './paginator-service/paginator-service.component'
import { AutocompleteStrgComponent } from './autocomplete-strg/autocomplete-strg.component'
import { AutocompleteStrgAsyncComponent } from './autocomplete-strg-async/autocomplete-strg-async.component'
import { AutocompleteObjAsyncComponent } from './autocomplete-obj-async/autocomplete-obj-async.component'
import { AutocompleteObjComponent } from './autocomplete-obj/autocomplete-obj.component'
import { AuthDownloadComponent } from './auth-download/auth-download.component'
import { AuthImageComponent } from './auth-image/auth-image.component'
import { QuillModule } from 'ngx-quill'
import { QuangComponentsModule } from '../../../../quang-components/src/lib/quang-components.module'
import { QuangCoreModule } from '../../../../quang-core/src/lib/quang-core.module'
import { CustomIconsComponent } from './custom-icons/custom-icons.component'

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
    PaginatorServiceComponent,
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
    KsCoreRoutingModule,
    SharedModule,
    QuangComponentsModule,
    TranslocoModule,
    ReactiveFormsModule,
    QuangCoreModule,
    QuillModule,
    FormsModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'core' }]
})
export class KsCoreModule {}
