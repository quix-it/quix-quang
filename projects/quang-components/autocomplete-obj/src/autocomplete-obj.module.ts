import { NgModule } from "@angular/core";
import { AutocompleteObjComponent } from "./autocomplete-obj.component";
import { CommonModule } from "@angular/common";
import { TranslocoModule } from "@ngneat/transloco";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [AutocompleteObjComponent],
    imports: [CommonModule, TranslocoModule, TypeaheadModule.forRoot(), FormsModule],
    exports: [AutocompleteObjComponent]
})

export class AutocompleteObjModule {}