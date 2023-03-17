import { Component, OnInit } from '@angular/core'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'

@Component({
  selector: 'ks-drag-drop',
  templateUrl: './drag-drop.component.html',
  styles: []
})
export class DragDropComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep']

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog']

  row = [
    { id: 'row1', value: ['val', 'val', 'val', 'val', 'val'] },
    { id: 'row2', value: ['val', 'val', 'val', 'val', 'val'] }
  ]

  connectedTo = ['row1', 'row2']

  dropConnection(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }

  addRow(): void {
    this.row.push({
      id: 'row' + (this.row.length + 1),
      value: ['val', 'val', 'val', 'val', 'val']
    })
    this.connectedTo.push('row' + this.row.length)
  }

  getIndex(i: number, y: number): number {
    for (let z = 0; z < i; z++) {
      y += this.row[z].value.length
    }
    return y
  }
}
