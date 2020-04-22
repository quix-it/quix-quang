import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {QuixStyleService} from "../../style/style.service";

@Component({
  selector: 'quix-autocomplete-strg',
  templateUrl: './autocomplete-strg.component.html',
  styleUrls: ['./autocomplete-strg.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteStrgComponent),
    multi: true
  }]
})
export class AutocompleteStrgComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() customClass: string;
  @Input() validator: string | null;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() ariaLabel: string;
  @Input() helpMsg: string;
  @Input() tabIndex: number;
  @Input() dataList: Array<string> = [];
  // tslint:disable-next-line:no-input-rename
  @Input('value')
    // tslint:disable-next-line:variable-name
  @Input() startAfter: number;
  _value: string;

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

  ngOnInit(): void {
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

  getClass() {
    return this.style.getClassArray(this.validator, this.customClass);
  }

}
