import { NgModule } from '@angular/core'
import { QuangAutocompleteStringComponent } from './autocomplete-strg.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'

@NgModule({
  declarations: [QuangAutocompleteStringComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    TypeaheadModule.forRoot(),
    FormsModule
  ],
  exports: [QuangAutocompleteStringComponent]
})
export class QuangAutocompleteStrgModule {}
