import { NgClass, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core'

import { TranslocoPipe } from '@ngneat/transloco'

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
  imports: [TranslocoPipe, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangTableComponent {
  /*@Input() clickableRow: boolean = false
  @Input() stickyTable: boolean = true
  @Input() sortableTable: boolean = false
  @Output() clickedRow: EventEmitter<any> = new EventEmitter<any>()
  @Output() sortChanged: EventEmitter<SortCol> = new EventEmitter<SortCol>()*/
}
