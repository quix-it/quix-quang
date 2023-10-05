import {
  AfterViewInit,
  Component,
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

import { delay, filter } from 'rxjs/operators'

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
export class QuangToggleComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
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
  /**
   * the status of disable
   */
  _disabled: boolean = false
  /**
   * Standard definition to create a control value accessor
   */
  onTouched: any = () => {}

  /**
   * Standard definition to create a control value accessor
   */
  onChanged: any = () => {}

  /**
   * constructor
   * @param renderer html access
   * @param control cva access
   */
  constructor(
    private readonly renderer: Renderer2,
    @Self() @Optional() public control: NgControl
  ) {
    this.control.valueAccessor = this
  }

  /**
   * create the key for the help message
   */
  ngOnInit(): void {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control?.name}.help`
    }
    if (this.successMessage) {
      this._successMessage = `${this.formName}.${this.control?.name}.valid`
    }
  }

  /**
   * Checks if focus is required when displaying the input field.
   * Start the check on the validation of the field
   */
  ngAfterViewInit(): void {
    this.observeValidate()
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
    this._disabled = isDisabled
    this.renderer.setProperty(this.input, 'disabled', isDisabled)
  }

  /**
   * When the input field changes,
   * the validation status is retrieved and the success message or error messages displayed.
   * If there is an error with a specific required value it is passed to the translation pipe
   * to allow for the creation of custom messages
   */
  observeValidate(): void {
    this.control?.statusChanges
      ?.pipe(
        delay(0),
        filter(() => !!this.control.dirty)
      )
      .subscribe(() => {
        if (this.control.invalid && this.errorMessage) {
          for (const error in this.control.errors) {
            if (Object.prototype.hasOwnProperty.call(this.control.errors.error, '')) {
              if (this.control.errors[error]) {
                this._errorMessage = `${this.formName}.${this.control?.name}.${error}`
                this._requiredValue = this.control.errors[error].requiredValue
              }
            }
          }
        }
      })
  }
}
