import { NgModule } from "@angular/core";
import { QuangAutocompleteObjectComponent } from "./autocomplete-obj.component";
import { CommonModule } from "@angular/common";
import { TranslocoModule } from "@ngneat/transloco";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [QuangAutocompleteObjectComponent],
    imports: [CommonModule, TranslocoModule, TypeaheadModule.forRoot(), FormsModule],
    exports: [QuangAutocompleteObjectComponent]
})

export class QuangAutocompleteObjModule {}
