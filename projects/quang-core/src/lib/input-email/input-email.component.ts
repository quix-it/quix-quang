import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, OnChanges,
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
 * input email component decorator
 */
@Component({
  selector: 'quang-input-email',
  templateUrl: './input-email.component.html',
  styles: []
})
/**
 * input email component
 */
export class InputEmailComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
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
   * Defines whether the input field can accept multiple value
   */
  @Input() multiple: boolean = false
  /**
   * Defines the validation pattern of the input field
   */
  @Input() pattern: string = ''
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
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = ''
  /**
   * Array of additional classes to the input field
   */
  @Input() customClass: string[] = []
  /**
   * Defines the minimum length of the input field
   */
  @Input() min: number = 0
  /**
   * Defines the maximum length of the input field
   */
  @Input() max: number = 0
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
  /**
   * Define disabled state
   */
  _disabled: boolean = false

  /**
   * The html input element
   */
  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement> | null = null
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
   * @param control cva access
   */
  constructor (
    private readonly renderer: Renderer2,
    @Self() @Optional() public control: NgControl
  ) {
    this.control.valueAccessor = this
  }

  /**
   * create the key for the help message
   */
  ngOnInit (): void {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control?.name}.help`
    }
    if (this.successMessage) {
      this._successMessage = `${this.formName}.${this.control?.name}.valid`
    }
  }

  /**
   * After rendering the component, it checks if the input field must have focus
   * and activates the monitoring of the validation of the entered values
   */
  ngAfterViewInit (): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input?.nativeElement.focus()
      }
    }, 0)
    this.observeValidate()
  }

  /**
   * Add focus to the input field if the need comes after component initialization
   * @param changes component changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.autofocus?.currentValue && this.input) {
      this.input.nativeElement.focus()
    }
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnTouched (fn: any): void {
    this.onTouched = fn
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnChange (fn: any): void {
    this.onChanged = fn
  }

  /**
   * When the input changes,
   * its value is retrieved from the html element and the status change is signaled to the form
   * @param e
   */
  onChangedHandler (e: Event): void {
    this._value = (e.target as HTMLInputElement).value
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * When the CVA is initialized as control it initializes the internal states
   * @param value
   */
  writeValue (value: string): void {
    this._value = value
    this.renderer.setProperty(this.input?.nativeElement, 'value', value)
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState (isDisabled: boolean): void {
    this._disabled = isDisabled
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled)
  }

  /**
   * When the input field changes,
   * the validation status is retrieved and the success message or error messages displayed.
   * If there is an error with a specific required value it is passed to the translation pipe
   * to allow for the creation of custom messages
   */
  observeValidate (): void {
    this.control?.statusChanges?.pipe(
      delay(0),
      filter(() => !!this.control.dirty)
    ).subscribe(() => {
      if (this.control.invalid && this.errorMessage) {
        for (const error in this.control.errors) {
          if (error === 'minlength' || error === 'maxlength') {
            this._requiredValue = this.control.errors[error].requiredLength
          } else {
            this._requiredValue = this.control.errors[error].requiredValue
          }
          this._errorMessage = `${this.formName}.${this.control?.name}.${error}`
        }
      }
    })
  }
}
