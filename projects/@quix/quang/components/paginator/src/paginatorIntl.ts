import { ɵɵFactoryDeclaration, ɵɵInjectableDeclaration } from '@angular/core'

import { Subject } from 'rxjs'

export class PaginatorIntl {
  /**
   * Stream to emit from when labels are changed. Use this to notify components when the labels have
   * changed after initialization.
   */
  readonly changes: Subject<void>
  /** A label for the page size selector. */
  itemsPerPageLabel: string
  /** A label for the button that increments the current page. */
  nextPageLabel: string
  /** A label for the button that decrements the current page. */
  previousPageLabel: string
  /** A label for the button that moves to the first page. */
  firstPageLabel: string
  /** A label for the button that moves to the last page. */
  lastPageLabel: string
  /** A label for the range of items within the current page and the length of the whole list. */
  getRangeLabel: (page: number, pageSize: number, length: number) => string
  static ɵfac: ɵɵFactoryDeclaration<PaginatorIntl, never>
  static ɵprov: ɵɵInjectableDeclaration<PaginatorIntl>
}
