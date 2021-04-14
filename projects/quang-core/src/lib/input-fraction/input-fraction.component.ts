import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'quix-input-fraction',
  templateUrl: './input-fraction.component.html',
  styles: ['']
})
export class InputFractionComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnChanges {
  @Input() id: string
  @Input() label: string
  @Input() stepInteger: number
  @Input() stepFraction: number
  @Input() ariaLabel: string
  @Input() helpMessage: boolean
  @Input() successMessage: boolean
  @Input() errorMessage: boolean
  @Input() autofocus: boolean
  @Input() readonly: boolean
  @Input() tabIndex: number
  @Input() min: number
  @Input() max: number
  @Input() addButtonClass: string[]
  @Input() removeButtonClass: string[]
  @Input() addButtonIcon: string[]
  @Input() removeButtonIcon: string[]
  @Input() formName: string
  @Input() customClass: string[] = []
  @Input() size: 'lg' | 'sm' = null
  @Input() autocomplete: string = 'off';

  _value: number
  _successMessage: string
  _errorMessage: string
  _helpMessage: string
  _requiredValue: any
  _disabled: boolean
  onTouched: any = () => {
  }
  onChanged: any = () => {
  }
  @ViewChild('inputInteger', { static: true }) inputInteger: ElementRef<HTMLInputElement>
  @ViewChild('inputFraction', { static: true }) inputFraction: ElementRef<HTMLInputElement>

  constructor (
    private renderer: Renderer2,
    @Self() @Optional() public control: NgControl,
  ) {
    this.control && (this.control.valueAccessor = this)

  }

  ngAfterViewInit (): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.inputInteger.nativeElement.focus()
      }
    }, 0)
    this.observeValidate()
  }

  ngOnInit () {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control.name}.help`
    }
    if(!this.ariaLabel){
      this.ariaLabel = `Input ${this.label}`
    }
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.autofocus && this.inputInteger) {
      this.inputInteger.nativeElement.focus()
    }
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

  // This is a basic setter that the forms API is going to use
  writeValue (value: number) {
    if (!value) {
      this._value = 0
    } else {
      this._value = value
    }
    this.setInput()
  }

  setInput () {
    this.renderer.setProperty(this.inputInteger.nativeElement, 'value', Math.floor(this._value).toString())
    this.renderer.setProperty(this.inputFraction.nativeElement, 'value', (this._value - Math.floor(this._value)).toFixed(3).replace('0.', ''))
  }

  writeValueInteger (e: Event) {
    this._value -= Math.floor(this._value)
    this._value += Math.floor(parseInt((e.target as HTMLInputElement).value))
    this.onTouched()
    this.onChanged(this._value)
  }

  writeValueFraction (e: Event) {
    this._value -= parseInt((e.target as HTMLInputElement).value) % 1
    this._value += parseFloat('0.' + (e.target as HTMLInputElement).value)
    this.onTouched()
    this.onChanged(this._value)
  }

  addInteger () {
    if (this._value < this.max && this._value >= this.min) {
      if (this._value % this.stepInteger) {
        this._value += (this.stepInteger - (this._value % this.stepInteger))
      } else {
        this._value += this.stepInteger
      }
    }
    this.setInput()
    this.onTouched()
    this.onChanged(this._value)
  }

  addFraction () {
    if (this._value < this.max && this._value >= this.min) {
      if (this._value % this.stepFraction) {
        this._value += (this.stepFraction - (this._value % this.stepFraction))
      } else {
        this._value += this.stepFraction
      }
    }
    this.setInput()
    this.onTouched()
    this.onChanged(this._value)
  }

  removeInteger () {
    if (this._value <= this.max && this._value > this.min) {
      if (this._value % this.stepInteger) {
        this._value -= (this.stepInteger - (this._value % this.stepInteger))
      } else {
        this._value -= this.stepInteger
      }
    }
    this.setInput()
    this.onTouched()
    this.onChanged(this._value)
  }

  removeFraction () {
    if (this._value <= this.max && this._value > this.min) {
      if (this._value % this.stepFraction) {
        this._value -= (this.stepFraction - (this._value % this.stepFraction))
      } else {
        this._value -= this.stepFraction
      }
    }
    this.setInput()
    this.onTouched()
    this.onChanged(this._value)
  }

  setDisabledState (isDisabled: boolean): void {
    this.renderer.setProperty(this.inputInteger.nativeElement, 'disabled', isDisabled)
    this.renderer.setProperty(this.inputFraction.nativeElement, 'disabled', isDisabled)
    this._disabled = isDisabled
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
