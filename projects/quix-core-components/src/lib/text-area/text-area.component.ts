import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {QuixStyleService} from "../style/style.service";


@Component({
  selector: 'quix-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent implements ControlValueAccessor, AfterViewInit {
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() id: string;
  @Input() helpMessage: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() customClass: string;
  @Input() classValidation: string | null;
  @Input() min: number;
  @Input() max: number = 255;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() autoResize: boolean;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() rows: number;
  @Input() cols: number;
  @Input() tabIndex: number;
  @Input() ariaLabel: string;
  @Input() resizeMode: 'none' | 'auto' | 'vertical'| 'horizzontal' = 'auto';

  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: string;
  @ViewChild('input') input: ElementRef<HTMLTextAreaElement>
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor(private style: QuixStyleService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.nativeElement.focus()
      }
    }, 0)
    if(this.autoResize){
      this.autosize.resizeToFitContent(true);
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

  getClass() {
    return this.style.getClassArray(this.classValidation, this.customClass);
  }
}
