import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-radio',
  templateUrl: './radio.component.html',
  styles: []
})
export class RadioComponent {
  config: string[] = [
    "@Input() groupName: string = ''",
    "@Input() id: string = ''",
    "@Input() label: string = ''",
    '@Input() inline: boolean = false',
    '@Input() radioList: any[] = []',
    '@Input() autofocus: boolean = false',
    '@Input() ariaLabel: string = `Input ${this.label}`',
    '@Input() tabIndex: number = 0',
    '@Input() successMessage: boolean = false',
    '@Input() helpMessage: boolean = false',
    '@Input() errorMessage: boolean = false',
    "@Input() formName: string = ''",
    '@Input() labelValue: string | null = null',
    '@Input() returnValue: string | null = null',
    '@Input() customClass: string[] = []',
    "@Input() autocomplete: string = 'off'"
  ]

  list = [
    { value: 1, text: 'Item 1' },
    { value: 2, text: 'Item 2' },
    { value: 3, text: 'Item 3' },
    { value: 4, text: 'Item 4' },
    { value: 5, text: 'Item 5' }
  ]

  group: FormGroup = new FormGroup({
    radio: new FormControl({ value: null, disabled: true }, Validators.required)
  })

  disable(): void {
    this.group.get('radio')?.disable()
  }

  enable(): void {
    this.group.get('radio')?.enable()
  }
}
