import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, OnChanges, OnInit,
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
  selector: 'quix-select-obj',
  templateUrl: './select-obj.component.html',
  styleUrls: ['./select-obj.component.scss']
})
export class SelectObjComponent implements ControlValueAccessor, AfterViewInit, OnInit, OnChanges {
    /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`;
    /**
   * The label to display on the input field
   */
  @Input() label: string = '';
    /**
   * Html id of input
   */
  @Input() id: string = '';
    /**
   * Defines if you want to display the success message for the user
   */
  @Input() successMessage: boolean = false;
    /**
   * Defines if you want to display the error message for the user
   */
  @Input() errorMessage: boolean = false;
    /**
   * Defines if you want to display the help message for the user
   */
  @Input() helpMessage: boolean = false;
    /**
   * Indicates whether, when the page is opened,
   * this input field should be displayed in a focused state or not
   */
  @Input() autofocus: boolean = false;
  @Input() list: Array<{}>;
  @Input() labelValue: string;
  @Input() returnValue: string;
    /**
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = '';
  @Input('value')
  /**
   * The value of the input
   */
  _value: string;
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
    /**
   * The html input element
   */
  @ViewChild('input', {static: true}) input: ElementRef<HTMLSelectElement>;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor(
              private renderer: Renderer2,
              @Self() @Optional() public control: NgControl,
              @Optional() config: QuangConfig) {
    this.control && (this.control.valueAccessor = this);
    this._config = config;
  }

  ngOnInit() {
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
      if (value.target) {
        this.value = value.target.value;
      } else {
        this.value = value;
      }
    } else {
      this.value = value;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled);
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
          } else {
            this._classArray = [];
          }
        } else {
          this._classArray = [];
        }
      });
  }
}
