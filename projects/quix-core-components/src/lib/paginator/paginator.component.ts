import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'quix-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() currentPage: number;
  @Input() initialPage: number;
  @Input() totalItems: number;
  @Input() localItemsPerPage: number;
  @Input() maxSize: number;
  @Input() nextText: string;
  @Input() previousText: string;
  @Output() changedPage = new EventEmitter<any>();

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.localItemsPerPage) {
      this.cd.detectChanges();
      this.currentPage = 1;
    }
  }

  pageChanged(event) {
    this.changedPage.emit(event);
  }
}
