import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-multi-select-strg',
  templateUrl: './multi-select-strg.component.html',
  styles: []
})
export class MultiSelectStrgComponent implements OnInit {
  list: string[] = []

  group: FormGroup = new FormGroup({
    items: new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
    setTimeout(() => {
      this.group.patchValue({
        items: ['Item 3', 'Item 2']
      })
    }, 1000)
    setTimeout(() => {
      this.list = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
    }, 4000)
  }

  reset(): void {
    this.group.reset()
  }
}
