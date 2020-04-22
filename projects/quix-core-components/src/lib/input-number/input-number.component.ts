import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {QuixStyleService} from '../style/style.service';


@Component({
  selector: 'quix-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    }
  ]
})
export class InputNumberComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() validator: string | null;
  @Input() min: number;
  @Input() max: number;
  @Input() pattern: string;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() customClass: string;
  @Input() ariaLabel: string;
  @Input() tabIndex: number;
  @Input() step: number;
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
    if (value.target) {
      this.value = value.target.value;
    } else {
      this.value = value;
    }
  }

  getClass() {
    return this.style.getClassArray(this.validator, this.customClass);
  }
}
