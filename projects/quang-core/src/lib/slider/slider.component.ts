import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  Renderer2,
  Self,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { delay } from 'rxjs/operators'
import { MatSlider, MatSliderChange } from '@angular/material/slider'

@Component({
  selector: 'quix-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input() ariaLabel: string
  @Input() label: string
  @Input() ariaLAbel: string
  @Input() id: string
  @Input() successMessage: boolean
  @Input() errorMessage: boolean
  @Input() helpMessage: boolean
  @Input() vertical: boolean
  @Input() disabled: boolean
  @Input() tabIndex: number
  @Input() interval: number
  @Input() maxValue: number
  @Input() minValue: number
  @Input() formName: string
  @Input() customClass: string[] = []

  _value: number
  _successMessage: string
  _errorMessage: string
  _helpMessage: string
  _requiredValue: any
  @ViewChild('input', { static: true }) input: MatSlider
  onTouched: any = () => {
  }
  onChanged: any = () => {
  }

  constructor (
    private renderer: Renderer2,
    @Self() @Optional() public control: NgControl,
  ) {
    this.control && (this.control.valueAccessor = this)
  }

  ngOnInit () {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control.name}.help`
    }
    if(!this.ariaLabel){
      this.ariaLabel = `Input ${this.label}`
    }
  }

  ngAfterViewInit (): void {
    this.observeValidate()
  }

  // We implement this method to keep a reference to the onChange
  // callback function passed by the forms API
  registerOnChange (fn: any) {
    this.onChanged = fn
  }

  // We implement this method to keep a reference to the onTouched
  // callback function passed by the forms API
  registerOnTouched (fn: any) {
    this.onTouched = fn
  }

  onChangedHandler (e: MatSliderChange) {
    this._value = e.value
    this.onTouched()
    this.onChanged(this._value)
  }

  // This is a basic setter that the forms API is going to use
  writeValue (value) {
    this.input.value = value
  }

  setDisabledState (isDisabled: boolean): void {
    this.input.setDisabledState(isDisabled)
  }

  observeValidate () {
    this.control?.statusChanges.pipe(
      delay(0)
    ).subscribe(() => {
      if (this.control.dirty) {
        if (this.control.valid && this.successMessage) {
          this._successMessage = `${this.formName}.${this.control.name}.valid'`
        }
        if (this.control.invalid && this.errorMessage) {
          for (const error in this.control.errors) {
            if (this.control.errors.hasOwnProperty(error)) {
              if (this.control.errors[error]) {
                this._errorMessage = `${this.formName}.${this.control.name}.${error}`
                this._requiredValue = this.control.errors[error].requiredValue
              }
            }
          }
        }
      }
    })
  }
}
