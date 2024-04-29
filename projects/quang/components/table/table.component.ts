import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  input,
  output,
  signal
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { TranslocoPipe } from '@ngneat/transloco'
import { interval } from 'rxjs'

export interface TableHeader {
  text: string
  sort?: SortCol
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
  DESC
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangTableComponent<T> implements AfterViewInit {
  @ViewChild('tableHeader') set tableHeader(val: ElementRef<HTMLElement>) {
    this._tableHeader = val
    this.fixTableHeaderWidth()
  }

  clickableRow = input<boolean>(false)
  selectedRows = input<string[] | number[]>()
  stickyTable = input<boolean>(true)
  sortableTable = input<boolean>(false)
  selectedRaw = output<TableRow<T>>()
  sortChanged = output<SortCol>()

  public sortTable = SortTable
  theadFixed: boolean = false

  _takeUntilDestroyed = signal(takeUntilDestroyed())

  _tableHeader!: ElementRef<HTMLElement>

  get tableHeader(): ElementRef<HTMLElement> {
    return this._tableHeader
  }

  _fakeTableHeader!: ElementRef<HTMLElement>

  get fakeTableHeader(): ElementRef<HTMLElement> {
    return this._fakeTableHeader
  }

  @ViewChild('fakeTableHeader') set fakeTableHeader(val: ElementRef<HTMLElement>) {
    this._fakeTableHeader = val
    this.fixTableHeaderWidth()
  }

  _tableConfigured: TableConfiguration<T> = {
    headers: [],
    rows: []
  }

  get tableConfigured(): TableConfiguration<T> {
    return this._tableConfigured
  }

  @Input() set tableConfigured(val: TableConfiguration<T>) {
    this._tableConfigured = val
    this.fixTableHeaderWidth()
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.fixTableHeaderWidth()
  }

  ngAfterViewInit(): void {
    this.fixTableHeaderWidth()
    interval(500)
      .pipe(this._takeUntilDestroyed())
      .subscribe(() => {
        this.fixTableHeaderWidth()
      })
  }

  onClickRow(row: TableRow<T>): void {
    if (this.clickableRow()) {
      this.selectedRaw.emit(row)
    }
  }

  isSelected(rowId: string | number): boolean {
    return !!this.selectedRows()?.some((x) => x === rowId)
  }

  emitOrderTable(sorting: SortCol): void {
    const orderCol: SortCol = sorting
    this.sortChanged.emit(orderCol)
  }

  fixTableHeaderWidth() {
    setTimeout(() => {
      const stickyColumns = this.tableHeader?.nativeElement?.querySelectorAll('th')

      // Copy the column widths from our hidden Primary table header to our Sticky Table header.
      const ths = this.fakeTableHeader?.nativeElement?.querySelectorAll('th')

      if (stickyColumns && ths) {
        for (let i = 0; i < ths?.length; i++) {
          const th = ths[i]
          // Since the Sticky Table header is expected to be an exact copy of the Primary Table, we know their indices will be the same.
          stickyColumns[i].style.minWidth = th.offsetWidth + 'px'
          stickyColumns[i].style.maxWidth = th.offsetWidth + 'px'
        }
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fixTableHeaderWidth()
  }
}
