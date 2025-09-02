import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common'
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
  viewChildren,
} from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

import { TranslocoPipe } from '@jsverse/transloco'
import { ResizeObservableService } from 'quang/device'
import { Subscription } from 'rxjs'

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
  style?: Record<string, string>
  properties?: Record<string, any>
  cellId?: string | number
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

export enum SortType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
}

export interface SortCol {
  key: string
  sort: SortTable
  order?: number
}

@Component({
  selector: 'quang-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [TranslocoPipe, NgClass, NgTemplateOutlet, NgStyle],
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

  sortType = input<SortType>(SortType.SINGLE)

  selectedRow = output<TableRow<T>>()

  sortChanged = output<SortCol[]>()

  public SortTable = SortTable

  destroyRef = inject(DestroyRef)

  _resizeObservableService = inject(ResizeObservableService)

  _tableHeader = viewChild<ElementRef>('tableHeader')

  _tableHeaderElement = viewChild<Element>('tableHeader')

  noResultsText = input<string>('quangTable.noResults')

  tdWithProperties = viewChildren('tdCell', { read: ElementRef })

  _tdWithPropertiesEffect = effect(() => {
    for (const tdWithProperty of this.tdWithProperties()) {
      const properties = tdWithProperty.nativeElement.getAttribute('data-properties')
      if (properties) {
        const propertiesObj = JSON.parse(properties)
        for (const key of Object.keys(propertiesObj)) {
          console.log('key', key, propertiesObj[key])
          tdWithProperty.nativeElement[key] = propertiesObj[key]
        }
      }
    }
  })

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
    // Create a deep copy of headers to avoid direct mutation of the signal's state.
    const tableHeaders: TableHeader[] = this._tableConfigurations().headers.map((h) => ({
      ...h,
      sort: h.sort ? { ...h.sort } : undefined,
    }))

    if (this.sortType() === SortType.SINGLE) {
      let newSortToEmit: SortCol | undefined

      tableHeaders.forEach((header) => {
        if (!header.sort) return

        if (header.sort.key === sort.key) {
          switch (sort.sort) {
            case SortTable.ASC:
              header.sort.sort = SortTable.DESC
              break
            case SortTable.DESC:
              header.sort.sort = SortTable.DEFAULT
              break
            case SortTable.DEFAULT:
            default:
              header.sort.sort = SortTable.ASC
              break
          }
          header.sort.order = 0
          if (header.sort.sort !== SortTable.DEFAULT) {
            newSortToEmit = header.sort
          }
        } else {
          header.sort.sort = SortTable.DEFAULT
          header.sort.order = undefined
        }
      })

      this._tableConfigurations.set({ ...this._tableConfigurations(), headers: tableHeaders })
      this.sortChanged.emit(newSortToEmit ? [newSortToEmit] : [])
    } else {
      // 1. Find the clicked header and update its sort status
      const targetHeader = tableHeaders.find((h) => h.sort?.key === sort.key)
      if (targetHeader?.sort) {
        switch (targetHeader.sort.sort) {
          case SortTable.ASC:
            targetHeader.sort.sort = SortTable.DESC
            break
          case SortTable.DESC:
            targetHeader.sort.sort = SortTable.DEFAULT
            break
          case SortTable.DEFAULT:
          default:
            targetHeader.sort.sort = SortTable.ASC
            break
        }
      }

      // 2. Collect all currently active sort columns (not DEFAULT)
      const activeSorts = tableHeaders
        .filter((h) => h.sort && h.sort.sort !== SortTable.DEFAULT)
        .map((h) => h.sort as SortCol)

      activeSorts.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

      // 3. If the clicked column was already in the list, remove it to re-add it at the end.
      // This makes the last clicked column the highest priority in the sort order.
      const existingIndex = activeSorts.findIndex((s) => s.key === sort.key)
      if (existingIndex > -1) {
        activeSorts.splice(existingIndex, 1)
      }

      const clickedSortObject = targetHeader?.sort
      // 4. If the new state is not DEFAULT, add it to the end of the list.
      if (clickedSortObject && clickedSortObject.sort !== SortTable.DEFAULT) {
        activeSorts.push(clickedSortObject)
      }

      // 5. Re-assign the 'order' property based on the new sequence.
      activeSorts.forEach((sort, index) => {
        sort.order = index
      })

      // 6. Clean up the 'order' for any headers that are no longer sorted.
      const activeSortKeys = new Set(activeSorts.map((s) => s.key))
      tableHeaders.forEach((header) => {
        if (header.sort && !activeSortKeys.has(header.sort.key)) {
          header.sort.order = undefined
        }
      })

      this._tableConfigurations.set({ ...this._tableConfigurations(), headers: tableHeaders })
      this.sortChanged.emit(activeSorts)
    }
  }

  convertToString(value?: any): string | undefined {
    if (value === null) return undefined
    return JSON.stringify(value)
  }

  protected readonly SortType = SortType
}
