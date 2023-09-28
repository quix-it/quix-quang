import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Clipboard } from '@angular/cdk/clipboard'

@Component({
  selector: 'ks-clipboard',
  templateUrl: './clipboard.component.html',
  styles: []
})
export class ClipboardComponent {
  group: FormGroup = new FormGroup({
    copy: new FormControl('', [
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(50)
    ])
  })

  constructor(private readonly clipboard: Clipboard) {}

  copy() {
    this.clipboard.copy('Ciao io sono deadpool')
  }
}
