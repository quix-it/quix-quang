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

import {delay} from "rxjs/operators";
import {QuangConfig} from "../quang-config.model";

@Component({
  selector: 'quix-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
  @Input() ariaLabel: string;
  @Input() label: string;
  @Input() ariaLAbel: string;
  @Input() autofocus: boolean;
  @Input() id: string;
  @Input() disabled: boolean;
  @Input() successMessage: boolean;
  @Input() errorMessage: boolean;
  @Input() helpMessage: boolean;
  @Input() formName: string;
  @Input() tabIndex: number;
  @Input('value')
  _value: string;
  _config: QuangConfig;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  _classArray: string[] = [];
  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement>;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor(private renderer: Renderer2,
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
    this.disabled = isDisabled;
    // this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled);
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
                  if (error === 'minlength' || error === 'maxlength') {
                    this._requiredValue = this.control.errors[error].requiredLength;
                  } else {
                    this._requiredValue = this.control.errors[error].requiredValue;
                  }
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


// import {Component, forwardRef, Input, OnInit} from '@angular/core';
// import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
// import {QuixStyleService} from "../quix-style/quix-style.service";
//
// @Component({
//   selector: 'quix-toggle',
//   templateUrl: './toggle.component.html',
//   styleUrls: ['./toggle.component.scss'],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => ToggleComponent),
//       multi: true
//     }
//   ]
// })
// export class ToggleComponent implements ControlValueAccessor {
//   @Input() ariaLabel: string;
//   @Input() label: string;
//   @Input() ariaLAbel: string;
//   @Input() id: string;
//   @Input() successMessage: string;
//   @Input() errorMessage: string;
//   @Input() validator: string | null;
//   @Input() disabled: boolean;
//   @Input() tabIndex: number;
//   @Input() customClass: string;
//   // tslint:disable-next-line:variable-name
//   _value: number;
//   get value() {
//     return this._value;
//   }
//
//   set value(val) {
//     this._value = val;
//     this.onChange(val);
//     this.onTouched();
//   }
//
//   constructor(private style: QuixStyleService) {
//   }
//
//   ngOnInit() {
//   }
//
//   onChange(val) {
//   }
//
//   onTouched() {
//   }
//
//   // We implement this method to keep a reference to the onChange
//   // callback function passed by the forms API
//   registerOnChange(fn) {
//     this.onChange = fn;
//   }
//
//   // We implement this method to keep a reference to the onTouched
//   // callback function passed by the forms API
//   registerOnTouched(fn) {
//     this.onTouched = fn;
//   }
//
//   // This is a basic setter that the forms API is going to use
//   writeValue(value) {
//     if (value.target) {
//       this.value = value.target.value;
//     } else {
//       this.value = value;
//     }
//   }
//
//   getClass() {
//     return this.style.getClassArray(this.validator, this.customClass);
//   }
// }
