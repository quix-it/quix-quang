import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  QueryList,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChildren
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { delay } from 'rxjs/operators'
/**
 * input radio component decorator
 */
@Component({
  selector: 'quix-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss']
})
/**
 * input radio component
 */
export class InputRadioComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
  /**
   * the name of the radio button group
   */
  @Input() groupName: string = ''
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * The label to display on the input field
   */
  @Input() label: string = ''
  /**
   * Defines whether the radio should align with the other radios next to it
   */
  @Input() inline: boolean = false
  /**
   * The list of objects representing the radio fields
   */
  @Input() radioList: Array<any> = []
  /**
   * Indicates whether, when the page is opened,
   * this input field should be displayed in a focused state or not
   */
  @Input() autofocus: boolean = false
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
   * Defines if you want to display the success message for the user
   */
  @Input() successMessage: boolean = false
  /**
   * Defines if you want to display the help message for the user
   */
  @Input() helpMessage: boolean = false
  /**
   * Defines if you want to display the error message for the user
   */
  @Input() errorMessage: boolean = false
  /**
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = ''
  /**
   * Defines the key of the value that will be used as the label for the input
   */
  @Input() labelValue: string | null = null
  /**
   * Defines the key of the value that will be returned as the value of the input
   */
  @Input() returnValue: string | null = null
  /**
   * Array of additional classes to the input field
   */
  @Input() customClass: string[] = []
  /**
   * Defines the autocomplete tag to indicate to the browser what type of field it is
   * and how to help the user fill it in
   */
  @Input() autocomplete: string = 'off'

  /**
   * The value of the input
   */
  _value: string | number = null
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
  @ViewChildren('input') input: QueryList<ElementRef<HTMLInputElement>>
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
    @Self() @Optional() public control: NgControl,
  ) {
    this.control && (this.control.valueAccessor = this)
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
        this.input.forEach((item) => {
          item.nativeElement.focus()
        })
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
      this.input[0].nativeElement.focus()
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
   * When the input changes,
   * its value is retrieved from the html element and the status change is signaled to the form
   * @param e
   */
  onChangedHandler (e: Event) {
    this._value = (e.target as HTMLInputElement).value
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Standard definition to create a control value accessor
   * When the value of the input field from the form is set, the value of the input html tag is changed
   */
  writeValue (value) {
    this._value = value
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState (isDisabled: boolean): void {
    this.input?.forEach((item) => {
      this.renderer.setProperty(item.nativeElement, 'disabled', isDisabled)
    })
  }

  /**
   * When the input field changes,
   * the validation status is retrieved and the success message or error messages displayed.
   * If there is an error with a specific required value it is passed to the translation pipe
   * to allow for the creation of custom messages
   */
  observeValidate () {
    this.control?.statusChanges
      .pipe(
        delay(0)
      )
      .subscribe(() => {
        if (this.control.dirty) {
          if (this.control.valid && this.successMessage) {
            this._successMessage = `${this.formName}.${this.control?.name}.valid`
          } else if (this.control.invalid && this.errorMessage) {
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
