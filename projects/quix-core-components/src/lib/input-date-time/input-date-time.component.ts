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
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {BsDatepickerConfig, BsLocaleService} from "ngx-bootstrap/datepicker";
import {QuixConfigModel} from "../quix-config.model";
import {delay} from "rxjs/operators";
import moment, {Moment} from 'moment';

@Component({
  selector: 'quix-input-date-time',
  templateUrl: './input-date-time.component.html',
  styleUrls: ['./input-date-time.component.scss']
})
export class InputDateTimeComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() helpMessage: boolean;
  @Input() dateFormat: string;
  @Input() successMessage: boolean;
  @Input() errorMessage: boolean;
  @Input() locale: string;
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
  @Input() formName: string;
  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: any;
  config: Partial<BsDatepickerConfig>;
  margin: string;
  _config: QuixConfigModel;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  _classArray: string[] = [];
  disabled: boolean;
  @ViewChild('input') input: ElementRef<HTMLInputElement>

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
        this.margin = '.3rem';
      } else {
        this.margin = '2rem';
      }
    } else {
      this.margin = '0';
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
    this.disabled = this.input.nativeElement.disabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus && this.input) {
      this.input.nativeElement.focus();
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
        this.value = moment(value);
      } else {
        this.value = value;
      }
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled);
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
