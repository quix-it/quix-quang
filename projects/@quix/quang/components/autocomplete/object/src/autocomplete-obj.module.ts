import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'

import { QuangAutocompleteObjectComponent } from './autocomplete-obj.component'

@NgModule({
  declarations: [QuangAutocompleteObjectComponent],
  imports: [CommonModule, TranslocoModule, TypeaheadModule.forRoot(), FormsModule],
  exports: [QuangAutocompleteObjectComponent]
})
export class QuangAutocompleteObjModule {}
