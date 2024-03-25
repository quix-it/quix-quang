import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-toggle',
  templateUrl: './toggle.component.html',
  styles: []
})
export class ToggleComponent {
  config: string[] = [
    '@Input() customClass: string[] = []',
    "@Input() label: string = ''",
    // eslint-disable-next-line no-template-curly-in-string
    '@Input() ariaLabel: string = `Input ${this.label}`',
    '@Input() autofocus: boolean = false',
    "@Input() id: string = ''",
    '@Input() successMessage: boolean = false',
    '@Input() errorMessage: boolean = false',
    '@Input() helpMessage: boolean = false',
    '@Input() labelInline: boolean',
    "@Input() formName: string = ''",
    '@Input() tabIndex: number = 0'
  ]

  group: FormGroup = new FormGroup({
    toggle: new FormControl(false, Validators.required)
  })
}
