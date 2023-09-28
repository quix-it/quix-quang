import { NgModule } from '@angular/core'
import { QuangAutocompleteObjectAsyncComponent } from './autocomplete-obj-async.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'

@NgModule({
  declarations: [QuangAutocompleteObjectAsyncComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    TypeaheadModule.forRoot(),
    FormsModule
  ],
  exports: [QuangAutocompleteObjectAsyncComponent]
})
export class QuangAutocompleteObjAsyncModule {}
