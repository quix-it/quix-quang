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
} from '@angular/core'
import { NgControl } from '@angular/forms'
import { Observable, Observer, of } from 'rxjs'
import { debounceTime, delay, distinctUntilChanged, map, switchMap } from 'rxjs/operators'
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead'
import { QuixAutocompleteAsyncService } from '../autocomplete-service/quix-autocomplete-async.service'

@Component({
  selector: 'quix-autocomplete-obj-async',
  templateUrl: './autocomplete-obj-async.component.html',
  styles: ['']
})
export class AutocompleteObjAsyncComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() label: string
  @Input() placeholder: string = ''
  @Input() id: string
  @Input() successMessage: boolean
  @Input() errorMessage: boolean
  @Input() helpMessage: boolean
  @Input() autofocus: boolean
  @Input() readonly: boolean
  @Input() ariaLabel: string
  @Input() searchBy: string
  @Input() returnValue: string
  @Input() tabIndex: number
  @Input() restApi: boolean
  @Input() baseUrl: string
  @Input() apiUrl: string
  @Input() apiParamName: string
  @Input() startAfter: number
  @Input() formName: string
  @Input() optionLimit: number
  @Input() customClass: string[] = []

  _value: string | number
  _searchValue: string
  _successMessage: string
  _errorMessage: string
  _helpMessage: string
  _requiredValue: any
  suggestions$: Observable<any>
  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>
  onTouched: any = () => {
  }
  onChanged: any = () => {
  }

  constructor (
    private renderer: Renderer2,
    private autocompleteService: QuixAutocompleteAsyncService,
    @Self() @Optional() public control: NgControl,
  ) {
    this.control && (this.control.valueAccessor = this)
  }

  ngOnInit (): void {
    this.suggestions$ = new Observable((observer: Observer<string>) => {
      observer.next(this._searchValue)
    }).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (this._searchValue) {
          if (this.restApi) {
            return this.autocompleteService.getRestList(this.baseUrl, this.apiUrl, this._searchValue).pipe(
              map((data: any) => data || []),
            )
          }
          return this.autocompleteService.getList(this.baseUrl, this.apiUrl, this._searchValue, this.apiParamName).pipe(
            map((data: any) => data || []),
          )
        }
        return of([])
      }),
      map(r => r.filter(s => s[this.searchBy].toLowerCase().includes(this._searchValue.toLowerCase())))
    )
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control.name}.help`
    }
  }

  ngAfterViewInit (): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.nativeElement.focus()
      }
    }, 0)
    this.observeValidate()
  }

  // We implement this method to keep a reference to the onChange
  // callback function passed by the forms API
  registerOnChange (fn: any) {
    this.onChanged = fn
  }

  // We implement this method to keep a reference to the onTouched
  // callback function passed by the forms API
  registerOnTouched (fn: any) {
    this.onTouched = fn
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.autofocus && this.input) {
      this.input.nativeElement.focus()
    }
  }

  onChangedHandler (e: Event) {
    this._searchValue = (e.target as HTMLInputElement).value
    this.onTouched()
    if (!this._searchValue) {
      this.onChanged('')
    }
  }

  onSelectHandler (e: TypeaheadMatch) {
    this._value = e.item[this.returnValue]
    this.onTouched()
    this.onChanged(this._value)
  }

  writeValue (value) {
    this._value = value
    if (this.restApi) {
      this.autocompleteService.getRestList(this.baseUrl, this.apiUrl, '').subscribe(
        (l: Array<any>) => this.findObj(l)
      )
    } else {
      this.autocompleteService.getList(this.baseUrl, this.apiUrl, '', this.apiParamName).subscribe(
        (l: Array<any>) => this.findObj(l)
      )
    }
  }

  findObj (l: any[]) {
    const o = l.find(
      e => e[this.returnValue] === this._value)
    if (o) {
      this._searchValue = o[this.searchBy]
    }
  }

  setDisabledState (isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled)
  }

  observeValidate () {
    this.control?.statusChanges.pipe(
      delay(0)
    ).subscribe(() => {
      if (this.control.dirty) {
        if (this.control.valid && this.successMessage) {
          this._successMessage = `${this.formName}.${this.control.name}.valid`
        }
        if (this.control.invalid && this.errorMessage) {
          for (const error in this.control.errors) {
            if (this.control.errors.hasOwnProperty(error)) {
              if (this.control.errors[error]) {
                this._errorMessage = `${this.formName}.${this.control.name}.${error}`
                this._requiredValue = this.control.errors[error].requiredValue
              }
            }
          }
        }
      }
    })
  }
}
