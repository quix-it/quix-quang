import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as _moment from 'moment';
import {QuixStyleService} from '../style/style.service';
import {BsLocaleService} from "ngx-bootstrap/datepicker";


@Component({
  selector: 'quix-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTimeComponent),
      multi: true
    }
  ]
})
export class InputTimeComponent implements ControlValueAccessor, OnInit {
  @Input() id: string;
  @Input() label: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() validator: string;
  @Input() helpMsg: string;
  @Input() customClass: string;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() readonly: boolean;
  @Input() showMeridianButton: boolean;
  @Input() minTime: Date;
  @Input() maxTime: Date;
  @Input() showSelector: boolean;
  @Input() showSecond: boolean;
  @Input() hourStep: number;
  @Input() minuteStep: number;
  @Input() secondStep: number;
  @Input() useMoment: boolean;
  @Input() ariaLabel: string;
  @Input() locale: string;
  @Input() tabIndex: number;
  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: any;
  moment = _moment;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor(
    private style: QuixStyleService,
    private localeService: BsLocaleService
  ) {
  }

  ngOnInit(): void {
    if (this.locale) {
      this.localeService.use(this.locale);
    }
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
      if (this.useMoment) {
        this.value = this.moment(value.target.value);
      }
      this.value = value.target.value;
    } else {
      if (this.useMoment) {
        this.value = this.moment(value);
      } else {
        this.value = value;
      }
    }
  }

  getClass() {
    return this.style.getClassArray(this.validator, this.customClass);
  }
}
