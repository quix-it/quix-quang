import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Optional,
  Renderer2,
  Self,
  ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { delay, filter } from "rxjs/operators";
import { TimepickerComponent, TimepickerConfig } from "ngx-bootstrap/timepicker";

export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    allowEmptyTime: true,
  });
}

/**
 * input time component decorator
 */
@Component({
  selector: "quang-input-time",
  templateUrl: "./input-time.component.html",
  styleUrls: ["./input-time.component.scss"],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }],
})
/**
 * input time component
 */
export class InputTimeComponent
  implements ControlValueAccessor, AfterViewInit, OnInit
{
  /**
   * Html id of input
   */
  @Input() id: string = "";
  /**
   * The label to display on the input field
   */
  @Input() label: string = "";
  /**
   * Defines if you want to display the help message for the user
   */
  @Input() helpMessage: boolean = false;
  /**
   * Defines if you want to display the error message for the user
   */
  @Input() errorMessage: boolean = false;
  /**
   * Defines if you want to display the success message for the user
   */
  @Input() successMessage: boolean = false;
  /**
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = "";
  /**
   * Defines whether to display the button that allows you to enter the hours in 24h or 12h format
   */
  @Input() showMeridianButton: boolean = false;
  /**
   * defines the minimum selectable date
   */
  @Input() minTime: Date | undefined = undefined;
  /**
   * defines the maximum selectable date
   */
  @Input() maxTime: Date | undefined = undefined;
  /**
   * defines whether to display the chevrons for time selection
   */
  @Input() showSelector: boolean = false;
  /**
   * defines whether to display the seconds input
   */
  @Input() showSecond: boolean = false;
  /**
   * the hour advance interval
   */
  @Input() hourStep: number = 0;
  /**
   * the minute advance interval
   */
  @Input() minuteStep: number = 0;
  /**
   * the second advance interval
   */
  @Input() secondStep: number = 0;

  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`;
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0;
  /**
   * Adds css classes to the component
   */
  @Input() customClass: string[] = [];
  /**
   * The placeholder of the hours input field
   */
  @Input() hoursPlaceholder: string = "hh";
  /**
   * The placeholder of the minutes input field
   */
  @Input() minutesPlaceholder: string = "mm";
  /**
   * The placeholder of the seconds input field
   */
  @Input() secondsPlaceholder: string = "ss";
  /**
   * define if inputs can be empty
   */
  @Input() allowEmptyTime: boolean = true;
  /**
   * The value of the input
   */
  _value: any;
  /**
   * the status of the success message
   */
  _successMessage: string = "";
  /**
   * the status of the error message
   */
  _errorMessage: string = "";
  /**
   * the status of the help message
   */
  _helpMessage: string = "";
  /**
   * Contains the value required by a validation when it fails
   */
  _requiredValue: any = "";
  /**
   * internal status disabled
   */
  _disabled: boolean = false;
  /**
   * The html input element
   */
  @ViewChild("input", { static: true }) input:
    | TimepickerComponent
    | undefined;

  /**
   * Standard definition to create a control value accessor
   */
  onTouched: any = () => {};

  /**
   * Standard definition to create a control value accessor
   */
  onChanged: any = () => {};

  /**
   * constructor
   * @param renderer html access
   * @param localeService locale utility
   * @param locale actual locale
   * @param control cva access
   */
  constructor(
    private readonly renderer: Renderer2,
    private readonly localeService: BsLocaleService,
    @Inject(LOCALE_ID) public locale: string,
    @Self() @Optional() public control: NgControl
  ) {
    this.control.valueAccessor = this;
  }

  /**
   * init locale
   * chek help message and init the key
   */
  ngOnInit(): void {
    if (this.locale) {
      this.localeService.use(this.locale);
    }
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control?.name}.help`;
    }
  }

  /**
   * After rendering the component, it checks if the input field must have focus
   * and activates the monitoring of the validation of the entered values
   */
  ngAfterViewInit(): void {
    this.observeValidate();
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  /**
   * event triggered when the time changes
   * @param date
   */
  onChangedHandler(date: any): void {
    this.onTouched();
    if (date) {
      this.onChanged(date);
    }
  }

  /**
   * When the form is initialized it saves the data in the component state
   * @param value
   */
  writeValue(value: any): void {
    if (value) {
      this._value = new Date(value);
    } else {
      this._value = value;
    }
    if (this.input) {
      this.renderer.setValue([this.input.hours, this.input.minutes], value);
    }
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  /**
   * When the input field changes,
   * the validation status is retrieved and the success message or error messages displayed.
   * If there is an error with a specific required value it is passed to the translation pipe
   * to allow for the creation of custom messages
   */
  observeValidate(): void {
    this.control?.statusChanges
      ?.pipe(
        delay(0),
        filter(() => !!this.control.dirty)
      )
      .subscribe(() => {
        if (this.control.valid && this.successMessage) {
          this._successMessage = `${this.formName}.${this.control?.name}.valid`;
        }
        if (this.control.invalid && this.errorMessage) {
          for (const error in this.control.errors) {
            this._requiredValue = this.control.errors[error].requiredValue;
            this._errorMessage = `${this.formName}.${this.control?.name}.${error}`;
          }
        }
      });
  }
}
