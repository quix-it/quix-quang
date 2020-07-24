import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import * as _moment from 'moment';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {BsDatepickerConfig, BsLocaleService} from "ngx-bootstrap/datepicker";
import {QuixStyleService} from "../style/style.service";


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
export class InputDateTimeComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() classValidation: string;
  @Input() customClass: string;
  @Input() helpMessage: string;
  @Input() dateFormat: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() locale: string;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() showSecond: boolean;
  @Input() showWeekNumbers: boolean;
  @Input() showSelector: boolean;
  @Input() showMeridianButton: boolean;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() autofocus: boolean;
  @Input() disabledDates: Array<Date>;
  @Input() iconClass: Array<string>;
  @Input() hourStep: number;
  @Input() minuteStep: number;
  @Input() secondStep: number;
  @Input() useMoment: number;
  @Input() disabledDaysOfTheWeek: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>;
  @Input() ariaLabel: string;
  @Input() buttonClass: string[];
  @Input() tabIndex: number;
  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: any;
  config: Partial<BsDatepickerConfig>;
  moment = _moment;
  margin: string
  @ViewChild('input') input: ElementRef<HTMLInputElement>

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
    if (this.label) {
      if (this.showSelector) {
        this.margin = '.3rem'
      } else {
        this.margin = '2rem'
      }
    } else {
      this.margin = '0'
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.nativeElement.focus()
      }
    }, 0)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus && this.input) {
      this.input.nativeElement.focus()
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
    if (value) {
      if (this.useMoment) {
        this.value = this.moment(value);
      } else {
        this.value = value;
      }
    }
  }

  getClass() {
    return this.style.getClassArray(this.classValidation, this.customClass);
  }

}
