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
  selector: 'quix-input-color',
  templateUrl: './input-color.component.html',
  styles: [''],
})
export class InputColorComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnChanges {
  @Input() id: string
  @Input() label: string
  @Input() successMessage: boolean
  @Input() errorMessage: boolean
  @Input() helpMessage: boolean
  @Input() autofocus: boolean
  @Input() ariaLabel: string = this.label
  @Input() tabIndex: number
  @Input() formName: string
  @Input() readonly: boolean
  @Input() customClass: string[] = []
  @Input() placeholder: string = ''
  @Input() size: 'lg' | 'sm' = null
  @Input() autocomplete: string = 'off';

  _value: string
  _successMessage: string
  _errorMessage: string
  _helpMessage: string
  _requiredValue: any
  _classArray: string[] = []
  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>
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
      this._helpMessage = this.formName + '.' + this.control.name + '.help'
    }
    if(!this.ariaLabel){
      this.ariaLabel = `Input ${this.label}`
    }
  }

  ngAfterViewInit (): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.nativeElement.focus()
      }
    }, 0)
    this.observeValidate()
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.autofocus && this.input) {
      this.input.nativeElement.focus()
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

  onChangedHandler (e: Event) {
    this._value = (e.target as HTMLInputElement).value
    this.onTouched()
    this.onChanged(this._value)
  }

  // This is a basic setter that the forms API is going to use
  writeValue (value) {
    this._value = value
    this.renderer.setProperty(this.input?.nativeElement, 'value', value)
  }

  setDisabledState (isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled)
  }

  observeValidate () {
    this.control?.statusChanges.pipe(
      delay(0)
    ).subscribe(() => {
      if (this.control.dirty) {
        if (this.control.valid && this.successMessage) {
          this._successMessage = `${this.formName}.${this.control.name}.valid`
        }
        if (this.control.invalid && this.errorMessage) {
          for (const error in this.control.errors) {
            if (this.control.errors.hasOwnProperty(error)) {
              if (this.control.errors[error]) {
                this._errorMessage = `${this.formName}.${this.control.name}.${error}`
                if (error === 'minlength' || error === 'maxlength') {
                  this._requiredValue = this.control.errors[error].requiredLength
                } else {
                  this._requiredValue = this.control.errors[error].requiredValue
                }
              }
            }
          }
        }
      }
    })
  }
}
