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
 * input fraction component decorator
 */
@Component({
  selector: 'quang-input-fraction',
  templateUrl: './input-fraction.component.html',
  styles: []
})
/**
 * input fraction component
 */
export class QuangInputFractionComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnChanges, DoCheck {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * The label to display on the input field
   */
  @Input() label: string = ''
  /**
   * the jump to be made when the whole part of the fraction is increased
   */
  @Input() stepInteger: number = 1
  /**
   * the jump to be made when the fractional part of the fraction is increased
   */
  @Input() stepFraction: number = 1
  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`
  /**
   * Defines if you want to display the help message for the user
   */
  @Input() helpMessage: boolean = false
  /**
   * Defines if you want to display the success message for the user
   */
  @Input() successMessage: boolean = false
  /**
   * Defines if you want to display the error message for the user
   */
  @Input() errorMessage: boolean = false
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
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * Defines the minimum value of the input field
   */
  @Input() min: number = 0
  /**
   * Defines the maximum value of the input field
   */
  @Input() max: number = 0
  /**
   * The classes that define the style of the add button
   */
  @Input() addButtonClass: string[] = []
  /**
   * The classes that define the style of the remove button
   */
  @Input() removeButtonClass: string[] = []
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
  _value: number | null = null
  /**
   * the status of the success message
   */
  _successMessage: string = ''
  /**
   * the status of the help message
   */
  _helpMessage: string = ''
  /**
   * the status of the disabled
   */
  _disabled: boolean = false
  @ViewChild('inputInteger', { static: true }) inputInteger: ElementRef<HTMLInputElement> | undefined
  @ViewChild('inputFraction', { static: true }) inputFraction: ElementRef<HTMLInputElement> | undefined

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
   * After rendering the component, it checks if the input field must have focus
   * and activates the monitoring of the validation of the entered values
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.inputInteger?.nativeElement.focus()
      }
    }, 0)
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
  }

  /**
   * Add focus to the input field if the need comes after component initialization
   * @param changes component changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus?.currentValue && this.inputInteger) {
      this.inputInteger.nativeElement.focus()
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
   * When the CVA is initialized as control it initializes the internal states
   * @param value
   */
  writeValue(value: number): void {
    if (!value) {
      this._value = 0
    } else {
      this._value = value
    }
    this.setInput()
  }

  /**
   * Set the input values to display the fraction
   */
  setInput(): void {
    if (this._value === null) return
    this.renderer.setProperty(this.inputInteger?.nativeElement, 'value', Math.floor(this._value).toString())
    this.renderer.setProperty(
      this.inputFraction?.nativeElement,
      'value',
      (this._value - Math.floor(this._value)).toFixed(3).replace('0.', '')
    )
  }

  checkMaxMin(): void {
    if (this._value === null) return
    this.setDisabledState(this._value > this.max && this._value >= this.min)
  }

  /**
   * Calculate the integer part of the fraction
   * @param e
   */
  writeValueInteger(e: Event): void {
    if (this._value !== null) {
      this._value -= Math.floor(this._value)
      this._value += Math.floor(parseInt((e.target as HTMLInputElement).value))
    }
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Calculate the decimal part of the fraction
   * @param e
   */
  writeValueFraction(e: Event): void {
    if (this._value !== null) {
      this._value -= Math.floor(this._value % 1)
      this._value += parseFloat(`0.${(e.target as HTMLInputElement).value}`)
    }
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Event triggered by the add integer button,
   * validates the status and starts the flow of the cva
   */
  addInteger(): void {
    if (this._value !== null && this._value < this.max && this._value >= this.min) {
      this._value += this.stepInteger
    }
    this.setInput()
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Event triggered by the add decimal button,
   * validates the status and starts the flow of the cva
   */
  addFraction(): void {
    if (this._value !== null && this._value < this.max && this._value >= this.min) {
      const tmp = (this._value += this.stepFraction)
      this._value = parseFloat(tmp.toFixed(3))
    }
    this.setInput()
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Event triggered by the remove integer button,
   * validates the status and starts the flow of the cva
   */
  removeInteger(): void {
    if (this._value !== null && this._value <= this.max && this._value > this.min) {
      this._value -= this.stepInteger
    }
    this.setInput()
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Event triggered by the add integer button,
   * validates the status and starts the flow of the cva
   */
  removeFraction(): void {
    if (this._value !== null && this._value <= this.max && this._value > this.min) {
      const tmp = (this._value -= this.stepFraction)
      this._value = parseFloat(tmp.toFixed(3))
    }
    this.setInput()
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.inputInteger?.nativeElement, 'disabled', isDisabled || this.readonly)
    this.renderer.setProperty(this.inputFraction?.nativeElement, 'disabled', isDisabled || this.readonly)
    this._disabled = isDisabled
  }
}
