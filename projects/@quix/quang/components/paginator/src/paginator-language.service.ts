import { Injectable } from '@angular/core'

import { TranslocoService } from '@ngneat/transloco'

import { PaginatorIntl } from './paginatorIntl'

@Injectable({
  providedIn: 'root'
})
export class QuangPaginatorLanguageService extends PaginatorIntl {
  /**
   * constructor
   * @param translateService translation utility
   */
  constructor(private readonly translateService: TranslocoService) {
    super()
    this.translateService.langChanges$.subscribe(() => {
      this.getAndInitTranslations()
    })
    this.getAndInitTranslations()
    this.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0) {
        return this.translateService.translate('quangPaginator.pageRangeNoResults')
      }
      const amountPages = Math.ceil(length / pageSize)
      return this.translateService.translate('quangPaginator.pageRange', {
        page: page + 1,
        amountPages
      })
    }
  }

  /**
   * retrieves the translations from the label file
   */
  getAndInitTranslations(): void {
    this.translateService
      .selectTranslate([
        'quangPaginator.itemPerPage',
        'quangPaginator.nextPage',
        'quangPaginator.previousPage',
        'quangPaginator.firstPage',
        'quangPaginator.lastPage'
      ])
      .subscribe((t) => {
        ;[this.itemsPerPageLabel, this.nextPageLabel, this.previousPageLabel, this.firstPageLabel, this.lastPageLabel] =
          t
        this.changes.next()
      })
  }
}
