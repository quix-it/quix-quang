import { Component } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'ks-array-array',
  templateUrl: './array-array.component.html',
  styles: []
})
export class ArrayArrayComponent {
  group: FormGroup = new FormGroup({})

  addArray(): void {
    this.group.addControl(Object.keys(this.group.controls).length.toString(), new FormArray([]))
  }

  get groupKey(): string[] {
    return Object.keys(this.group.controls)
  }

  addArrayControl(index: string, subIndex: number): void {
    ;((this.group.controls[index] as FormArray).controls[subIndex] as FormArray).push(new FormControl())
  }

  addSubArray(index: string): void {
    ;(this.group.controls[index] as FormArray).push(new FormArray([]))
  }

  getArray(index: string): FormArray {
    return this.group.controls[index] as FormArray
  }

  getArrayControl(index: string, subIndex: number): FormArray {
    return (this.group.controls[index] as FormArray).controls[subIndex] as FormArray
  }
}
