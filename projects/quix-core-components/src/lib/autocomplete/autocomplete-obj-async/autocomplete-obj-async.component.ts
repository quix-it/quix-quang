import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {NgControl} from "@angular/forms";
import {Observable, Observer, of} from "rxjs";
import {debounceTime, delay, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {QuixAutocompleteAsyncService} from "../quix-autocomplete.service";
import {QuixConfigModel} from "../../quix-config.model";

@Component({
  selector: 'quix-autocomplete-obj-async',
  templateUrl: './autocomplete-obj-async.component.html',
  styleUrls: ['./autocomplete-obj-async.component.scss']
})
export class AutocompleteObjAsyncComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() id: string;
  @Input() successMessage: boolean;
  @Input() errorMessage: boolean;
  @Input() helpMessage: boolean;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() ariaLabel: string;
  @Input() searchBy: string;
  @Input() returnValue: string;
  @Input() tabIndex: number;
  @Input() restApi: boolean;
  @Input() baseUrl: string;
  @Input() apiUrl: string;
  @Input() apiParamName: string;
  @Input() startAfter: number;
  @Input() formName: string;
  @Input('value')
  _value: string;
  _config: QuixConfigModel;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  _classArray: string[] = [];
  _searchValue: string;
  suggestions$: Observable<any>;
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    if (!this._searchValue && val) {
      this.getList();
    } else if (!val) {
      this._searchValue = val;
    }
    this.onChange(val);
    this.onTouched();
  }

  constructor(private renderer: Renderer2,
              private autocompleteService: QuixAutocompleteAsyncService,
              @Self() @Optional() public control: NgControl,
              @Optional() config: QuixConfigModel) {
    this.control && (this.control.valueAccessor = this);
    this._config = config;
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

  checkValue() {
    if (this.value) {
      this.value = '';
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
        this.value = value.item[this.returnValue];
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
          this.findObj(l);
        }
      );
    } else {
      this.autocompleteService.getList(this.baseUrl, this.apiUrl, '', this.apiParamName).subscribe(
        (l: Array<any>) => {
          this.findObj(l);
        }
      );
    }

  }

  findObj(l: Array<any>) {
    const o = l.find(
      (e) => {
        return e[this.returnValue] === this.value;
      }
    );
    if (o) {
      this._searchValue = o[this.searchBy];
    }
  }

  clearObj() {
    if (!this._searchValue) {
      this.value = '';
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled);
  }

  observeValidate() {
    this.control?.valueChanges
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
