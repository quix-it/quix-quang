import { NgModule } from '@angular/core'
import { AutocompleteStrgComponent } from './autocomplete-strg.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'

@NgModule({
  declarations: [AutocompleteStrgComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    TypeaheadModule.forRoot(),
    FormsModule
  ],
  exports: [AutocompleteStrgComponent]
})
export class QuangAutocompleteStrgModule {}
