import { NgClass, NgFor, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit, computed, input, output, signal } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

import { TranslocoPipe } from '@jsverse/transloco'

import { makeId } from '@quang-lib/components/shared'

@Component({
  selector: 'quang-paginator',
  imports: [TranslocoPipe, NgIf, NgFor, NgClass],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Paginator component for handling pagination in lists and tables.
 *
 * This component provides a user interface for navigating through pages of data.
 *
 * @usageNotes
 * `showTotalElementsCount` can be used to show or hide the total number of items.
 */
export class QuangPaginatorComponent implements OnInit {
  componentId = input<string>(makeId(10))

  componentTabIndex = input<number>(0)

  componentClass = input<string | string[]>('')

  page = input.required<number>()

  pageSize = input.required<number>()

  sizeList = input<number[]>([])

  totalItems = input.required<number>()

  showTotalElementsCount = input<boolean>(true)

  totalItemsText = input<string>('quangPaginator.totalItems')

  sizeText = input<string>('quangPaginator.size')

  pageRangeText = input<string>('quangPaginator.pageRange')

  _currentPage = signal<number>(1)

  page$ = toObservable(this.page)
    .pipe(takeUntilDestroyed())
    .subscribe((page) => {
      this._currentPage.set(page)
    })

  _pageSize = signal<number>(0)

  pageSize$ = toObservable(this.pageSize)
    .pipe(takeUntilDestroyed())
    .subscribe((pageSize) => {
      this._pageSize.set(pageSize)
    })

  _totalPages = computed(() => Math.ceil(this.totalItems() / this._pageSize()))

  changePage = output<number>()

  changeSize = output<number>()

  ngOnInit(): void {
    this._currentPage.set(this.page())
    this._pageSize.set(this.pageSize())
  }

  onChangeSize(event: any): void {
    this._pageSize.set(parseInt(event.target.value))
    this.changeSize.emit(this._pageSize())
    this.goToFirstPage()
  }

  goToNextPage(): void {
    this._currentPage.update((page) => page + 1)
    this.changePage.emit(this._currentPage())
  }

  goToPreviousPage(): void {
    this._currentPage.update((page) => page - 1)
    this.changePage.emit(this._currentPage())
  }

  goToFirstPage(): void {
    this._currentPage.set(1)
    this.changePage.emit(this._currentPage())
  }

  goToLastPage(): void {
    this._currentPage.set(this._totalPages())
    this.changePage.emit(this._currentPage())
  }
}
