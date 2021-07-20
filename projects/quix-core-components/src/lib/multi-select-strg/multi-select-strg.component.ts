import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {QuixStyleService} from "../style/style.service";


@Component({
  selector: 'quix-multi-select-strg',
  templateUrl: './multi-select-strg.component.html',
  styleUrls: ['./multi-select-strg.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectStrgComponent),
      multi: true
    }
  ]
})
export class MultiSelectStrgComponent implements ControlValueAccessor {
    /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`;
    /**
   * The label to display on the input field
   */
  @Input() label: string = '';
    /**
   * The placeholder of the input field
   */
  @Input() placeholder: string = '';
    /**
   * Html id of input
   */
  @Input() id: string = '';
  @Input() helpMsg: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() customClass: string;
  @Input() validator: string | null;
    /**
   * Indicates whether, when the page is opened,
   * this input field should be displayed in a focused state or not
   */
  @Input() autofocus: boolean = false;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() rowVisible: number;
  @Input() list: Array<string | number>;
  @Input('value')
    // tslint:disable-next-line:variable-name
  /**
   * The value of the input
   */
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
