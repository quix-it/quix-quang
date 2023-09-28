import { NgModule } from '@angular/core'
import { AutocompleteStrgAsyncComponent } from './autocomplete-strg-async.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'
import { QuangAutocompleteAsyncService } from './quang-autocomplete-async.service'

@NgModule({
  declarations: [AutocompleteStrgAsyncComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    TypeaheadModule.forRoot(),
    FormsModule
  ],
  providers: [QuangAutocompleteAsyncService],
  exports: [AutocompleteStrgAsyncComponent]
})
export class QuangAutocompleteStrgAsyncModule {}
