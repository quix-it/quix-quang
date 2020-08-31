import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  QueryList,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {QuixConfigModel} from "../quix-config.model";
import {delay} from "rxjs/operators";

@Component({
  selector: 'quix-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss']
})
export class InputRadioComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
  @Input() groupName: string;
  @Input() id: string;
  @Input() inline: boolean;
  @Input() radioList: Array<any>;
  @Input() autofocus: string;
  @Input() ariaLabel: string;
  @Input() tabIndex: number;
  @Input() successMessage: boolean;
  @Input() helpMessage: boolean;
  @Input() errorMessage: boolean;
  @Input() labelValue: string;
  @Input() formName: string;
  @Input() returnValue: string;
  @Input('value')
  _value: string;
  _config: QuixConfigModel;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  _classArray: string[] = [];
  @ViewChildren('input') input: QueryList<ElementRef<HTMLInputElement>>;


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
              @Optional() config: QuixConfigModel) {
    this.control && (this.control.valueAccessor = this);
    this._config = config;
  }

  ngOnInit() {
    if (this.helpMessage) {
      this._helpMessage = this.formName + '.' + this.control.name + '.help';
    }
    if (this.inline) {
      this._classArray.push('custom-control-inline');
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.forEach((item) => {
          item.nativeElement.focus();
        });
      }
    }, 0);
    this.observeValidate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus && this.input) {
      this.input.forEach((item) => {
        item.nativeElement.focus();
      });
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
    this.input?.forEach((item) => {
      this.renderer.setProperty(item.nativeElement, 'disabled', isDisabled);
    });
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
            this._classArray.push(this._config.inputValidClass);
          } else if (this.control.invalid && this.errorMessage) {
            for (const error in this.control.errors) {
              if (this.control.errors.hasOwnProperty(error)) {
                if (this.control.errors[error]) {
                  this._errorMessage = this.formName + '.' + this.control.name + '.' + error;
                  this._requiredValue = this.control.errors[error].requiredValue;
                }
              }
            }
            this._classArray.push(this._config.inputInvalidClass);
          } else {
            this._classArray.pop();
          }
        } else {
          this._classArray.pop();
        }
      });
  }
}


// import {Component, forwardRef, Input, OnInit} from '@angular/core';
// import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
// import {QuixStyleService} from "../quix-style/quix-style.service";
//
// @Component({
//   selector: 'quix-input-radio',
//   templateUrl: './input-radio.component.html',
//   styleUrls: ['./input-radio.component.scss'],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => InputRadioComponent),
//       multi: true
//     }
//   ]
// })
// export class InputRadioComponent implements ControlValueAccessor {
//   @Input() groupName: string;
//   @Input() id: string;
//   @Input() customClass: Array<string>;
//   @Input() disabled: boolean;
//   @Input() inline: boolean;
//   @Input() required: boolean;
//   @Input() radioList: Array<any>;
//   @Input() ariaLabel: string;
//   @Input() tabIndex: number;
//   @Input() successMessage: string;
//   @Input() helpMessage: string;
//   @Input() errorMessage: string;
//   @Input() labelValue: string;
//   @Input() returnValue: string;
//   @Input() classValidation: string | null;
//   @Input('value')
//     // tslint:disable-next-line:variable-name
//   _value: string;
//
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
//     if (value) {
//       if (value.target) {
//         this.value = value.target.value;
//       } else {
//         this.value = value
//       }
//     } else {
//       this.value = value;
//     }
//   }
//
//   getClass() {
//     var arrayClass = this.style.getClassArray(this.classValidation, this.customClass);
//     if (this.inline) {
//       arrayClass.push('custom-control-inline')
//     }
//     return arrayClass
//   }
// }
//
//
