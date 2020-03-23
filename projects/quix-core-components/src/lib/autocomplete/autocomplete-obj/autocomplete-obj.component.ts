import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {QuixStyleService} from "../../style/style.service";

@Component({
  selector: 'quix-autocomplete-obj',
  templateUrl: './autocomplete-obj.component.html',
  styleUrls: ['./autocomplete-obj.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteObjComponent),
    multi: true
  }]
})
export class AutocompleteObjComponent implements OnInit {
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
  @Input() searchBy: string;
  @Input() returnValue: string;
  @Input() tabIndex: number;
  @Input() startAfter: number;
  @Input() dataList: Array<string> = [];
  // tslint:disable-next-line:no-input-rename
  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: string;
  _searchValue: string;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    if (!this._searchValue) {
      this.findObj()
    }
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
      if (value.item) {
        this.value = value.item[this.returnValue]
      } else {
        this.value = value;
      }
    } else {
      this.value = value;
    }
  }

  findObj() {
    const o = this.dataList.find(
      (e) => {
        return e[this.returnValue] === this.value
      }
    );
    if (o) {
      this._searchValue = o[this.searchBy]
    }
  }

  clearObj() {
    if (!this._searchValue) {
      this.value = ''
    }
  }

  getClass() {
    return this.style.getClassArray(this.validator, this.customClass);
  }

}
