import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ks-password',
  templateUrl: './password.component.html',
  styles: []
})
export class PasswordComponent {
  group: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required)
  })
}
