import {
  AfterViewInit,
  Component,
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
import { delay } from 'rxjs/operators'
/**
 * input fraction component decorator
 */
@Component({
  selector: 'quix-input-fraction',
  templateUrl: './input-fraction.component.html',
  styles: ['']
})
/**
 * input fraction component
 */
export class InputFractionComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnChanges {
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
   * the status of the disabled
   */
  _disabled: boolean
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
  @ViewChild('inputInteger', { static: true }) inputInteger: ElementRef<HTMLInputElement>
  @ViewChild('inputFraction', { static: true }) inputFraction: ElementRef<HTMLInputElement>

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
   * After rendering the component, it checks if the input field must have focus
   * and activates the monitoring of the validation of the entered values
   */
  ngAfterViewInit (): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.inputInteger.nativeElement.focus()
      }
    }, 0)
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
   * Add focus to the input field if the need comes after component initialization
   * @param changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.autofocus && this.inputInteger) {
      this.inputInteger.nativeElement.focus()
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
   * When the CVA is initialized as control it initializes the internal states
   * @param value
   */
  writeValue (value: number) {
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
  setInput () {
    this.renderer.setProperty(this.inputInteger.nativeElement, 'value', Math.floor(this._value).toString())
    this.renderer.setProperty(this.inputFraction.nativeElement, 'value', (this._value - Math.floor(this._value)).toFixed(3).replace('0.', ''))
  }

  /**
   * Calculate the integer part of the fraction
   * @param e
   */
  writeValueInteger (e: Event) {
    this._value -= Math.floor(this._value)
    this._value += Math.floor(parseInt((e.target as HTMLInputElement).value))
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Calculate the decimal part of the fraction
   * @param e
   */
  writeValueFraction (e: Event) {
    this._value -= parseInt((e.target as HTMLInputElement).value) % 1
    this._value += parseFloat('0.' + (e.target as HTMLInputElement).value)
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Event triggered by the add integer button,
   * validates the status and starts the flow of the cva
   */
  addInteger () {
    if (this._value < this.max && this._value >= this.min) {
      if (this._value % this.stepInteger) {
        this._value += (this.stepInteger - (this._value % this.stepInteger))
      } else {
        this._value += this.stepInteger
      }
    }
    this.setInput()
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Event triggered by the add decimal button,
   * validates the status and starts the flow of the cva
   */
  addFraction () {
    if (this._value < this.max && this._value >= this.min) {
      if (this._value % this.stepFraction) {
        this._value += (this.stepFraction - (this._value % this.stepFraction))
      } else {
        this._value += this.stepFraction
      }
    }
    this.setInput()
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Event triggered by the remove integer button,
   * validates the status and starts the flow of the cva
   */
  removeInteger () {
    if (this._value <= this.max && this._value > this.min) {
      if (this._value % this.stepInteger) {
        this._value -= (this.stepInteger - (this._value % this.stepInteger))
      } else {
        this._value -= this.stepInteger
      }
    }
    this.setInput()
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Event triggered by the add integer button,
   * validates the status and starts the flow of the cva
   */
  removeFraction () {
    if (this._value <= this.max && this._value > this.min) {
      if (this._value % this.stepFraction) {
        this._value -= (this.stepFraction - (this._value % this.stepFraction))
      } else {
        this._value -= this.stepFraction
      }
    }
    this.setInput()
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState (isDisabled: boolean): void {
    this.renderer.setProperty(this.inputInteger.nativeElement, 'disabled', isDisabled)
    this.renderer.setProperty(this.inputFraction.nativeElement, 'disabled', isDisabled)
    this._disabled = isDisabled
  }

  /**
   * When the input field changes,
   * the validation status is retrieved and the success message or error messages displayed.
   * If there is an error with a specific required value it is passed to the translation pipe
   * to allow for the creation of custom messages
   */
  observeValidate () {
    this.control?.statusChanges.pipe(
      delay(0)
    ).subscribe(() => {
      if (this.control.dirty) {
        if (this.control.valid && this.successMessage) {
          this._successMessage = `${this.formName}.${this.control?.name}.valid'`
        }
        if (this.control.invalid && this.errorMessage) {
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
