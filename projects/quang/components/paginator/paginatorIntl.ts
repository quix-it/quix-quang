import { signal, ɵɵFactoryDeclaration, ɵɵInjectableDeclaration } from '@angular/core'

export class PaginatorIntl {
  readonly changes = signal<any | undefined>(undefined)

  itemsPerPageLabel = ''

  nextPageLabel = ''

  previousPageLabel = ''

  firstPageLabel = ''

  lastPageLabel = ''

  static ɵfac: ɵɵFactoryDeclaration<PaginatorIntl, never>

  static ɵprov: ɵɵInjectableDeclaration<PaginatorIntl>

  getRangeLabel: ((page: number, pageSize: number, length: number) => string) | undefined
}
