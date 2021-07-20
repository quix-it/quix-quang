import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RowSelectorModel} from './row-selector.model';

@Component({
  selector: 'quix-row-selector',
  templateUrl: './row-selector.component.html',
  styleUrls: ['./row-selector.component.scss']
})
export class RowSelectorComponent implements OnInit {
    /**
   * Html id of input
   */
  @Input() id: string = '';
  @Input() list: Array<RowSelectorModel>;
  @Input() showingLabel: string;
  @Input() ofLabel: string;
  @Input() customClass: string;
  @Input() totalItem: number;
  @Input() fromItem: number;
  @Input() toItem: number;
  @Input() defaultValue: number;
  @Output() onSelect = new EventEmitter<any>();
  public selected: number;

  constructor() {
  }

  ngOnInit() {
    this.selected = this.defaultValue;
  }

  onSelectChange() {
    this.onSelect.emit(this.selected);
  }
}
