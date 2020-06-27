import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'quix-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() id: string;
  @Input() customClass: string;
  @Input() totalItems: number;
  @Input() tabIndex: number;
  @Input() sizeListLabel: string;
  @Input() ariaLabel: string;
  @Input() sizeValue: number;
  @Input() sizeList: Array<number>;
  @Output() changedSize = new EventEmitter<any>();
  @Output() changedPage = new EventEmitter<any>();
  _pageValue: number;

  @Input() set pageValue(value: number) {
    if (value || value === 0) {
      this._pageValue = value;
      this.changedPage.emit(this.pageValue)
    }
  }

  get pageValue(): number {
    return this._pageValue;
  }

  constructor(
  ) {
  }

  ngOnInit() {
  }

  onChangePage(event) {
    this.pageValue = event.pageIndex;
  }

  onChangeSize(event) {
    this.changedSize.emit(this.sizeValue)
  }
}
