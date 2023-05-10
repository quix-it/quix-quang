import { NgModule } from '@angular/core'
import { AutocompleteObjAsyncComponent } from './autocomplete-obj-async.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'

@NgModule({
  declarations: [AutocompleteObjAsyncComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    TypeaheadModule.forRoot(),
    FormsModule
  ],
  exports: [AutocompleteObjAsyncComponent]
})
export class AutocompleteObjAsyncModule {}
