import {Component, forwardRef, Input, OnInit} from '@angular/core';
import * as _moment from 'moment';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {QuixStyleService} from '../style/style.service';
import {BsDatepickerConfig, BsLocaleService} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'quix-input-date-time',
  templateUrl: './input-date-time.component.html',
  styleUrls: ['./input-date-time.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateTimeComponent),
      multi: true
    }
  ]
})
export class InputDateTimeComponent implements ControlValueAccessor, OnInit {
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() validator: string;
  @Input() customClass: string;
  @Input() helpMsg: string;
  @Input() dateFormat: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() locale: string;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() required: boolean;
  @Input() showSecond: boolean;
  @Input() showWeekNumbers: boolean;
  @Input() showSelector: boolean;
  @Input() showMeridianButton: boolean;
  @Input() minDateTime: Date;
  @Input() maxDateTime: Date;
  @Input() autofocus: boolean;
  @Input() disabledDates: Array<Date>;
  @Input() iconClass: Array<string>;
  @Input() hourStep: number;
  @Input() minuteStep: number;
  @Input() secondStep: number;
  @Input() useMoment: number;
  @Input() disabledDaysOfTheWeek: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>;
  @Input() ariaLabel: string;
  @Input() btnClass: string;
  @Input() tabIndex: number;
  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: any;
  config: Partial<BsDatepickerConfig>;
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
    public style: QuixStyleService,
    private localeService: BsLocaleService
  ) {
  }

  ngOnInit(): void {
    this.config = Object.assign({}, {
      containerClass: 'theme-default',
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: this.dateFormat
    });
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
      } else {
        this.value = value.target.value;
      }
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

  checkPopUp() {
    return this.disabled || this.readonly;
  }
}
