import {
  AfterViewInit,
  Component,
  DoCheck,
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
import { ControlValueAccessor, NgControl } from '@angular/forms'

/**
 * select object component decorator
 */
@Component({
  selector: 'quang-select-obj',
  templateUrl: './select-obj.component.html',
  styleUrls: ['./select-obj.component.scss']
})
/**
 * select object component
 */
export class SelectObjComponent implements ControlValueAccessor, AfterViewInit, OnInit, OnChanges, DoCheck {
  /**
   * The label to display on the input field
   */
  @Input() label: string = ''
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
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`
  /**
   * Defines if the option labels are to be translated
   */
  @Input() translateValue: boolean = false
  /**
   * defines whether the user can select the blank field
   */
  @Input() nullOption: boolean = true
  /**
   * The list of selectable options
   */
  @Input() list: Array<Record<string, any>> = []
  /**
   * Defines the key of the value that will be used as the label for the input
   */
  @Input() labelValue: string = 'description'
  /**
   * Defines the key of the value that will be returned as the value of the input
   */
  @Input() returnValue: string = 'code'
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
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * Adds bootstrap classes to the input that define the size of the field,
   * if not specified the field is displayed with standard size
   */
  @Input() size: 'lg' | 'sm' | null = null
  /**
   * set default start value in select option
   */
  @Input() defaultValue: any
  /**
   * Defines whether the input field is in a read-only state
   */
  @Input() readonly: boolean = false

  /**
   * The value of the input
   */
  _value: any
  /**
   * the status of the success message
   */
  _successMessage: string = ''
  /**
   * the status of the help message
   */
  _helpMessage: string = ''
  /**
   * The html input element
   */
  @ViewChild('input', { static: true }) input: ElementRef<HTMLSelectElement> | undefined

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
   * Check if the help message is required and create the key
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
    if (changes.list?.currentValue) {
      if (!this.nullOption && !this._value) {
        if (this.returnValue && (changes.list.currentValue as any[])[0])
          this._value = this._value = (changes.list.currentValue as any[])[0][this.returnValue]
        this.onTouched()
        this.onChanged(this._value)
      }
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
   * to access property by own type and not string index = -1 only if nullOption === true
   */
  onChangedHandler(e: any): void {
    const index = this.nullOption ? e.target.selectedIndex - 1 : e.target.selectedIndex
    this._value = index === -1 ? null : this.list[index][this.returnValue]
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Standard definition to create a control value accessor
   * When the value of the input field from the form is set, the value of the input html tag is changed
   */
  writeValue(value: any): void {
    this._value = value
    this.renderer.setProperty(this.input?.nativeElement, 'value', value)
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled || this.readonly)
  }
}
