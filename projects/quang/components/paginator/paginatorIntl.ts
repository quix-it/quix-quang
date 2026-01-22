import { signal, ɵɵFactoryDeclaration, ɵɵInjectableDeclaration } from '@angular/core'

export class PaginatorIntl {
  readonly changes = signal<number>(0)

  itemsPerPageLabel = ''

  nextPageLabel = ''

  previousPageLabel = ''

  firstPageLabel = ''

  lastPageLabel = ''

  static ɵfac: ɵɵFactoryDeclaration<PaginatorIntl, never>

  static ɵprov: ɵɵInjectableDeclaration<PaginatorIntl>

  getRangeLabel: ((page: number, pageSize: number, length: number) => string) | undefined
}
