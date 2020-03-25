import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Observable, Observer, of} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {QuixAutocompleteAsyncService} from "../quix-autocomplete.service";
import {QuixStyleService} from "../../style/style.service";

@Component({
  selector: 'quix-autocomplete-obj-async',
  templateUrl: './autocomplete-obj-async.component.html',
  styleUrls: ['./autocomplete-obj-async.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteObjAsyncComponent),
    multi: true
  }]
})
export class AutocompleteObjAsyncComponent implements OnInit {
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
  @Input() restApi: boolean;
  @Input() baseUrl: string;
  @Input() apiUrl: string;
  @Input() apiParamName: string;
  @Input() startAfter: number;
  // tslint:disable-next-line:no-input-rename
  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: string;
  _searchValue: string;
  suggestions$: Observable<any>;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    if (!this._searchValue) {
      this.getList()
    } else if (!val) {
      this._searchValue = val
    }
    this.onChange(val);
    this.onTouched();
  }

  constructor(private style: QuixStyleService,
              private autocompleteService: QuixAutocompleteAsyncService) {
  }

  ngOnInit(): void {
    if (this.restApi) {
      this.suggestions$ = new Observable((observer: Observer<string>) => {
        observer.next(this._searchValue);
      }).pipe(
        switchMap((query: string) => {
          if (query) {
            return this.autocompleteService.getRestList(this.baseUrl, this.apiUrl, this._searchValue).pipe(
              map((data: any) => data || []),
            )
          }
          return of([]);
        })
      );
    } else {
      this.suggestions$ = new Observable((observer: Observer<string>) => {
        observer.next(this._searchValue);
      }).pipe(
        switchMap((query: string) => {
          if (query) {
            return this.autocompleteService.getList(this.baseUrl, this.apiUrl, this._searchValue, this.apiParamName).pipe(
              map((data: any) => data || []),
            )
          }
          return of([]);
        })
      );
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
      if (value.item) {
        this.value = value.item[this.returnValue]
      } else {
        this.value = value;
      }
    } else {
      this.value = value;
    }
  }

  getList() {
    if (this.restApi) {
      this.autocompleteService.getRestList(this.baseUrl, this.apiUrl, '').subscribe(
        (l: Array<any>) => {
          this.findObj(l)
        }
      )
    } else {
      this.autocompleteService.getList(this.baseUrl, this.apiUrl, '', this.apiParamName).subscribe(
        (l: Array<any>) => {
          this.findObj(l)
        }
      )
    }

  }

  findObj(l: Array<any>) {
    let o = l.find(
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
