import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-email',
  templateUrl: './email.component.html',
  styles: []
})
export class EmailComponent {
  config: string[] = [
    "@Input() label: string = ''",
    "@Input() placeholder: string = ''",
    "@Input() id: string = ''",
    '@Input() successMessage: boolean = false',
    '@Input() errorMessage: boolean = false',
    '@Input() helpMessage: boolean = false',
    '@Input() autofocus: boolean = false',
    '@Input() readonly: boolean = false',
    '@Input() multiple: boolean = false',
    "@Input() pattern: string = ''",
    '@Input() ariaLabel: string = `Input ${this.label}`',
    '@Input() tabIndex: number = 0',
    "@Input() formName: string = ''",
    '@Input() customClass: string[] = []',
    '@Input() min: number = 0',
    '@Input() max: number = 0',
    "@Input() size: 'lg' | 'sm' | null = null",
    "@Input() autocomplete: string = 'off'"
  ]

  group: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
      Validators.minLength(0)
    ])
  })

  groupMinMax: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
      Validators.minLength(0)
    ])
  })
}
