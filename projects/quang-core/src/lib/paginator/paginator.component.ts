import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, Renderer2,
  SimpleChanges, ViewChild
} from '@angular/core'
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'quix-paginator',
  templateUrl: './paginator.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() id: string
  @Input() customClass: string
  @Input() totalItems: number
  @Input() tabIndex: number
  @Input() ariaLabel: string
  @Input() sizeList: number[]
  @Input() pageSize: number
  @Input() pageIndex: number
  @Output() onPageChange = new EventEmitter<number>()
  @Output() onSizeChange = new EventEmitter<number>()
  @ViewChild('quixPaginator', { static: true }) paginator: MatPaginator
  @ViewChild('input', { static: true }) input: ElementRef<HTMLSelectElement>

  _length: number
  _pageIndex: number
  _pageSize: number

  constructor (
    private renderer: Renderer2,
  ) {

  }

  ngOnInit (): void {

  }

  ngOnChanges (changes: SimpleChanges) {
    if (changes.totalItems?.currentValue) {
      this._length = changes.totalItems?.currentValue
      this.paginator.length = changes.totalItems?.currentValue
    }
    if (changes.pageIndex) {
      if (changes.pageIndex.currentValue >= 0 && changes.pageIndex.currentValue !== this._pageIndex) {
        this._pageIndex = changes.pageIndex.currentValue
        this.paginator.pageIndex = changes.pageIndex.currentValue
      }
    }
    if (changes.pageSize) {
      if (changes.pageSize.currentValue >= 0 && changes.pageSize.currentValue !== this._pageSize) {
        this.paginator.pageSize = changes.pageSize.currentValue
        this.renderer.setProperty(this.input?.nativeElement, 'value', changes.pageSize.currentValue)
      }
    }
  }

  onChangePage (event) {
    if (event.pageIndex !== this._pageIndex) {
      this._pageIndex = event.pageIndex
      this.onPageChange.emit(this._pageIndex)
    }
  }

  onChangeSize (event) {
    this.paginator.pageSize = parseInt((event.target as HTMLInputElement).value)
    this._pageSize = parseInt((event.target as HTMLInputElement).value)
    this.onSizeChange.emit(this._pageSize)
  }

  goToFirstPage () {
    this.paginator.firstPage()
  }

}
