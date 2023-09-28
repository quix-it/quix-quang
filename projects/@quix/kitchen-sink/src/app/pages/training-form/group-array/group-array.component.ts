import { Component } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'ks-group-array',
  templateUrl: './group-array.component.html',
  styles: []
})
export class GroupArrayComponent {
  group: FormGroup = new FormGroup({
    array1: new FormArray([]),
    array2: new FormArray([])
  })

  get array1(): FormArray {
    return this.group.controls['array1'] as FormArray
  }

  get array2(): FormArray {
    return this.group.controls['array2'] as FormArray
  }

  addArray1(): void {
    this.array1.push(new FormControl(''))
  }

  addArray2(): void {
    this.array2.push(new FormControl(''))
  }

  removeArray1(): void {
    this.array1.removeAt(this.array1.length - 1)
  }

  removeArray2(): void {
    this.array2.removeAt(this.array2.length - 1)
  }
}
