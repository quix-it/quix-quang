import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {QuixStyleService} from "../style/style.service";



@Component({
  selector: 'quix-select-obj',
  templateUrl: './select-obj.component.html',
  styleUrls: ['./select-obj.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectObjComponent),
      multi: true
    }
  ]
})
export class SelectObjComponent implements ControlValueAccessor, AfterViewInit {
  @Input() ariaLabel: string;
  @Input() label: string;
  @Input() id: string;
  @Input() helpMsg: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() helpMessage: string;
  @Input() customClass: string;
  @Input() classValidation: string | null;
  @Input() autofocus: boolean;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() list: Array<{}>;
  @Input() labelValue: string;
  @Input() returnValue: string;
  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: string;
  @ViewChild('input') input: ElementRef<HTMLSelectElement>

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
    },0)
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
        this.value = value.target;
      } else {
        this.value = value
      }
    } else {
      this.value = value;
    }
  }

  getClass() {
    return this.style.getClassArray(this.classValidation, this.customClass);
  }


}
