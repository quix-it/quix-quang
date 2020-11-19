import {AfterViewInit, Component, ElementRef, Input, OnInit, Optional, Renderer2, Self, ViewChild} from '@angular/core';
import {NgControl} from '@angular/forms';

import {delay} from 'rxjs/operators';
import {QuangConfig} from "../quang-config.model";

@Component({
  selector: 'quix-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, AfterViewInit, OnInit {
  @Input() label: string;
  @Input() placeholder = '';
  @Input() id: string;
  @Input() successMessage: boolean;
  @Input() errorMessage: boolean;
  @Input() helpMessage: boolean;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() tabIndex: number;
  @Input() ariaLabel: string;
  @Input() toolbar: any;
  @Input() formName: string;

  @ViewChild('editor') editor;
  @Input('value')
  _value: string;
  _config: QuangConfig;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  _classArray: string[] = [];

  modules: { [key: string]: string };
  private disabled = false; // used to store initial value before ViewInit

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              @Self() @Optional() public control: NgControl,
              @Optional() config: QuangConfig) {
    this.control && (this.control.valueAccessor = this);
    this._config = config;
  }

  ngOnInit() {
    this.modules = {
       toolbar: this.toolbar
     };
    if (this.helpMessage) {
      this._helpMessage = this.formName + '.' + this.control.name + '.help';
    }


  }

  ngAfterViewInit(): void {
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

  }

  // setDisabledState(isDisabled: boolean = this.disabled): void {
  //   // store initial value to set appropriate disabled status after ViewInit
  //   this.disabled = isDisabled;
  //   if (this.quillEditor) {
  //     if (isDisabled) {
  //       this.quillEditor.disable();
  //       this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'disabled');
  //     } else {
  //       this.quillEditor.enable();
  //       this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
  //     }
  //   }
  // }

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
