import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit, Optional,
  Renderer2, Self,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {NgControl} from "@angular/forms";
import {delay} from "rxjs/operators";
import {QuangConfig} from "../../quang-config.model";


@Component({
  selector: 'quix-autocomplete-strg',
  templateUrl: './autocomplete-strg.component.html',
  styleUrls: ['./autocomplete-strg.component.scss']
})
export class AutocompleteStrgComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() id: string;
  @Input() successMessage: boolean;
  @Input() errorMessage: boolean;
  @Input() helpMessage: boolean;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() ariaLabel: string;
  @Input() tabIndex: number;
  @Input() dataList: Array<string> = [];
  @Input() formName: string;
  @Input() startAfter: number;
  @Input('value')
  _value: string;
  _config: QuangConfig;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  _classArray: string[] = [];
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

  registerOnChange(fn) {
    this.onChange = fn;
  }

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
          }
        } else {
          this._classArray = [];
        }
      });
  }

}
