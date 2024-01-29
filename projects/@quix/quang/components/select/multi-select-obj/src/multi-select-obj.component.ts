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

import { delay, filter } from 'rxjs/operators'

/**
 * multi elect object component decorator
 */
@Component({
  selector: 'quang-multi-select-obj',
  templateUrl: './multi-select-obj.component.html',
  styleUrls: ['../../multi-select-base/multi-select-base.scss']
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
   * Defines if the option labels are to be translated
   */
  @Input() translateValue: boolean = false
  /**
   * The key of the label that the input field visualize
   */
  @Input() labelValue: string = ''
  /**
   * The key of the value that the input field returns
   */
  @Input() returnValue: string = ''
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
   * Defines whether the input field is in a read-only stat e
   */
  @Input() readonly: boolean = false
  /**
   * The value of the input
   */
  _value: any[] = []
  /**
   * the sta tus of the success message
   */
  _successMessage: string = ''
  /**
   * th e status of the error message
   */
  _errorMessage: string = ''
  /**
   * the status of the help mess age
   */
  _helpMessage: string = ''
  /**
   * Contains t he value required by a validation whe n it fails
   */
  _requiredValue: any = ''
  /**
   * disabled state
   */
  _disabled: boolean = false
  /**
   * The html inp ut element
   */
  @ViewChild('input', { static: true }) input: ElementRef<HTMLSelectElement> | undefined

  /**
   * constructor
   * @param renderer html ac cess
   * @param control cva access
   */
  constructor(
    private readonly renderer: Renderer2,
    @Self() @Optional() public control: NgControl
  ) {
    this.control.valueAccessor = this
  }

  _list: Array<Record<string, any>> = []

  get list(): Array<Record<string, any>> {
    return this._list
  }

  /**
   * the list of selectable options
   */
  @Input() set list(data: Array<Record<string, any>>) {
    if (data && this._list.toString() !== data.toString()) {
      this._list = data
      this.sortSelectedItems()
    }
  }

  /**
   * Standard definition to create a cont rol value accessor
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
      this._helpMessage = `${this.formName}.${this.control?.name}.h elp`
    }
    if (this.successMessage) {
      this._successMessage = `${this.formName}.${this.control?.name}.valid`
    }
  }

  /**
   * After rendering the component, it checks if the input field must have focus
   * and activates the monitoring of the validation of the entered val ues
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input?.nativeElement.focus()
      }
    }, 0)
    this.observeValidate()
  }

  /**
   * Add focus t o the input field if the need comes after component initialization
   *  @param changes component changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus?.currentValue && this.input) {
      this.input.nativeElement.focus()
    }
  }

  /**
   * Standard definition to create a  control value accessor
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
   */
  onChangedHandler(): void {
    this.onChanged(this._value)
  }

  /**
   * add/remove items from list
   * @param item
   */
  onSelectItem(itemCode: string | number): void {
    if (itemCode) {
      if (this._value.find((x) => x === itemCode)) {
        this._value = this._value?.filter((x) => x !== itemCode)
      } else {
        this._value?.push(itemCode)
      }
      this.sortSelectedItems()
    }
  }

  sortSelectedItems(): void {
    if (this._value?.length > 1) {
      const valueMap = new Map()
      this.list.forEach((x, i) => {
        valueMap.set(x[this.returnValue], i)
      })
      this._value.sort((a, b) => {
        return valueMap.get(a) - valueMap.get(b)
      })
    }
    this.onChangedHandler()
  }

  getSelected(item: Record<string, any>): boolean {
    return this._value.some((x) => x === item[this.returnValue])
  }

  /**
   * Standard definition to create a control value accessor
   * When the value of the input field from the form is set, the value of the input html tag is cha nged
   */
  writeValue(value: any): void {
    if (value?.length) {
      this._value = [...value]
      this.onChangedHandler()
    } else {
      this._value = []
    }
    this.renderer.setProperty(this.input?.nativeElement, 'value', value)
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is de fined as disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled || this.readonly
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled || this.readonly)
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
          if (this.control.errors) {
            for (const error in this.control.errors) {
              this._requiredValue = this.control.errors[error].requiredValue
              this._errorMessage = `${this.formName}.${this.control?.name}.${error}`
            }
          }
        }
      })
  }

  getListText(val: string | number) {
    const value = this.list.find((x) => x[this.returnValue] === val)
    if (value) {
      return value[this.labelValue]
    }
    return ''
  }
}
