import { NgModule } from '@angular/core'
import { QuangAutocompleteStringAsyncComponent } from './autocomplete-strg-async.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'
import { QuangAutocompleteAsyncService } from './autocomplete-async.service'

@NgModule({
  declarations: [QuangAutocompleteStringAsyncComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    TypeaheadModule.forRoot(),
    FormsModule
  ],
  providers: [QuangAutocompleteAsyncService],
  exports: [QuangAutocompleteStringAsyncComponent]
})
export class QuangAutocompleteStrgAsyncModule {}
