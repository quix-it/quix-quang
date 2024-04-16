import { NgClass, NgFor, NgIf } from '@angular/common'
import { ChangeDetectorRef, Component, OnInit, input, signal } from '@angular/core'

import { TranslocoPipe } from '@ngneat/transloco'

import { QuangBaseComponent } from '@quix/quang/components/shared'

@Component({
  selector: 'quang-paginator',
  standalone: true,
  imports: [TranslocoPipe, NgIf, NgFor, NgClass],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent extends QuangBaseComponent<{ page: number; pageSize: number }> implements OnInit {
  page = input.required<number>()
  pageSize = input.required<number>()
  sizeList = input.required<number[]>()
  totalItems = input<number>(0)
  showTotalElementsCount = input<boolean>(true)

  _currentPage = signal<number>(0)
  _pageSize = signal<number>(0)
  _totalPages = signal<number>(0)

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
    super()
  }

  ngOnInit(): void {
    this._currentPage.set(this.page())
    this._pageSize.set(this.pageSize())
    this._totalPages.set(Math.ceil(this.totalItems() / this._pageSize()))
  }

  onChangeSize(event: any): void {
    this._pageSize.set(parseInt(event.target.value))
  }

  goToNextPage(): void {
    this._currentPage.update((page) => page + 1)
  }

  goToPreviousPage(): void {
    this._currentPage.update((page) => page - 1)
  }

  goToFirstPage(): void {
    this._currentPage.set(1)
    // this.changeDetectorRef.detectChanges()
  }

  goToLastPage(): void {
    this._currentPage.set(this._totalPages())
    // this.changeDetectorRef.detectChanges()
  }
}
