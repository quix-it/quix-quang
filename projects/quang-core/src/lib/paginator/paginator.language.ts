import { Injectable } from '@angular/core'
import { MatPaginatorIntl } from '@angular/material/paginator'
import { TranslocoService } from '@ngneat/transloco'
/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * paginator language management
 */
export class PaginatorLanguage extends MatPaginatorIntl {
  /**
   * constructor
   * @param translate translation utility
   */
  constructor (
    private readonly translate: TranslocoService
  ) {
    super()
    this.translate.langChanges$.subscribe(() => {
      this.getAndInitTranslations()
    })
    this.getAndInitTranslations()
  }

  /**
   * retrieves the translations from the label file
   */
  getAndInitTranslations () {
    this.translate.selectTranslate([
      'quixPaginator.itemPerPage',
      'quixPaginator.nextPage',
      'quixPaginator.previousPage',
      'quixPaginator.firstPage',
      'quixPaginator.lastPage'
    ]).subscribe(t => {
      this.itemsPerPageLabel = t['quixPaginator.itemPerPage']
      this.nextPageLabel = t['quixPaginator.nextPage']
      this.previousPageLabel = t['quixPaginator.previousPage']
      this.firstPageLabel = t['quixPaginator.firstPage']
      this.lastPageLabel = t['quixPaginator.lastPage']
      this.changes.next()
    })
  }
}
