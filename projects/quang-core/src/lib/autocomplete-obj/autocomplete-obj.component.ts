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
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead'

@Component({
  selector: 'quix-autocomplete-obj',
  templateUrl: './autocomplete-obj.component.html',
  styles: ['']
})
export class AutocompleteObjComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
  @Input() label: string
  @Input() placeholder = ''
  @Input() id: string
  @Input() successMessage: boolean
  @Input() errorMessage: boolean
  @Input() helpMessage: boolean
  @Input() autofocus: boolean
  @Input() readonly: boolean
  @Input() ariaLabel: string
  @Input() tabIndex: number
  @Input() startAfter: number
  @Input() returnValue: string
  @Input() searchBy: string
  @Input() dataList: Array<any> = []
  @Input() formName: string
  @Input() optionLimit: number
  @Input() customClass: string[] = []

  _value: string | number
  _successMessage: string
  _errorMessage: string
  _helpMessage: string
  _requiredValue: any
  _searchValue: string
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

  onChangedHandler (e: TypeaheadMatch) {
    this._value = e.item[this.returnValue]
    this.onTouched()
    this.onChanged(this._value)
  }

  writeValue (value) {
    if (this.dataList.find(item => item[this.returnValue] === value)) {
      this._searchValue = this.dataList.find(item => item[this.returnValue] === value)[this.searchBy]
    }
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
                this._requiredValue = this.control.errors[error].requiredValue
              }
            }
          }
        }
      }
    })
  }

}
