import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {QuixStyleService} from "../style/style.service";



@Component({
  selector: 'quix-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ]
})
export class SliderComponent implements ControlValueAccessor {
  @Input() ariaLabel: string;
  @Input() label: string;
  @Input() ariaLAbel: string;
  @Input() id: string;
  @Input() successMessage: string;
  @Input() helpMessage: string;
  @Input() errorMessage: string;
  @Input() classValidation: string | null;
  @Input() disabled: boolean;
  @Input() vertical: boolean;
  @Input() required: boolean;
  @Input() tabIndex: number;
  @Input() interval: number;
  @Input() maxValue: number;
  @Input() minValue: number;
  @Input() customClass: string;
  // tslint:disable-next-line:variable-name
  _value: number;
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
    return this.style.getClassArray(this.classValidation, this.customClass);
  }
}
