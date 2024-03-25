import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-multi-select-obj',
  templateUrl: './multi-select-obj.component.html',
  styles: []
})
export class MultiSelectObjComponent implements OnInit {
  list: any[] = []

  group: FormGroup = new FormGroup({
    items: new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
    setTimeout(() => {
      this.group.patchValue({
        items: [3, 2]
      })
    }, 1000)
    setTimeout(() => {
      this.list = [
        { value: 0, text: 'Item 0' },
        { value: 1, text: 'Item 1' },
        { value: 2, text: 'Item 2' },
        { value: 3, text: 'Item 3' },
        { value: 4, text: 'Item 4' },
        { value: 5, text: 'Item 5' }
      ]
    }, 3000)
  }

  reset(): void {
    this.group.reset({ items: [] })
  }
}
