import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input, OnChanges, OnInit,
  Optional, QueryList,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild, ViewChildren
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'quix-multi-select-strg',
  templateUrl: './multi-select-strg.component.html',
  styleUrls: ['./multi-select-strg.component.scss']
})
export class MultiSelectStrgComponent implements ControlValueAccessor, AfterViewInit, OnInit, OnChanges {
  @Input() ariaLabel: string
  @Input() label: string
  @Input() id: string
  @Input() successMessage: boolean
  @Input() errorMessage: boolean
  @Input() helpMessage: boolean
  @Input() autofocus: boolean
  @Input() rowVisible: number
  @Input() list: Array<string | number>
  @Input() formName: string
  @Input() nullOption: boolean = true
  @Input() customClass: string[]
  _value: string[]
  _successMessage: string
  _errorMessage: string
  _helpMessage: string
  _requiredValue: any
  _classArray: string[] = []
  @ViewChild('input', { static: true }) input: ElementRef<HTMLSelectElement>
  @ViewChildren('options') options: QueryList<ElementRef<HTMLOptionElement>>
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
    this._value = this.options
      .filter(o => o.nativeElement.selected)
      .map(o => o.nativeElement.value)
    this.onTouched()
    this.onChanged(this._value)
  }

  // This is a basic setter that the forms API is going to use
  writeValue (value) {
    this._value = value
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
