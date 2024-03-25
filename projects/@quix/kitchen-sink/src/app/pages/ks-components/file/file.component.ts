import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-file',
  templateUrl: './file.component.html',
  styles: []
})
export class FileComponent {
  config: string[] = [
    "@Input() id: string = ''",
    "@Input() label: string = ''",
    // eslint-disable-next-line no-template-curly-in-string
    '@Input() ariaLabel: string = `Input ${this.label}`',
    '@Input() buttonLabel: string',
    "@Input() formName: string = ''",
    '@Input() helpMessage: boolean = false',
    '@Input() errorMessage: boolean = false',
    '@Input() multiple: boolean = false',
    '@Input() successMessage: boolean = false',
    '@Input() tabIndex: number = 0',
    '@Input() buttonClass: string[] = []',
    '@Input() customClass: string[] = []',
    '@Output() whenDragOver: EventEmitter<any> = new EventEmitter<any>()',
    '@Output() whenDragLeave: EventEmitter<any> = new EventEmitter<any>()'
  ]

  group: FormGroup = new FormGroup({
    file: new FormControl(null, Validators.required)
  })

  groupMulti: FormGroup = new FormGroup({
    file: new FormControl(null, Validators.required)
  })

  testGroup: FormGroup = new FormGroup({
    file: new FormControl(null, Validators.required)
  })
}
