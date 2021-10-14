import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, NgZone,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { delay, filter, take } from 'rxjs/operators'

/**
 * text area component decorator
 */
@Component({
  selector: 'quang-text-area',
  templateUrl: './text-area.component.html',
  styles: ['']
})
/**
 * text area component
 */
export class TextAreaComponent implements ControlValueAccessor, AfterViewInit, OnInit, OnChanges {
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
   * Defines the minimum length of the input field
   */
  @Input() min: number = 0
  /**
   * Defines the maximum length of the input field
   */
  @Input() max: number = 0
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
   * Defines whether the text area has the ability to update its size based on the text content
   */
  @Input() autoResize: boolean = false
  /**
   * Number of lines in the text area
   */
  @Input() rows: number = 0
  /**
   * Number of column in the text area
   */
  @Input() cols: number = 0
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`
  /**
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = ''
  /**
   * It defines how the size or direction of the text area can change
   */
  @Input() resizeMode: 'none' | 'auto' | 'vertical' | 'horizzontal' = 'auto'
  /**
   * Array of additional classes to the input field
   */
  @Input() customClass: string[] = []

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
   * The html input element
   */
  @ViewChild('input', { static: true }) input: ElementRef<HTMLTextAreaElement> | null = null
  @ViewChild('autosize') autosize: CdkTextareaAutosize | null = null

  /**
   * constructor
   * @param renderer html access
   * @param ngZone zonejs utility
   * @param control cva access
   */
  constructor (
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone,
    @Self() @Optional() public control: NgControl
  ) {
    this.control.valueAccessor = this
  }

  /**
   * Checks if focus is required when displaying the input field.
   * Start the check on the validation of the field
   * Also listen to the changes in the ui to manage the resize of the field
   */
  ngAfterViewInit (): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input?.nativeElement.focus()
      }
    }, 0)
    this.ngZone.onStable.pipe(
      take(1)
    ).subscribe(() => this.autosize?.resizeToFitContent(this.autoResize))
    this.observeValidate()
  }

  /**
   * create the key for the help message
   */
  ngOnInit (): void {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control?.name}.help`
    }
  }

  /**
   * Checks if focus is required when displaying the input field.
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
    this._value = (e.target as HTMLInputElement).value
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Standard definition to create a control value accessor
   * When the value of the input field from the form is set, the value of the input html tag is changed
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
      if (this.control.valid && this.successMessage) {
        this._successMessage = `${this.formName}.${this.control?.name}.valid`
      }
      if (this.control.invalid && this.errorMessage) {
        if (this.control.errors) {
          for (const error in this.control.errors) {
            if (error === 'minlength' || error === 'maxlength') {
              this._requiredValue = this.control.errors[error].requiredLength
            } else {
              this._requiredValue = this.control.errors[error].requiredValue
            }
            this._errorMessage = `${this.formName}.${this.control?.name}.${error}`
          }
        }
      }
    })
  }
}
