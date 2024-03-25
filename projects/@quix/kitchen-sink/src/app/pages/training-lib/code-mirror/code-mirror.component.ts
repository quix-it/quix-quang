import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-code-mirror',
  templateUrl: './code-mirror.component.html',
  styles: []
})
export class CodeMirrorComponent {
  group: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)])
  })

  _markdown = {
    lineNumbers: true,
    theme: 'material',
    mode: 'markdown'
  }

  _html = {
    lineNumbers: true,
    theme: 'darcula',
    mode: 'htmlmixed'
  }

  _javascript = {
    lineNumbers: true,
    theme: 'cobalt',
    mode: 'javascript'
  }
}
