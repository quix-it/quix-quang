import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'

import { QuangAutocompleteStringComponent } from './autocomplete-strg.component'

@NgModule({
  declarations: [QuangAutocompleteStringComponent],
  imports: [CommonModule, TranslocoModule, TypeaheadModule.forRoot(), FormsModule],
  exports: [QuangAutocompleteStringComponent]
})
export class QuangAutocompleteStrgModule {}
