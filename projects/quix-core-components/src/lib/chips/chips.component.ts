import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'quix-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {
    /**
   * Html id of input
   */
  @Input() id: string = ''
  @Input() labelValue: string
  @Input() chipsList: string[] | { [key: string]: any }[]
  @Input() buttonDelete: boolean
  @Input() buttonDeleteIcon: string[]
  @Output() onClick = new EventEmitter<any>()
  @Output() onDelete = new EventEmitter<any>()

  constructor() {
  }

  ngOnInit(): void {
  }

  onEventClick(value: any) {
    this.onClick.emit(value)
  }

  onEventDelete(value: any) {
    this.onDelete.emit(value)
  }
}
