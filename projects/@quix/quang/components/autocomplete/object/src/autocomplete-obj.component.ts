import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

import { TypeaheadMatch } from 'ngx-bootstrap/typeahead'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

/**
 * autocomplete object component decorator
 */
@Component({
  selector: 'quang-autocomplete-obj',
  templateUrl: './autocomplete-obj.component.html',
  styleUrls: ['autocomplete-obj.component.scss']
})
/**
 * autocomplete object component
 */
export class QuangAutocompleteObjectComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges, DoCheck
{
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
   * The key of the value to be returned as the value of the cva
   */
  @Input() returnValue: string = ''
  /**
   * The key of the value to be searched
   */
  @Input() searchBy: string = ''
  /**
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = ''
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
   * Defines if position adaptable *default = true
   */
  @Input() adaptivePosition = true
  @Output() searchTextChange: EventEmitter<string> = new EventEmitter<string>()
  @Input() searchTextDebounceTime = 0
  searchTextDebouncer: Subject<string> = new Subject<string>()
  /**
   * The value of the input
   */
  _value: string | number | null = ''
  /**
   * the status of the success message
   */
  _successMessage: string = ''
  /**
   * the status of the help message
   */
  _helpMessage: string = ''
  /**
   * The state of the lookup value
   */
  _searchValue: string = ''
  /**
   * set disable state
   */
  _isDisabled: boolean = false
  /**
   * focus
   */
  _isFocused: boolean = false
  /**
   * The html input element
   */
  @ViewChild('input', { static: true })
  input: ElementRef<HTMLInputElement> | null = null

  @Input() errorMap: Record<string, string>

  errorMessageKey: string = ''

  requiredValue: string = ''

  /**
   * constructor
   * @param renderer html access
   * @param ngControl cva access
   */
  constructor(
    private readonly renderer: Renderer2,
    @Self() @Optional() public ngControl?: NgControl
  ) {
    if (this.ngControl) this.ngControl.valueAccessor = this
  }

  _dataList: any[] = []

  get dataList(): any[] {
    return this._dataList
  }

  /**
   * The list of options where to search for the selected one
   */
  @Input() set dataList(val: any[]) {
    this._dataList = val
    if (!this._searchValue) this.writeValue(this._value ?? null)
    if (this._isFocused) {
      this.input?.nativeElement.click()
    }
  }

  /**
   * Standard definition to create a control value accessor
   */
  onTouched: any = () => {}

  /**
   * Standard definition to create a control value accessor
   */
  onChanged: any = () => {}

  /**
   * Check if the help message is required and create the key
   */
  ngOnInit(): void {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.ngControl?.name}.help`
    }
    if (this.successMessage) {
      this._successMessage = `${this.formName}.${this.ngControl?.name}.valid`
    }
    this.searchTextDebouncer
      .pipe(debounceTime(this.searchTextDebounceTime ?? 0), distinctUntilChanged())
      .subscribe((value) => {
        this.searchTextChange.emit(value)
      })
  }

  /**
   * After rendering the component, it checks if the input field must have focus
   * and activates the monitoring of the validation of the entered values
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input?.nativeElement.focus()
      }
    }, 0)
  }

  /**
   * Add focus to the input field if the need comes after component initialization
   * @param changes component changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus?.currentValue && this.input) {
      this.input.nativeElement.focus()
    }
  }

  ngDoCheck(): void {
    if (!this.errorMessage || this.ngControl?.valid) return
    const errorKey = Object.keys(this.ngControl?.errors ?? {})[0]
    this.errorMessageKey = this.errorMap?.[errorKey] ?? `${this.formName}.${this.ngControl?.name}.${errorKey}`
    this.requiredValue =
      this.ngControl?.errors?.[errorKey]?.[
        errorKey === 'minlength' || errorKey === 'maxlength' ? 'requiredLength' : 'requiredValue'
      ]
  }

  onFocus(e: any): void {
    if (e) this._isFocused = true
  }

  onFocusOut(e: any): void {
    if (e) this._isFocused = false
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnChange(fn: any): void {
    this.onChanged = fn
  }

  /**
   * When the input field changes its value, it saves the state of the field and activates the CVA flow
   * @param e
   */
  onChangedHandler(e: TypeaheadMatch | null): void {
    this._value = e?.item[this.returnValue]
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Stream when input HTML element change value and clear value for form if it's empty
   * @param e
   */
  onChangeInput(e: Event): void {
    this._searchValue = (e.target as HTMLInputElement).value
    if (!this._searchValue) this.onChangedHandler(null)
    this.searchTextDebouncer.next(this._searchValue)
  }

  /**
   * When the CVA is initialized as control it initializes the internal states
   * looking in the list for the data with the past value
   * @param value
   */
  writeValue(value: any): void {
    this._value = value
    if (this.dataList?.find((item) => item[this.returnValue] === value)) {
      this._searchValue = this._dataList?.find((item) => item[this.returnValue] === value)[this.searchBy]
    }
    if (!value) {
      this._searchValue = ''
    }
    this.renderer.setProperty(this.input?.nativeElement, 'value', this._searchValue)
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled || this.readonly
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled)
  }
}
