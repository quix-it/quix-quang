import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {delay} from "rxjs/operators";
import {QuangConfig} from "../quang-config.model";

@Component({
  selector: 'quix-input-fraction',
  templateUrl: './input-fraction.component.html',
  styleUrls: ['./input-fraction.component.scss']
})
export class InputFractionComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnChanges {
  @Input() id: string;
  @Input() label: string;
  @Input() stepInteger: number;
  @Input() stepFraction: number;
  @Input() ariaLabel: string;
  @Input() helpMessage: boolean;
  @Input() successMessage: boolean;
  @Input() errorMessage: boolean;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() tabIndex: number;
  @Input() min: number;
  @Input() max: number;
  @Input() addButtonClass: string[];
  @Input() removeButtonClass: string[];
  @Input() addButtonIcon: string[];
  @Input() removeButtonIcon: string[];
  @Input() formName: string;
  @Input('value')
  _value: number;
  _config: QuangConfig;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  _classArray: string[] = [];
  disabled: boolean;

  @ViewChild('input1') input1: ElementRef<HTMLInputElement>;
  @ViewChild('input2') input2: ElementRef<HTMLInputElement>;

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

  constructor(private renderer: Renderer2,
              @Self() @Optional() public control: NgControl,
              @Optional() config: QuangConfig) {
    this.control && (this.control.valueAccessor = this);
    this._config = config;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input1.nativeElement.focus();
      }
    }, 0);
    this.observeValidate();
    this.disabled = this.input1.nativeElement.disabled;
  }

  ngOnInit() {
    if (this.helpMessage) {
      this._helpMessage = this.formName + '.' + this.control.name + '.help';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus && this.input1) {
      this.input1.nativeElement.focus();
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
    this.value -= Math.floor(this.value);
    this.value += Math.floor(event.target.value);
  }

  writeValueFraction(event) {
    this.value -= this.value % 1;
    this.value += parseFloat('0.' + event.target.value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input1?.nativeElement, 'disabled', isDisabled);
    this.renderer.setProperty(this.input2?.nativeElement, 'disabled', isDisabled);
    this.disabled = isDisabled;
  }

  addInteger() {
    if (this.value < this.max && this.value >= this.min) {
      if (this.value % this.stepInteger) {
        this.value += (this.stepInteger - (this.value % this.stepInteger));
      } else {
        this.value += this.stepInteger;
      }
    }
  }

  addFraction() {
    if (this.value < this.max && this.value >= this.min) {
      if (this.value % this.stepFraction) {
        this.value += (this.stepFraction - (this.value % this.stepFraction));
      } else {
        this.value += this.stepFraction;
      }
    }
  }

  removeInteger() {
    if (this.value <= this.max && this.value > this.min) {
      if (this.value % this.stepInteger) {
        this.value -= (this.stepInteger - (this.value % this.stepInteger));
      } else {
        this.value -= this.stepInteger;
      }
    }
  }

  removeFraction() {
    if (this.value <= this.max && this.value > this.min) {
      if (this.value % this.stepFraction) {
        this.value -= (this.stepFraction - (this.value % this.stepFraction));
      } else {
        this.value -= this.stepFraction;
      }
    }
  }

  observeValidate() {
    this.control?.valueChanges
      .pipe(
        delay(0)
      )
      .subscribe(() => {
        if (this.control.dirty) {
          if (this.control.valid && this.successMessage) {
            this._successMessage = this.formName + '.' + this.control.name + '.valid';
            this._classArray = [this._config.inputValidClass];
          } else if (this.control.invalid && this.errorMessage) {
            for (const error in this.control.errors) {
              if (this.control.errors.hasOwnProperty(error)) {
                if (this.control.errors[error]) {
                  this._errorMessage = this.formName + '.' + this.control.name + '.' + error;
                  this._requiredValue = this.control.errors[error].requiredValue;
                }
              }
            }
            this._classArray = [this._config.inputInvalidClass];
          }
        } else {
          this._classArray = [];
        }
      });
  }

}
