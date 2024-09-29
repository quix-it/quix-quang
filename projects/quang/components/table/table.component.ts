import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  TemplateRef,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { TranslocoPipe } from '@jsverse/transloco'
import { Subscription } from 'rxjs'

import { ResizeObservableService } from '@quix/quang/device'

export interface TableHeader {
  text?: string
  sort?: SortCol
  css?: string[]
  renderer?: TemplateRef<any>
  payload?: any
}

export interface TableConfiguration<T> {
  headers: TableHeader[]
  rows: TableRow<T>[]
}

export interface TableCell {
  renderer?: TemplateRef<any>
  payload?: any
  text?: string
  css?: string[]
  fullWidth?: boolean
}

export interface TableRow<T> {
  payload?: T
  rowId?: string | number
  css?: string[]
  cellData: TableCell[]
}

export enum SortTable {
  DEFAULT,
  ASC,
  DESC,
}

export interface SortCol {
  key: string
  sort: SortTable
}

@Component({
  selector: 'quang-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [TranslocoPipe, NgIf, NgClass, NgTemplateOutlet, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Table component for displaying data in a tabular format.
 *
 * It supports customizable column cells template and sorting rows by column headers.
 *
 * @usageNotes
 * The component must be configured using the {@link TableConfiguration} object
 */
export class QuangTableComponent<T> {
  clickableRow = input<boolean>(false)

  selectedRows = input<string[] | number[]>()

  stickyTable = input<boolean>(true)

  selectedRow = output<TableRow<T>>()

  sortChanged = output<SortCol[]>()

  public SortTable = SortTable

  destroyRef = inject(DestroyRef)

  _resizeObservableService = inject(ResizeObservableService)

  _tableHeader = viewChild<ElementRef>('tableHeader')

  _tableHeaderElement = viewChild<Element>('tableHeader')

  noResultsText = input<string>('quangTable.noResults')

  _tableHeaderEffect = effect(() => {
    if (this._tableHeader()) {
      this.fixTableHeaderWidth()
    }
  })

  _tableHeaderElementEffect = effect(() => {
    if (this._tableHeaderElement()) {
      this.fixTableHeaderWidth()
    }
  })

  _fakeTableHeader = viewChild<ElementRef>('fakeTableHeader')

  _fakeTableHeaderEffect = effect(() => {
    if (this._fakeTableHeader()) {
      this.fixTableHeaderWidth()
    }
  })

  tableConfigurations = input.required<TableConfiguration<T>>()

  effectTableConfigurations = effect(() => {
    if (this.tableConfigurations()) {
      this.fixTableHeaderWidth()
    }
  })

  hiddenColumnsObservable?: Subscription = undefined

  onClickRow(row: TableRow<T>): void {
    if (this.clickableRow()) {
      this.selectedRow.emit(row)
    }
  }

  isSelected(rowId: string | number): boolean {
    return !!this.selectedRows()?.some((x) => x === rowId)
  }

  fixTableHeaderWidth() {
    setTimeout(() => {
      const stickyColumns = this._tableHeader()?.nativeElement?.querySelectorAll('th')

      // Copy the column widths from our hidden Primary table header to our Sticky Table header.
      const hiddenColumns = this._fakeTableHeader()?.nativeElement?.querySelectorAll('th')

      if (stickyColumns?.length > 0 && hiddenColumns?.length > 0) {
        if (this.hiddenColumnsObservable) {
          this.hiddenColumnsObservable.unsubscribe()
        }
        this.hiddenColumnsObservable = this._resizeObservableService
          .resizeObservable(hiddenColumns[0])
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.fixTableHeaderWidth()
          })
        for (let i = 0; i < hiddenColumns?.length; i++) {
          const th = hiddenColumns[i]
          // Since the Sticky Table header is expected to be an exact copy of the Primary Table, we know their indices will be the same.
          stickyColumns[i].style.minWidth = `${th.offsetWidth}px`
          stickyColumns[i].style.maxWidth = `${th.offsetWidth}px`
        }
      }
    })
  }

  onSortColumn(sort: SortCol): void {
    this.tableConfigurations().headers.forEach((header) => {
      if (!header.sort?.key) return

      if (header.sort?.key === sort.key) {
        switch (sort.sort) {
          case SortTable.ASC:
            // eslint-disable-next-line no-param-reassign
            header.sort.sort = SortTable.DESC
            break
          case SortTable.DESC:
            // eslint-disable-next-line no-param-reassign
            header.sort.sort = SortTable.DEFAULT
            break
          case SortTable.DEFAULT:
          default:
            // eslint-disable-next-line no-param-reassign
            header.sort.sort = SortTable.ASC
            break
        }
      } else {
        // eslint-disable-next-line no-param-reassign
        header.sort = {
          ...header.sort,
          sort: SortTable.DEFAULT,
        }
      }
    })
    this.sortChanged.emit(
      this.tableConfigurations().headers.map(
        (x) =>
          x.sort ?? {
            key: '',
            sort: SortTable.DEFAULT,
          }
      ) ?? []
    )
  }
}
