import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {QuixStyleService} from '../style/style.service';

@Component({
  selector: 'quix-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements ControlValueAccessor, OnInit {
  @Input() list: Array<any>;
  @Input() id: string;
  @Input() label: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() noResultMessage: string;
  @Input() placeHolder: string;
  @Input() validator: string;
  @Input() customClass: string;
  @Input() searchBy: string;
  @Input() returnValue: string;
  @Input() saveField: string;
  @Input() listElement: number;
  @Input() minLength: number;
  @Input() scrollAfter: number;
  @Input() ariaLabel: number;
  // tslint:disable-next-line:no-input-rename
  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: string;
  select: string;
  noResult = false;

  get value() {
    return this._value;
  }

  set value(val) {
    if (val !== undefined) {
      if (val === '') {
        this._value = '';
      } else {
        const tmp = this.list.reduce((a, o) => o[this.returnValue] === val ? a.concat(o) : a, [])[0];
        this._value = tmp[this.returnValue];
        this.select = tmp[this.searchBy];
      }
    }
    this.onChange(val);
    this.onTouched();
  }

  constructor(private style: QuixStyleService) { }

  onChange(val) { }

  onTouched() { }

  ngOnInit(): void {
    this.value = this._value;
  }

  noResultEvent(event): void {
    this.noResult = event;
    const tmp = {
      item: {}
    };
    tmp.item[this.returnValue] = '';
    tmp.item[this.searchBy] = this.select;
    this.writeValue(tmp);
  }

  getClass() {
    return this.style.getClassArray(this.validator, this.customClass);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value.item) {
      this.value = value.item[this.returnValue];
      this.select = value.item[this.searchBy];
    }
    if (value) {
      this.value = value;
      this.select = this.list.reduce((a, o) => o[this.returnValue] === value ? a.concat(o) : a, [])[0][this.searchBy];
    } else {
      this.select = '';
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
