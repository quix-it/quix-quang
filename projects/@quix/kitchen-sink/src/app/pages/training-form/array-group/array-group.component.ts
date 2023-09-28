import { Component } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'ks-array-group',
  templateUrl: './array-group.component.html',
  styles: []
})
export class ArrayGroupComponent {
  group: FormGroup = new FormGroup({
    array: new FormArray([
      new FormGroup({
        name: new FormControl(''),
        surname: new FormControl('')
      })
    ])
  })

  get array(): FormArray {
    return this.group.controls['array'] as FormArray
  }

  addGroup(): void {
    this.array.push(
      new FormGroup({
        name: new FormControl(''),
        surname: new FormControl('')
      })
    )
  }

  removeGroup(): void {
    this.array.removeAt(this.array.length - 1)
  }
}
