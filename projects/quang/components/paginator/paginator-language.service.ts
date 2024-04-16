import { Injectable } from '@angular/core'

import { TranslocoService } from '@ngneat/transloco'

import { QuangTranslationService } from '@quix/quang/translation'

import { PaginatorIntl } from './paginatorIntl'

@Injectable({
  providedIn: 'root'
})
export class QuangPaginatorLanguageService extends PaginatorIntl {
  constructor(private readonly transloco: TranslocoService) {
    super()
    this.transloco.langChanges$.subscribe(() => {
      this.getAndInitTranslations()
    })
    this.getAndInitTranslations()
  }

  getAndInitTranslations(): void {
    this.transloco
      .selectTranslate([
        'quangPaginator.itemsPerPage',
        'quangPaginator.nextPage',
        'quangPaginator.previousPage',
        'quangPaginator.firstPage',
        'quangPaginator.lastPage'
      ])
      .subscribe((t) => {
        ;[this.itemsPerPageLabel, this.nextPageLabel, this.previousPageLabel, this.firstPageLabel, this.lastPageLabel] =
          t
        this.changes.update((x) => x)
      })
  }
}
