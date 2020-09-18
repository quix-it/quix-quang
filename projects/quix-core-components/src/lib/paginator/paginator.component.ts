import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'quix-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() customClass: string;
  @Input() totalItems: number;
  @Input() tabIndex: number;
  @Input() ariaLabel: string;
  @Input() sizeList: Array<number>;
  @Input() defaultPageSize: number;
  @Input() defaultPageIndex: number;
  @Output() changedSize = new EventEmitter<any>();
  @Output() onPageChange = new EventEmitter<any>();
  pageState: {
    length: number,
    pageIndex: number
    pageSize: number
    previousPageIndex: number
  }

  constructor() {
    this.pageState = {
      length: 0,
      pageIndex: 0,
      pageSize: 0,
      previousPageIndex: 0
    }
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.totalItems?.currentValue) {
      this.pageState.length = changes.totalItems?.currentValue
    }
    if (changes.defaultPageIndex?.currentValue) {
      this.pageState.pageIndex = changes.defaultPageIndex?.currentValue
    }
    if (changes.defaultPageSize?.currentValue) {
      this.pageState.pageSize = changes.defaultPageSize?.currentValue
    }
    if (changes.defaultPageSize?.currentValue) {
      this.pageState.previousPageIndex = changes.defaultPageSize?.currentValue
    }
    if (this.pageState.pageSize && this.pageState.length) {
      this.onPageChange.emit(this.pageState)
    }
  }

  onChangePage(event) {
    this.onPageChange.emit(event);
  }

  onChangeSize(e: any) {
    this.onPageChange.emit({...this.pageState, pageSize: parseInt(e.target.value)});
  }

}
