import {Component, forwardRef, Input, OnInit} from '@angular/core';
import * as _moment from 'moment';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {QuixStyleService} from '../style/style.service';
import {BsDatepickerConfig, BsLocaleService} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'quix-input-date-range',
  templateUrl: './input-date-range.component.html',
  styleUrls: ['./input-date-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateRangeComponent),
      multi: true
    }
  ]
})
export class InputDateRangeComponent implements ControlValueAccessor, OnInit {
  @Input() id: string;
  @Input() label: string;
  @Input() placeolder: string;
  @Input() validator: string;
  @Input() customClass: string;
  @Input() autofocus: boolean;
  @Input() errorMessage: string;
  @Input() successMessage: string;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() showWeekNumbers: boolean;
  @Input() dateFormat: string;
  @Input() locale: string;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() disabledDaysOfTheWeek: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>;
  @Input() disabledDates: Array<Date>;
  @Input() minView: 'year' | 'month' | 'day';
  @Input() iconClass: string | Array<string>;
  @Input() useMoment: boolean;
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
    private style: QuixStyleService,
    private localeService: BsLocaleService
  ) {
  }

  ngOnInit(): void {
    this.config = Object.assign({}, {
      containerClass: 'theme-default',
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: this.dateFormat,
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
        const temp = [];
        value.target.forEach((date: Date) => {
          temp.push(this.moment(date));
        });
        this.value = temp;
      }
      this.value = value.target.value;
    } else {
      if (this.useMoment) {
        const temp = [];
        value.forEach((date: Date) => {
          temp.push(this.moment(date));
        });
        this.value = temp;
      }
      this.value = value;
    }
  }

  getClass() {
    return this.style.getClassArray(this.validator, this.customClass);
  }

  checkPopUp() {
    return this.disabled || this.readonly;
  }
}
