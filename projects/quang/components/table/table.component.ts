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
  signal,
  viewChild,
} from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

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
  DEFAULT = 'DEFAULT',
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface SortCol {
  key: string
  sort: SortTable
}

@Component({
  selector: 'quang-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [TranslocoPipe, NgIf, NgClass, NgTemplateOutlet, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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

  _tableConfigurations = signal<TableConfiguration<T>>({
    headers: [],
    rows: [],
  })

  tableConfigurations$ = toObservable(this.tableConfigurations)
    .pipe(takeUntilDestroyed())
    .subscribe((data) => {
      const headers: TableHeader[] = []
      const rows: TableRow<T>[] = []
      for (const header of data.headers) {
        headers.push({ ...header })
      }
      for (const row of data.rows) {
        rows.push({ ...row })
      }
      this._tableConfigurations.set({
        headers,
        rows,
      })
    })

  effectTableConfigurations = effect(() => {
    if (this._tableConfigurations()) {
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

  lastWidth = -1

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
          .widthResizeObservable(hiddenColumns[0])
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((data) => {
            if (data !== this.lastWidth) {
              this.lastWidth = data
              this.fixTableHeaderWidth()
            }
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
    const tableHeaders: TableHeader[] = []
    for (const header of this._tableConfigurations().headers) {
      tableHeaders.push({
        ...header,
      })
    }
    tableHeaders.forEach((header) => {
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
    this._tableConfigurations.set({ ...this._tableConfigurations(), headers: tableHeaders })
    this.sortChanged.emit([sort]) // it's an array to handle multisort in the future
  }
}
