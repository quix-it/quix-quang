import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
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
export class AutocompleteObjComponent implements OnInit, AfterViewInit, OnChanges  {
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() id: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() helpMessage: string;
  @Input() customClass: string;
  @Input() classValidation: string | null;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() ariaLabel: string;
  @Input() tabIndex: number;
  @Input() startAfter: number;
  @Input() returnValue: string;
  @Input() searchBy: string;
  @Input() dataList: Array<any> = [];
  // tslint:disable-next-line:no-input-rename
  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: string;
  _searchValue: string;
  @ViewChild('input') input: ElementRef<HTMLInputElement>

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    if (!this._searchValue) {
      this.findObj()
    } else if (!val) {
      this._searchValue = val
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
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.nativeElement.focus()
      }
    },0)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus && this.input) {
      this.input.nativeElement.focus()
    }
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
  checkValue() {
    if (this.value) {
      this.value = ''
    }
  }

  getClass() {
    return this.style.getClassArray(this.classValidation, this.customClass);
  }

}
