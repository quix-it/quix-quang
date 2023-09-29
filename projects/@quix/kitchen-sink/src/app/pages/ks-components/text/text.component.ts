import { Component, Input } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-text',
  templateUrl: './text.component.html',
  styles: []
})
export class TextComponent {
  @Input() errorMessage: boolean = true
  group: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)])
  })
}
