import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColumnDataTableModel} from './column-data-table.model';
import {ActionDataTableModel} from './action-data-table.model';

@Component({
  selector: 'quix-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() columns: Array<ColumnDataTableModel>;
  @Input() data: Array<any>;
  @Input() maxHeight: string;
  @Input() maxWidth: string;
  @Input() fixHeader: boolean;
  @Input() fixFooter: boolean;
  @Input() actionIcon: Array<string>;
  @Input() actionList: Array<ActionDataTableModel>;
  @Output() defaultAction = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();

  displayColumn: Array<string>;

  constructor() {
  }

  ngOnInit() {
    this.displayColumn = [];
    if (this.columns.length) {
      this.columns.forEach((col) => {
        this.displayColumn.push(col.dataParams);
      });
      if (this.actionList) {
        this.displayColumn.push('action');
      }
    }
  }

  rowClick(element: any) {
    this.defaultAction.emit(element);
  }

  actionClick(element: any, action: string) {
    this.action.emit({row: element, actionName: action});
  }


}
