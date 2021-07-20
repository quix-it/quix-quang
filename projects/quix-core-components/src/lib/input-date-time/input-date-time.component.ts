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
import {delay} from "rxjs/operators";
import moment, {Moment} from 'moment';
import {QuangConfig} from "../quang-config.model";

@Component({
  selector: 'quix-input-date-time',
  templateUrl: './input-date-time.component.html',
  styleUrls: ['./input-date-time.component.scss']
})
export class InputDateTimeComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
    /**
   * Html id of input
   */
  @Input() id: string = '';
    /**
   * The label to display on the input field
   */
  @Input() label: string = '';
    /**
   * The placeholder of the input field
   */
  @Input() placeholder: string = '';
    /**
   * Defines if you want to display the help message for the user
   */
  @Input() helpMessage: boolean = false;
  @Input() dateFormat: string;
    /**
   * Defines if you want to display the success message for the user
   */
  @Input() successMessage: boolean = false;
    /**
   * Defines if you want to display the error message for the user
   */
  @Input() errorMessage: boolean = false;
  @Input() locale: string;
  @Input() showSecond: boolean;
  @Input() showWeekNumbers: boolean;
  @Input() showSelector: boolean;
  @Input() showMeridianButton: boolean;
  @Input() minDate: Date;
  @Input() maxDate: Date;
    /**
   * Indicates whether, when the page is opened,
   * this input field should be displayed in a focused state or not
   */
  @Input() autofocus: boolean = false;
  @Input() disabledDates: Array<Date>;
  @Input() iconClass: Array<string>;
  @Input() hourStep: number;
  @Input() minuteStep: number;
  @Input() secondStep: number;
  @Input() useMoment: number;
  @Input() disabledDaysOfTheWeek: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>;
    /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`;
  @Input() buttonClass: string[];
    /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0;
    /**
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = '';
  @Input('value')
    // tslint:disable-next-line:variable-name
  /**
   * The value of the input
   */
  _value: any;
  config: Partial<BsDatepickerConfig>;
  margin: string;
  _config: QuangConfig;
    /**
   * the status of the success message
   */
  _successMessage: string = '';
    /**
   * the status of the error message
   */
  _errorMessage: string = '';
    /**
   * the status of the help message
   */
  _helpMessage: string = '';
    /**
   * Contains the value required by a validation when it fails
   */
  _requiredValue: any = '';
  _classArray: string[] = [];
  disabled: boolean;
    /**
   * The html input element
   */
  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement>

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
              @Optional() config: QuangConfig) {
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
    this.control?.statusChanges
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
          } else {
            this._classArray = [];
          }
        } else {
          this._classArray = [];
        }
      });
  }

}
