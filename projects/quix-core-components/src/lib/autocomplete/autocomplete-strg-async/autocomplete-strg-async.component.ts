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
import {NgControl} from '@angular/forms';
import {Observable, Observer, of} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {QuixAutocompleteAsyncService} from '../quix-autocomplete.service';
import {QuangConfig} from "../../quang-config.model";


@Component({
  selector: 'quix-autocomplete-strg-async',
  templateUrl: './autocomplete-strg-async.component.html',
  styleUrls: ['./autocomplete-strg-async.component.scss']
})
export class AutocompleteStrgAsyncComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() successMessage: boolean;
  @Input() errorMessage: boolean;
  @Input() helpMessage: boolean;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() ariaLabel: string;
  @Input() tabIndex: number;
  @Input() restApi: boolean;
  @Input() baseUrl: string;
  @Input() apiUrl: string;
  @Input() apiParamName: string;
  @Input() formName: string;
  @Input() startAfter: number;
  @Input() optionLimit: number
  @Input('value')
  _value: string;
  _config: QuangConfig;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  _classArray: string[] = [];
  suggestions$: Observable<any>;
  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement>;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor(private renderer: Renderer2,
              private autocompleteService: QuixAutocompleteAsyncService,
              @Self() @Optional() public control: NgControl,
              @Optional() config: QuangConfig) {
    this.control && (this.control.valueAccessor = this);
    this._config = config;
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
            );
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
            );
          }
          return of([]);
        }),
        map(r => r.filter(s => s.toLowerCase().includes(this.value.toLowerCase())))
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

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled);
  }

  observeValidate() {
    this.control?.statusChanges
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
          } else {
            this._classArray = [];
          }
        } else {
          this._classArray = [];
        }
      });
  }
}
