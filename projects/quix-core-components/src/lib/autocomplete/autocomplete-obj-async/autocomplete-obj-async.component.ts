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
import {Observable, Observer, of} from "rxjs";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
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
export class AutocompleteObjAsyncComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() id: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() customClass: string;
  @Input() helpMessage: string;
  @Input() classValidation: string | null;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() ariaLabel: string;
  @Input() searchBy: string;
  @Input() returnValue: string;
  @Input() tabIndex: number;
  @Input() restApi: boolean;
  @Input() required: boolean;
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
  @ViewChild('input') input: ElementRef<HTMLInputElement>

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    if (!this._searchValue && val) {
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
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string) => {
          if (this._searchValue) {
            return this.autocompleteService.getRestList(this.baseUrl, this.apiUrl, this._searchValue).pipe(
              map((data: any) => data || []),
            )
          }
          return of([]);
        }),
        map(r => r.filter(s => s[this.searchBy].toLowerCase().includes(this._searchValue.toLowerCase())))
      );
    } else {
      this.suggestions$ = new Observable((observer: Observer<string>) => {
        observer.next(this._searchValue);
      }).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string) => {
          if (this._searchValue) {
            return this.autocompleteService.getList(this.baseUrl, this.apiUrl, this._searchValue, this.apiParamName).pipe(
              map((data: any) => data || []),
            )
          }
          return of([]);
        }),
        map(r => r.filter(s => s[this.searchBy].toLowerCase().includes(this._searchValue.toLowerCase())))
      );
    }
  }

  checkValue() {
    if (this.value) {
      this.value = ''
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.nativeElement.focus()
      }
    }, 0)
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
    return this.style.getClassArray(this.classValidation, this.customClass);
  }

}
