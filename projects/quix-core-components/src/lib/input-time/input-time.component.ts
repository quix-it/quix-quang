import {AfterViewInit, Component, ElementRef, Input, OnInit, Optional, Renderer2, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {BsLocaleService} from "ngx-bootstrap/datepicker";
import {QuixConfigModel} from "../quix-config.model";
import {delay} from "rxjs/operators";
import moment, {Moment} from 'moment';

@Component({
  selector: 'quix-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss']
})
export class InputTimeComponent implements ControlValueAccessor, AfterViewInit, OnInit {
  @Input() id: string;
  @Input() label: string;
  @Input() helpMessage: boolean;
  @Input() autofocus: boolean;
  @Input() errorMessage: boolean;
  @Input() successMessage: boolean;
  @Input() formName: string;
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
  @Input() disabled: boolean;
  @Input('value')
  _value: any;
  _config: QuixConfigModel;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  _classArray: string[] = [];
  @ViewChild('input') input: ElementRef;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor(private renderer: Renderer2,
              private localeService: BsLocaleService,
              @Self() @Optional() public control: NgControl,
              @Optional() config: QuixConfigModel) {
    this.control && (this.control.valueAccessor = this);
    this._config = config;
  }

  ngOnInit(): void {
    if (this.locale) {
      this.localeService.use(this.locale);
    }
    if (this.helpMessage) {
      this._helpMessage = this.formName + '.' + this.control.name + '.help';
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.nativeElement.focus();
      }
    }, 0);
    this.observeValidate();
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
        this.value = moment(value);
      } else {
        this.value = value;
      }
    }
  }


  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
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
