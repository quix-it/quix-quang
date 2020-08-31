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
  selector: 'quix-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() helpMessage: boolean;
  @Input() autofocus: boolean;
  @Input() errorMessage: boolean;
  @Input() successMessage: boolean;
  @Input() returnISODate: boolean = false;
  @Input() showWeekNumbers: boolean;
  @Input() dateFormat: string;
  @Input() locale: string;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() disabledDaysOfTheWeek: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>;
  @Input() disabledDates: Array<Date>;
  @Input() minView: 'year' | 'month' | 'day';
  @Input() buttonIcon: string | Array<string>;
  @Input() useMoment: boolean;
  @Input() ariaLabel: string;
  @Input() buttonClass: string[];
  @Input() tabIndex: number;
  @Input() formName: string;
  @Input('value')
  _value: any;
  config: Partial<BsDatepickerConfig>;
  _config: QuixConfigModel;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  _classArray: string[] = [];
  disabled: boolean;
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = new Date(val);
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
    if (this.helpMessage) {
      this._helpMessage = this.formName + '.' + this.control?.name + '.help'
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
    if (changes.locale?.currentValue) {
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
    if (value) {
      if (this.useMoment) {
        this.value = moment(value);
      } else {
        if (this.returnISODate) {
          this.value = value;
        } else {
          this.value = moment(value).format('YYYY-MM-DD');
        }
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
            this._successMessage = this.formName + '.' + this.control.name + '.valid'
            this._classArray = [this._config.inputValidClass]
          } else if (this.control.invalid && this.errorMessage) {
            for (let error in this.control.errors) {
              if (this.control.errors[error]) {
                this._errorMessage = this.formName + '.' + this.control.name + '.' + error
                if (error === 'dateBetween') {
                  if (this.dateFormat) {
                    this._requiredValue = moment(this.control.errors['dateBetween']['requiredValue'][0]).format(this.dateFormat)
                    this._requiredValue += ' - '
                    this._requiredValue += moment(this.control.errors['dateBetween']['requiredValue'][1]).format(this.dateFormat)
                  } else {
                    this._requiredValue = this.control.errors['dateBetween']['requiredValue'][0]
                    this._requiredValue += ' - '
                    this._requiredValue += this.control.errors['dateBetween']['requiredValue'][1]
                  }
                } else {
                  if (this.dateFormat) {
                    this._requiredValue = moment(this.control.errors[error]['requiredValue']).format(this.dateFormat)
                  } else {
                    this._requiredValue = this.control.errors[error]['requiredValue']
                  }
                }
              }
            }
            this._classArray = [this._config.inputInvalidClass]
          }
        } else {
          this._classArray = []
        }
      })
  }

}
