import {
  Component,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as _moment from 'moment';

import {BsDatepickerConfig, BsLocaleService} from "ngx-bootstrap/datepicker";
import {QuixStyleService} from "../style/style.service";


@Component({
  selector: 'quix-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    }
  ]
})
export class InputDateComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() classValidation: string;
  @Input() customClass: string;
  @Input() helpMessage: string;
  @Input() autofocus: boolean;
  @Input() errorMessage: string;
  @Input() successMessage: string;
  @Input() disabled: boolean;
  @Input() required: boolean;
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
  @Input() buttonClass: string[];
  @Input() tabIndex: number;
  @Input('value')
  // tslint:disable-next-line:variable-name
  _value: any;
  config: Partial<BsDatepickerConfig>;
  moment = _moment;
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
    private style: QuixStyleService,
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
