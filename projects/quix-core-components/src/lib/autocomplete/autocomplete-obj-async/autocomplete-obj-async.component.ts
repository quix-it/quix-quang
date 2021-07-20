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
import {QuangConfig} from "../../quang-config.model";


@Component({
  selector: 'quix-autocomplete-obj-async',
  templateUrl: './autocomplete-obj-async.component.html',
  styleUrls: ['./autocomplete-obj-async.component.scss']
})
export class AutocompleteObjAsyncComponent implements OnInit, AfterViewInit, OnChanges {
    /**
   * The label to display on the input field
   */
  @Input() label: string = '';
    /**
   * The placeholder of the input field
   */
  @Input() placeholder: string = '';
    /**
   * Html id of input
   */
  @Input() id: string = '';
    /**
   * Defines if you want to display the success message for the user
   */
  @Input() successMessage: boolean = false;
    /**
   * Defines if you want to display the error message for the user
   */
  @Input() errorMessage: boolean = false;
    /**
   * Defines if you want to display the help message for the user
   */
  @Input() helpMessage: boolean = false;
    /**
   * Indicates whether, when the page is opened,
   * this input field should be displayed in a focused state or not
   */
  @Input() autofocus: boolean = false;
    /**
   * Defines whether the input field is in a read-only state
   */
  @Input() readonly: boolean = false;
    /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`;
  @Input() searchBy: string;
  @Input() returnValue: string;
    /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0;
  @Input() restApi: boolean;
  @Input() baseUrl: string;
  @Input() apiUrl: string;
  @Input() apiParamName: string;
  @Input() startAfter: number;
    /**
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = '';
  @Input() optionLimit: number
  @Input('value')
  /**
   * The value of the input
   */
  /**
   * The value of the input
   */
  _value: string;
  _config: QuangConfig;
    /**
   * the status of the success message
   */
  _successMessage: string = '';
    /**
   * the status of the error message
   */
  _errorMessage: string = '';
    /**
   * the status of the help message
   */
  _helpMessage: string = '';
    /**
   * Contains the value required by a validation when it fails
   */
  _requiredValue: any = '';
  _classArray: string[] = [];
  _searchValue: string;
  suggestions$: Observable<any>;
    /**
   * The html input element
   */
  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement>;

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
              @Optional() config: QuangConfig) {
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
