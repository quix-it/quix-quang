import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

/**
 * toggle component decorator
 */
@Component({
  selector: 'quang-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
/**
 * toggle component
 */
export class QuangToggleComponent implements ControlValueAccessor, OnInit, DoCheck, OnChanges {
  /**
   * Array of additional classes to the input field
   */
  @Input() customClass: string[] = []
  /**
   * The label to display on the input field
   */
  @Input() label: string = ''
  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`
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
   * Defines whether the label is displayed on the same line as the input field
   */
  @Input() labelInline: boolean = false
  /**
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = ''
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * set toggle direction. default = column
   */
  @Input() direction: 'row' | 'reverse-row' | 'column' = 'column'
  /**
   * Defines whether the input field is in a read-only state
   */
  @Input() readonly: boolean = false
  /**
   * The html input element
   */
  @ViewChild('input', { static: true }) input: HTMLInputElement | undefined
  /**
   * The value of the input
   */
  _value: boolean | null = null
  /**
   * the status of the success message
   */
  _successMessage: string = ''
  /**
   * the status of the help message
   */
  _helpMessage: string = ''
  /**
   * the status of disable
   */
  _disabled: boolean = false

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

  /**
   * Standard definition to create a control value accessor
   */
  onTouched: any = () => {}

  /**
   * Standard definition to create a control value accessor
   */
  onChanged: any = () => {}

  /**
   * create the key for the help message
   */
  ngOnInit(): void {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.ngControl?.name}.help`
    }
    if (this.successMessage) {
      this._successMessage = `${this.formName}.${this.ngControl?.name}.valid`
    }
  }

  /**
   * Checks if focus is required when displaying the input field.
   * @param changes component changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus?.currentValue && this.input) {
      this.input.focus()
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
   * When the input changes,
   * its value is retrieved from the html element and the status change is signaled to the form
   * @param e
   */
  onChangedHandler(e: Event): void {
    if (this._disabled || this.readonly) return
    this._value = (e.target as HTMLInputElement).checked
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Standard definition to create a control value accessor
   * When the value of the input field from the form is set, the value of the input html tag is changed
   */
  writeValue(value: any): void {
    this._value = value || null
    if (this.input) this.input.checked = value
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled || this.readonly
    this.renderer.setProperty(this.input, 'disabled', isDisabled || this.readonly)
  }
}
