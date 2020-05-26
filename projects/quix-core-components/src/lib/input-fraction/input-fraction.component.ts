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
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {QuixStyleService} from "../style/style.service";


@Component({
  selector: 'quix-input-fraction',
  templateUrl: './input-fraction.component.html',
  styleUrls: ['./input-fraction.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFractionComponent),
      multi: true
    }
  ]
})
export class InputFractionComponent implements ControlValueAccessor, AfterViewInit, OnChanges {
  @Input() id: string;
  @Input() label: string;
  @Input() stepInteger: number;
  @Input() stepFraction: number;
  @Input() ariaLabel: string;
  @Input() helpMessage: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() customClass: string;
  @Input() classValidation: string | null;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() tabIndex: number;
  @Input() min: number;
  @Input() max: number;
  @Input() addButtonClass: string[];
  @Input() removeButtonClass: string[];
  @Input() addButtonIcon: string[];
  @Input() removeButtonIcon: string[];


  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: number;
  @ViewChild('input') input: ElementRef<HTMLInputElement>

  _valueInteger: string;
  _valueFraction: string;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this._valueInteger = Math.floor(val).toString();
    this._valueFraction = (val - parseInt(this._valueInteger)).toFixed(3).replace('0.', '');
    this.onChange(val);
    this.onTouched();
  }

  constructor(private style: QuixStyleService) {
    this.value = 0
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
      if (value.target) {
        this.value = value.target.value;
      } else {
        this.value = value;
      }
    } else {
      this.value = value;
    }
  }

  writeValueInteger(event) {
    this.value -= Math.floor(this.value)
    this.value += Math.floor(event.target.value)
  }

  writeValueFraction(event) {
    this.value -= this.value % 1
    this.value += parseFloat('0.' + event.target.value)
  }

  getClass() {
    return this.style.getClassArray(this.classValidation, this.customClass);
  }

  addInteger() {
    if (this.value < this.max && this.value >= this.min) {
      if (this.value % this.stepInteger) {
        this.value += (this.stepInteger - (this.value % this.stepInteger))
      } else {
        this.value += this.stepInteger
      }
    }
  }

  addFraction() {
    if (this.value < this.max && this.value >= this.min) {
      if (this.value % this.stepFraction) {
        this.value += (this.stepFraction - (this.value % this.stepFraction))
      } else {
        this.value += this.stepFraction
      }
    }
  }

  removeInteger() {
    if (this.value <= this.max && this.value > this.min) {
      if (this.value % this.stepInteger) {
        this.value -= (this.stepInteger - (this.value % this.stepInteger))
      } else {
        this.value -= this.stepInteger
      }
    }
  }

  removeFraction() {
    if (this.value <= this.max && this.value > this.min) {
      if (this.value % this.stepFraction) {
        this.value -= (this.stepFraction - (this.value % this.stepFraction))
      } else {
        this.value -= this.stepFraction
      }
    }
  }

}
