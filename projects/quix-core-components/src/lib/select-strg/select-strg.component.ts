import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {QuixStyleService} from "../style/style.service";

@Component({
  selector: 'quix-select-strg',
  templateUrl: './select-strg.component.html',
  styleUrls: ['./select-strg.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectStrgComponent),
      multi: true
    }
  ]
})
export class SelectStrgComponent implements ControlValueAccessor {
  @Input() ariaLabel: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() customClass: string;
  @Input() validator: string | null;
  @Input() autofocus: boolean;
  @Input() disabled: boolean;
  @Input() list: Array<string | number>;
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

  constructor(private style: QuixStyleService) {
  }

  onChange(val) {
  }

  onTouched() {
  }

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
    if (value) {
      if (value.target) {
        this.value = value.target;
      } else {
        this.value = value
      }
    } else {
      this.value = value;
    }
  }

  getClass() {
    return this.style.getClassArray(this.validator, this.customClass);
  }

}
