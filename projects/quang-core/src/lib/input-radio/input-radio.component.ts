import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  QueryList,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChildren
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'quix-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss']
})
export class InputRadioComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
  @Input() groupName: string
  @Input() id: string
  @Input() inline: boolean
  @Input() radioList: Array<any>
  @Input() autofocus: string
  @Input() ariaLabel: string
  @Input() tabIndex: number
  @Input() successMessage: boolean
  @Input() helpMessage: boolean
  @Input() errorMessage: boolean
  @Input() formName: string
  @Input() labelValue: string
  @Input() returnValue: string
  @Input() customClass: string[] = []
  @Input() label: string;
  @Input() autocomplete: string = 'off';

  _value: string
  _successMessage: string
  _errorMessage: string
  _helpMessage: string
  _requiredValue: any
  @ViewChildren('input') input: QueryList<ElementRef<HTMLInputElement>>
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
    setTimeout(() => {
      if (this.autofocus) {
        this.input.forEach((item) => {
          item.nativeElement.focus()
        })
      }
    }, 0)
    this.observeValidate()
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.autofocus && this.input) {
      this.input[0].nativeElement.focus()
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
  }

  setDisabledState (isDisabled: boolean): void {
    this.input?.forEach((item) => {
      this.renderer.setProperty(item.nativeElement, 'disabled', isDisabled)
    })
  }

  observeValidate () {
    this.control?.statusChanges
      .pipe(
        delay(0)
      )
      .subscribe(() => {
        if (this.control.dirty) {
          if (this.control.valid && this.successMessage) {
            this._successMessage = `${this.formName}.${this.control.name}.valid`
          } else if (this.control.invalid && this.errorMessage) {
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
