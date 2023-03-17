import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: []
})
export class TextEditorComponent {
  group: FormGroup = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(500)
    ])
  })

  groupBars: FormGroup = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(500)
    ])
  })

  groupHtml: FormGroup = new FormGroup({
    text: new FormControl(
      '<p><strong style="color: rgb(230, 0, 0);"><em><u>Provaaaaaa</u></em></strong></p>',
      [Validators.required, Validators.minLength(0), Validators.maxLength(500)]
    )
  })
}
