import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { InputNumberComponent } from './input-number/input-number.component'
import { InputTextComponent } from './input-text/input-text.component'
import { InputEmailComponent } from './input-email/input-email.component'
import { InputSearchComponent } from './input-search/input-search.component'
import { QuangAuthDownloadDirective } from './quang-auth-donwload/quang-auth-download.directive'
import { QuangAuthImageDirective } from './quang-auth-image/quang-auth-image.directive'
import { SelectObjComponent } from './select-obj/select-obj.component'
import { SelectStrgComponent } from './select-strg/select-strg.component'
import { TextAreaComponent } from './text-area/text-area.component'
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input'
import { ToggleComponent } from './toggle/toggle.component'
import { QuillModule } from 'ngx-quill'
import { TextEditorComponent } from './text-editor/text-editor.component'
import { TranslocoModule } from '@ngneat/transloco'
import { InputPasswordComponent } from './input-password/input-password.component'
import { InputColorComponent } from './input-color/input-color.component'
import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component'
import { InputRadioComponent } from './input-radio/input-radio.component'
import { MultiSelectStrgComponent } from './multi-select-strg/multi-select-strg.component'
import { MultiSelectObjComponent } from './multi-select-obj/multi-select-obj.component'
import { AutocompleteStrgComponent } from './autocomplete-strg/autocomplete-strg.component'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'
import { AutocompleteStrgAsyncComponent } from './autocomplete-strg-async/autocomplete-strg-async.component'
import { AutocompleteObjComponent } from './autocomplete-obj/autocomplete-obj.component'
import { AutocompleteObjAsyncComponent } from './autocomplete-obj-async/autocomplete-obj-async.component'
import { QuangAutocompleteAsyncService } from './autocomplete-service/quang-autocomplete-async.service'
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider'
import { SliderComponent } from './slider/slider.component'
import { PaginatorComponent } from './paginator/paginator.component'
import { MatLegacyPaginatorIntl as MatPaginatorIntl, MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator'
import { QuangPaginatorService } from './paginator/paginator.service'
import { InputFractionComponent } from './input-fraction/input-fraction.component'
import { PaginatorLanguage } from './paginator/paginator.language'
import { InputFileComponent } from './input-file/input-file.component'
import { NgxFileDropModule } from 'ngx-file-drop'
import { InputUrlComponent } from './input-url/input-url.component'
import { InputTelComponent } from './input-tel/input-tel.component'
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip'
import { DatalistComponent } from './datalist/datalist.component'
import { TextViewComponent } from './text-view/text-view.component'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { ScrollingModule } from '@angular/cdk/scrolling'

@NgModule({
  declarations: [
    InputTextComponent,
    InputNumberComponent,
    InputEmailComponent,
    InputSearchComponent,
    QuangAuthDownloadDirective,
    QuangAuthImageDirective,
    SelectObjComponent,
    SelectStrgComponent,
    TextAreaComponent,
    ToggleComponent,
    TextEditorComponent,
    InputPasswordComponent,
    InputColorComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    MultiSelectStrgComponent,
    MultiSelectObjComponent,
    AutocompleteStrgComponent,
    AutocompleteStrgAsyncComponent,
    AutocompleteObjComponent,
    AutocompleteObjAsyncComponent,
    SliderComponent,
    PaginatorComponent,
    InputFractionComponent,
    InputFileComponent,
    InputUrlComponent,
    InputTelComponent,
    DatalistComponent,
    TextViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslocoModule,
    MatInputModule,
    MatSlideToggleModule,
    QuillModule.forRoot(),
    TypeaheadModule.forRoot(),
    MatSliderModule,
    MatPaginatorModule,
    NgxFileDropModule,
    MatTooltipModule,
    ScrollingModule
  ],
  providers: [
    QuangAutocompleteAsyncService,
    QuangPaginatorService,
    PaginatorLanguage,
    { provide: MatPaginatorIntl, useClass: PaginatorLanguage }
  ],
  exports: [
    InputTextComponent,
    InputNumberComponent,
    InputEmailComponent,
    InputSearchComponent,
    QuangAuthDownloadDirective,
    QuangAuthImageDirective,
    SelectObjComponent,
    SelectStrgComponent,
    TextAreaComponent,
    ToggleComponent,
    TextEditorComponent,
    InputPasswordComponent,
    InputColorComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    MultiSelectStrgComponent,
    MultiSelectObjComponent,
    AutocompleteStrgComponent,
    AutocompleteStrgAsyncComponent,
    AutocompleteObjComponent,
    AutocompleteObjAsyncComponent,
    SliderComponent,
    PaginatorComponent,
    InputFractionComponent,
    InputFileComponent,
    InputUrlComponent,
    InputTelComponent,
    DatalistComponent,
    TextViewComponent
  ]
})
export class QuangCoreModule {}
