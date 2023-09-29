import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-text-area',
  templateUrl: './text-area.component.html',
  styles: []
})
export class TextAreaComponent {
  config: string[] = [
    "@Input() label: string = ''",
    "@Input() placeholder: string = ''",
    "@Input() id: string = ''",
    '@Input() successMessage: boolean = false',
    '@Input() errorMessage: boolean = false',
    '@Input() helpMessage: boolean = false',
    '@Input() min: number = 0',
    '@Input() max: number = 0',
    '@Input() autofocus: boolean = false',
    '@Input() readonly: boolean = false',
    '@Input() autoResize: boolean = false',
    '@Input() rows: number = 0',
    '@Input() cols: number = 0',
    '@Input() tabIndex: number = 0',
    // eslint-disable-next-line no-template-curly-in-string
    '@Input() ariaLabel: string = `Input ${this.label}`',
    "@Input() formName: string = ''",
    "@Input() resizeMode: 'none' | 'auto' | 'vertical' | 'horizzontal' = 'auto'",
    '@Input() customClass: string[] = []'
  ]

  group: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(500)])
  })

  groupResize: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(500)])
  })
}
