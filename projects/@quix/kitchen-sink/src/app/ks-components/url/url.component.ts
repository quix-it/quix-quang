import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-url',
  templateUrl: './url.component.html',
  styles: []
})
export class UrlComponent {
  config: string[] = [
    "@Input() label: string = ''",
    '@Input() ariaLabel: string = `Input ${this.label}`',
    '@Input() customClass: string[] = []',
    "@Input() placeholder: string = ''",
    "@Input() id: string = ''",
    "@Input() formName: string = ''",
    '@Input() helpMessage: boolean = false',
    '@Input() errorMessage: boolean = false',
    '@Input() successMessage: boolean = false',
    '@Input() min: number = 0',
    '@Input() max: number = 0',
    "@Input() pattern: string = ''",
    '@Input() autofocus: boolean = false',
    '@Input() readonly: boolean = false',
    '@Input() tabIndex: number = 0',
    "@Input() size: 'lg' | 'sm' | null = null",
    "@Input() autocomplete: string = 'off'"
  ]

  group: FormGroup = new FormGroup({
    url: new FormControl('', [
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(50)
    ])
  })
}
