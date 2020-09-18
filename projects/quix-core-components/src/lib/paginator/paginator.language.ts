import {Injectable} from "@angular/core";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class PaginatorLanguage extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();
    this.translate.onLangChange.subscribe((e: Event) => {
      this.getAndInitTranslations();
    });
    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
    this.translate.get(['quixPaginator.itemPerPage', 'quixPaginator.nextPage', 'quixPaginator.previousPage', 'quixPaginator.firstPage', 'quixPaginator.lastPage']).subscribe(
      translation => {
        this.itemsPerPageLabel = translation['quixPaginator.itemPerPage'];
        this.nextPageLabel = translation['quixPaginator.nextPage'];
        this.previousPageLabel = translation['quixPaginator.previousPage'];
        this.firstPageLabel = translation['quixPaginator.firstPage'];
          this.lastPageLabel = translation['quixPaginator.lastPage'];
        this.changes.next();
      }
    );
  }
}
