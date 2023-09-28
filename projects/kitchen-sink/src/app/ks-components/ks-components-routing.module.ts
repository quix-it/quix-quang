import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TextComponent } from './text/text.component'
import { NumberComponent } from './number/number.component'
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
import { MultiSelectObjComponent } from './multi-select-obj/multi-select-obj.component'
import { MultiSelectStrgComponent } from './multi-select-strg/multi-select-strg.component'
import { SliderComponent } from './slider/slider.component'
import { PaginatorComponent } from './paginator/paginator.component'
import { DatalistComponent } from './datalist/datalist.component'
import { PaginatorServiceComponent } from './paginator-service/paginator-service.component'
import { AutocompleteStrgComponent } from './autocomplete-strg/autocomplete-strg.component'
import { AutocompleteStrgAsyncComponent } from './autocomplete-strg-async/autocomplete-strg-async.component'
import { AutocompleteObjComponent } from './autocomplete-obj/autocomplete-obj.component'
import { AutocompleteObjAsyncComponent } from './autocomplete-obj-async/autocomplete-obj-async.component'
import { AuthDownloadComponent } from './auth-download/auth-download.component'
import { AuthImageComponent } from './auth-image/auth-image.component'
import { CustomIconsComponent } from './custom-icons/custom-icons.component'

const routes: Routes = [
  { path: 'checkbox', component: CheckboxComponent },
  { path: 'color', component: ColorComponent },
  { path: 'email', component: EmailComponent },
  { path: 'file', component: FileComponent },
  { path: 'fraction', component: FractionComponent },
  { path: 'number', component: NumberComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'radio', component: RadioComponent },
  { path: 'search', component: SearchComponent },
  { path: 'tel', component: TelComponent },
  { path: 'text', component: TextComponent },
  { path: 'url', component: UrlComponent },
  { path: 'multi-select-obj', component: MultiSelectObjComponent },
  { path: 'multi-select-strg', component: MultiSelectStrgComponent },
  { path: 'paginator', component: PaginatorComponent },
  { path: 'select-obj', component: SelectObjComponent },
  { path: 'select-strg', component: SelectStrgComponent },
  { path: 'slider', component: SliderComponent },
  { path: 'textarea', component: TextAreaComponent },
  { path: 'texteditor', component: TextEditorComponent },
  { path: 'toggle', component: ToggleComponent },
  { path: 'datalist', component: DatalistComponent },
  { path: 'paginatorservice', component: PaginatorServiceComponent },
  { path: 'autocomplete-strg', component: AutocompleteStrgComponent },
  {
    path: 'autocomplete-strg-async',
    component: AutocompleteStrgAsyncComponent
  },
  { path: 'autocomplete-obj', component: AutocompleteObjComponent },
  { path: 'auth-download', component: AuthDownloadComponent },
  { path: 'auth-image', component: AuthImageComponent },
  { path: 'autocomplete-obj-async', component: AutocompleteObjAsyncComponent },
  { path: 'custom-icons', component: CustomIconsComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KsComponentsRoutingModule {}
