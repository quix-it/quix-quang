import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'ks-training-map',
  templateUrl: './training-map.component.html',
  styles: []
})
export class TrainingMapComponent implements OnInit {
  map: Map<any, any> = new Map()
  group: FormGroup = new FormGroup({
    key: new FormControl(''),
    value: new FormControl('')
  })

  ngOnInit(): void {}

  add(): void {
    try {
      this.map.set(
        this.group.controls['key'].value,
        JSON.parse(this.group.controls['value'].value)
      )
    } catch (e) {
      this.map.set(
        this.group.controls['key'].value,
        this.group.controls['value'].value
      )
    }
    this.group.markAsPristine()
    this.group.reset()
  }

  delete(): void {
    this.map.delete(this.group.controls['key'].value)
    this.group.markAsPristine()
    this.group.reset()
  }

  clear(): void {
    this.map.clear()
  }
}
