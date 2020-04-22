import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {QuixStyleService} from '../style/style.service';


@Component({
  selector: 'quix-input-color',
  templateUrl: './input-color.component.html',
  styleUrls: ['./input-color.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputColorComponent),
      multi: true
    }
  ]
})
export class InputColorComponent implements ControlValueAccessor {
  @Input() id: string;
  @Input() label: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() customClass: string;
  @Input() helpMsg: string;
  @Input() validator: string | null;
  @Input() autofocus: boolean;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() ariaLabel: string = this.label;
  @Input() tabIndex: number;
  // tslint:disable-next-line:no-input-rename
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
  constructor(private style: QuixStyleService) { }

  onChange(val) { }

  onTouched() { }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

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
