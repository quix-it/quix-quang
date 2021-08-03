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
  selector: 'quix-autocomplete-strg-async',
  templateUrl: './autocomplete-strg-async.component.html',
  styles: ['']
})
/**
 * autocomplete string async component
 */
export class AutocompleteStrgAsyncComponent implements OnInit, AfterViewInit, OnChanges {
  /**
   * The label to display on the input field
   */
  @Input() label: string = ''
  /**
   * The placeholder of the input field
   */
  @Input() placeholder: string = ''
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * Defines if you want to display the success message for the user
   */
  @Input() successMessage: boolean = false
  /**
   * Defines if you want to display the error message for the user
   */
  @Input() errorMessage: boolean = false
  /**
   * Defines if you want to display the help message for the user
   */
  @Input() helpMessage: boolean = false
  /**
   * Indicates whether, when the page is opened,
   * this input field should be displayed in a focused state or not
   */
  @Input() autofocus: boolean = false
  /**
   * Defines whether the input field is in a read-only state
   */
  @Input() readonly: boolean = false
  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * Indicates if the call that will perform the service is in rest formats,
   * then the search parameter is passed in the url as / param
   */
  @Input() restApi: boolean = false
  /**
   * The base url of the application is used to create the url for the ajax call
   */
  @Input() baseUrl: string = ''
  /**
   * The url of the application is used to create the url for the ajax call
   */
  @Input() apiUrl: string = ''
  /**
   * The queryParmas to add to the ajax call
   */
  @Input() apiParamName: string = ''
  /**
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = ''
  /**
   * The minimum number of characters to search
   */
  @Input() startAfter: number = 0
  /**
   * The number of options that can be displayed that reflect the criteria sought
   */
  @Input() optionLimit: number | null = null
  /**
   * Array of additional classes to the input field
   */
  @Input() customClass: string[] = []
  /**
   * Adds bootstrap classes to the input that define the size of the field,
   * if not specified the field is displayed with standard size
   */
  @Input() size: 'lg' | 'sm' | null = null
  /**
   * Defines the autocomplete tag to indicate to the browser what type of field it is
   * and how to help the user fill it in
   */
  @Input() autocomplete: string = 'off'

  /**
   * The value of the input
   */
  _value: string = ''
  /**
   * the status of the success message
   */
  _successMessage: string = ''
  /**
   * the status of the error message
   */
  _errorMessage: string = ''
  /**
   * the status of the help message
   */
  _helpMessage: string = ''
  /**
   * Contains the value required by a validation when it fails
   */
  _requiredValue: any = ''
  suggestions$: Observable<any>
  /**
   * The html input element
   */
  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>
  /**
   * Standard definition to create a control value accessor
   */
  onTouched: any = () => {
  }
  /**
   * Standard definition to create a control value accessor
   */
  onChanged: any = () => {
  }

  /**
   * constructor
   * @param renderer html access
   * @param autocompleteService
   * @param control cva access
   */
  constructor (
    private readonly renderer: Renderer2,
    private readonly autocompleteService: QuixAutocompleteAsyncService,
    @Self() @Optional() public control: NgControl,
  ) {
    this.control && (this.control.valueAccessor = this)
  }

  /**
   * Creates the observable that returns the list of selectable options,
   * based on the configurations it decides which method to use
   * Check if the help message is required and create the key
   */
  ngOnInit () {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control?.name}.help`
    }
    this.suggestions$ = new Observable((observer: Observer<string>) => {
      observer.next(this._value)
    }).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (query) {
          if (this.restApi) {
            return this.autocompleteService.getRestList(this.baseUrl, this.apiUrl, query).pipe(
              map((data: any) => data || []),
            )
          }
          return this.autocompleteService.getList(this.baseUrl, this.apiUrl, query, this.apiParamName).pipe(
            map((data: any) => data || []),
          )
        }
        return of([])
      }),
      map(r => r.filter(s => s.toLowerCase().includes(this._value.toLowerCase())))
    )
  }

  /**
   * After rendering the component, it checks if the input field must have focus
   * and activates the monitoring of the validation of the entered values
   */
  ngAfterViewInit (): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.nativeElement.focus()
      }
    }, 0)
    this.observeValidate()
  }

  /**
   * Add focus to the input field if the need comes after component initialization
   * @param changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.autofocus && this.input) {
      this.input.nativeElement.focus()
    }
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnTouched (fn: any) {
    this.onTouched = fn
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnChange (fn: any) {
    this.onChanged = fn
  }

  /**
   * When the input value changes, the search status is saved and the cva flow is activated
   * @param e
   */
  onChangedHandler (e: Event) {
    this._value = (e.target as HTMLInputElement).value
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * When the user selects an option, it saves the selection status and starts the cva flow
   * @param e
   */
  onSelectHandler (e: TypeaheadMatch) {
    this._value = e.value
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * When the CVA is initialized as control it initializes the internal states
   * @param value
   */
  writeValue (value) {
    this._value = value
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState (isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled)
  }

  /**
   * When the input field changes,
   * the validation status is retrieved and the success message or error messages displayed.
   * If there is an error with a specific required value it is passed to the translation pipe
   * to allow for the creation of custom messages
   */
  observeValidate () {
    this.control?.statusChanges.pipe(
      delay(0)
    ).subscribe(() => {
      if (this.control.dirty) {
        if (this.control.valid && this.successMessage) {
          this._successMessage = `${this.formName}.${this.control?.name}.valid`
        }
        if (this.control.invalid && this.errorMessage) {
          for (const error in this.control.errors) {
            if (this.control.errors.hasOwnProperty(error)) {
              if (this.control.errors[error]) {
                this._errorMessage = `${this.formName}.${this.control?.name}.${error}`
                this._requiredValue = this.control.errors[error].requiredValue
              }
            }
          }
        }
      }
    })
  }
}
