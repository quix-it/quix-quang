import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

import { take } from 'rxjs/operators'

/**
 * text area component decorator
 */
@Component({
  selector: 'quang-text-area',
  templateUrl: './text-area.component.html',
  styles: []
})
/**
 * text area component
 */
export class QuangTextAreaComponent implements ControlValueAccessor, AfterViewInit, OnInit, OnChanges, DoCheck {
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
   * set default start value in select option
   */
  @Input() defaultValue: string = ''

  /**
   * The value of the input
   */
  _value: string = ''
  /**
   * the status of the success message
   */
  _successMessage: string = ''
  /**
   * the status of the help message
   */
  _helpMessage: string = ''
  _disabled: boolean = false
  /**
   * The html input element
   */
  @ViewChild('input', { static: true })
  input: ElementRef<HTMLTextAreaElement> | null = null

  @ViewChild('autosize') autosize: CdkTextareaAutosize | null = null

  @Input() errorMap: Record<string, string>

  errorMessageKey: string = ''

  requiredValue: string = ''

  /**
   * constructor
   * @param renderer html access
   * @param ngZone zonejs utility
   * @param ngControl cva access
   */
  constructor(
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone,
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
   * Checks if focus is required when displaying the input field.
   * Start the check on the validation of the field
   * Also listen to the changes in the ui to manage the resize of the field
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input?.nativeElement.focus()
      }
    }, 0)
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize?.resizeToFitContent(this.autoResize))
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
   * create the key for the help message
   */
  ngOnInit(): void {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.ngControl?.name}.help`
    }
    if (this.successMessage) {
      this._successMessage = `${this.formName}.${this.ngControl?.name}.valid`
    }
    if (this.defaultValue) {
      this.writeValue(this.defaultValue)
      this.onChanged(this._value)
    }
  }

  /**
   * Checks if focus is required when displaying the input field.
   * @param changes component changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus?.currentValue && this.input) {
      this.input.nativeElement.focus()
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
    this._value = (e.target as HTMLInputElement).value
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Standard definition to create a control value accessor
   * When the value of the input field from the form is set, the value of the input html tag is changed
   */
  writeValue(value: string): void {
    this._value = value
    this.renderer.setProperty(this.input?.nativeElement, 'value', value)
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled || this.readonly)
  }
}
