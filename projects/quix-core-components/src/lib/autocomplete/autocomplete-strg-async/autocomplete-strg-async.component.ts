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
  selector: 'quix-autocomplete-strg-async',
  templateUrl: './autocomplete-strg-async.component.html',
  styleUrls: ['./autocomplete-strg-async.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteStrgAsyncComponent),
    multi: true
  }]
})
export class AutocompleteStrgAsyncComponent implements OnInit, AfterViewInit, OnChanges  {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() customClass: string;
  @Input() classValidation: string | null;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() ariaLabel: string;
  @Input() helpMessage: string;
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
  suggestions$: Observable<any>;
  @ViewChild('input') input: ElementRef<HTMLInputElement>

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor(private style: QuixStyleService,
              private autocompleteService: QuixAutocompleteAsyncService) {
  }

  ngOnInit(): void {
    if (this.restApi) {
      this.suggestions$ = new Observable((observer: Observer<string>) => {
        observer.next(this.value);
      }).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string) => {
          if (this.value) {
            return this.autocompleteService.getRestList(this.baseUrl, this.apiUrl, this.value).pipe(
              map((data: any) => data || []),
            )
          }
          return of([]);
        }),
        map(r => r.filter(s => s.toLowerCase().includes(this.value.toLowerCase())))
      );
    } else {
      this.suggestions$ = new Observable((observer: Observer<string>) => {
        observer.next(this.value);
      }).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string) => {
          if (this.value) {
            return this.autocompleteService.getList(this.baseUrl, this.apiUrl, this.value, this.apiParamName).pipe(
              map((data: any) => data || []),
            )
          }
          return of([]);
        }),
        map(r => r.filter(s => s.toLowerCase().includes(this.value.toLowerCase())))
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
