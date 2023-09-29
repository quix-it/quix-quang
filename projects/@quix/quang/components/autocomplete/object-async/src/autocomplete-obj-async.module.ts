import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'

import { QuangAutocompleteObjectAsyncComponent } from './autocomplete-obj-async.component'

@NgModule({
  declarations: [QuangAutocompleteObjectAsyncComponent],
  imports: [CommonModule, TranslocoModule, TypeaheadModule.forRoot(), FormsModule],
  exports: [QuangAutocompleteObjectAsyncComponent]
})
export class QuangAutocompleteObjAsyncModule {}
