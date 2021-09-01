import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Optional, QueryList,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild, ViewChildren
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { delay, filter } from 'rxjs/operators'

/**
 * multi elect object component decorator
 */
@Component({
  selector: 'quang-multi-select-obj',
  templateUrl: './multi-select-obj.component.html',
  styleUrls: ['./multi-select-obj.component.scss']
})
/**
 * multi elect object component
 */
export class MultiSelectObjComponent implements ControlValueAccessor, AfterViewInit, OnInit, OnChanges {
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
   * Indicates whether, when the page is opened,
   * this input field should be displayed in a focused state or not
   */
  @Input() autofocus: boolean = false
  /**
   * the list of selectable options
   */
  @Input() list: Array<{ [key: string]: any }> = []
  /**
   * Defines if the option labels are to be translated
   */
  @Input() translateValue: boolean = false
  /**
   * The key of the label that the input field visualize
   */
  @Input() labelValue: string | null = null
  /**
   * The key of the value that the input field returns
   */
  @Input() returnValue: string | null = null
  /**
   * Number of visible options
   */
  @Input() rowVisible: number = 0
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
   * defines whether the user can select the blank field
   */
  @Input() nullOption: boolean = true
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
   * The value of the input
   */
  _value: string[] = []
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
   * The html input element
   */
  @ViewChild('input', { static: true }) input: ElementRef<HTMLSelectElement>
  @ViewChildren('options') options: QueryList<ElementRef<HTMLOptionElement>>
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
   * Check if the help message is required and create the key
   */
  ngOnInit (): void {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control?.name}.help`
    }
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
   * @param changes component changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.autofocus && this.input) {
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
    this._value = this.options
      .filter(o => o.nativeElement.selected)
      .map(o => this.list[o.nativeElement.index - 1][this.returnValue])
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Standard definition to create a control value accessor
   * When the value of the input field from the form is set, the value of the input html tag is changed
   */
  writeValue (value): void {
    this._value = value
    this.renderer.setProperty(this.input?.nativeElement, 'value', value)
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
  observeValidate (): void {
    this.control?.statusChanges.pipe(
      delay(0),
      filter(() => this.control.dirty)
    ).subscribe(() => {
      if (this.control.valid && this.successMessage) {
        this._successMessage = `${this.formName}.${this.control?.name}.valid`
      } else if (this.control.invalid && this.errorMessage) {
        for (const error in this.control.errors) {
          if (Object.prototype.hasOwnProperty.call(this.control.errors.error)) {
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
