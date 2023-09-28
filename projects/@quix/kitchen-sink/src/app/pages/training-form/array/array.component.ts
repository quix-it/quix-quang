import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'ks-array',
  templateUrl: './array.component.html',
  styles: []
})
export class ArrayComponent {
  group: FormGroup = new FormGroup({
    array: new FormArray([new FormControl('')])
  })

  get array(): FormArray {
    return this.group.controls['array'] as FormArray
  }

  addControl(): void {
    this.array.push(new FormControl(''))
  }

  removeControl(): void {
    this.array.removeAt(this.array.length - 1)
  }
}
