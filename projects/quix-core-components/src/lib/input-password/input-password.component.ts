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
import {QuixConfigModel} from "../quix-config.model";
import {delay} from "rxjs/operators";


@Component({
  selector: 'quix-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
  @Input() label: string;
  @Input() placeholder = '';
  @Input() id: string;
  @Input() successMessage: boolean;
  @Input() errorMessage: boolean;
  @Input() helpMessage: boolean;
  @Input() iconClassView: string[];
  @Input() iconClassHide: string[];
  @Input() buttonClass: string[];
  @Input() min: number;
  @Input() max: number;
  @Input() pattern: string;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() viewPassword: boolean;
  @Input() ariaLabel: string;
  @Input() tabIndex: number;
  @Input() formName: string;
  @Input('value')
  _value: string;
  _config: QuixConfigModel;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  _classArray: string[] = [];
  type = 'password';
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

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
      this._helpMessage = this.formName + '.' + this.control?.name + '.help';
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

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

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
    this.renderer.setProperty(this.input.nativeElement, 'disabled', isDisabled);
  }

  toggleType() {
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
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
                  if (error === 'minlength' || error === 'maxlength') {
                    this._requiredValue = this.control.errors[error].requiredLength;
                  } else {
                    this._requiredValue = this.control.errors[error].requiredValue;
                  }
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

