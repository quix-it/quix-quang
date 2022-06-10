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
  getAndInitTranslations (): void {
    this.translate.selectTranslate([
      'quangPaginator.itemPerPage',
      'quangPaginator.nextPage',
      'quangPaginator.previousPage',
      'quangPaginator.firstPage',
      'quangPaginator.lastPage'
    ]).subscribe(t => {
      [
        this.itemsPerPageLabel,
        this.nextPageLabel,
        this.previousPageLabel,
        this.firstPageLabel,
        this.lastPageLabel
      ] = t
      this.changes.next()
    })
  }
}
