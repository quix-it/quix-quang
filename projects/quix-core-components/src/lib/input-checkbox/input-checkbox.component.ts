import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {QuixStyleService} from "../style/style.service";

@Component({
  selector: 'quix-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckboxComponent),
      multi: true
    }
  ]
})
export class InputCheckboxComponent implements ControlValueAccessor {
  @Input() id: string;
  @Input() label: string;
  @Input() customClass: Array<string>;
  @Input() disabled: boolean;
  @Input() inline: boolean;
  @Input() required: boolean;
  @Input() ariaLabel: string;
  @Input() classValidation: string;
  @Input() tabIndex: number;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() helpMessage: string;
  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: string;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor(
    private style: QuixStyleService
  ) { }

  onChange(val) { }

  onTouched() { }

  // We implement this method to keep a reference to the onChange
  // callback function passed by the forms API
  registerOnChange(fn) {
    this.onChange = fn;
  }
  // We implement this method to keep a reference to the onTouched
  // callback function passed by the forms API
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  // This is a basic setter that the forms API is going to use
  writeValue(value) {
    if (value.target) {
      this.value = value.target.value;
    } else {
      this.value = value;
    }
  }
  getClass() {
    var arrayClass = this.style.getClassArray(this.classValidation, this.customClass);
    if(this.inline){
      arrayClass.push('custom-control-inline')
    }
    return arrayClass
  }
}
