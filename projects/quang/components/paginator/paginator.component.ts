import { NgClass, NgFor, NgIf } from '@angular/common'
import { Component, OnInit, computed, input, output, signal } from '@angular/core'

import { TranslocoPipe } from '@ngneat/transloco'

import { QuangBaseComponent } from '@quix/quang/components/shared'

@Component({
  selector: 'quang-paginator',
  standalone: true,
  imports: [TranslocoPipe, NgIf, NgFor, NgClass],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class QuangPaginatorComponent extends QuangBaseComponent<{ page: number; pageSize: number }> implements OnInit {
  page = input.required<number>()
  pageSize = input.required<number>()
  sizeList = input.required<number[]>()
  totalItems = input.required<number>()
  showTotalElementsCount = input<boolean>(true)

  _currentPage = signal<number>(1)
  _pageSize = signal<number>(0)
  _totalPages = computed(() => Math.ceil(this.totalItems() / this._pageSize()))

  changePage = output<number>()
  changeSize = output<number>()

  constructor() {
    super()
  }

  ngOnInit(): void {
    this._currentPage.set(this.page())
    this._pageSize.set(this.pageSize())
  }

  onChangeSize(event: any): void {
    this._pageSize.set(parseInt(event.target.value))
    this.goToFirstPage()
    this.changeSize.emit(this._pageSize())
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
