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

import { BehaviorSubject } from 'rxjs'

/**
 * multi select string component decorator
 */
@Component({
  selector: 'quang-multi-select-strg',
  templateUrl: './multi-select-strg.component.html',
  styleUrls: ['../../multi-select-base/multi-select-base.scss']
})
/**
 * multi select string component
 */
export class MultiSelectStrgComponent implements ControlValueAccessor, AfterViewInit, OnInit, OnChanges, DoCheck {
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
   * Number of visible options
   */
  @Input() rowVisible: number = 0
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
   * Defines if the option labels are to be translated
   */
  @Input() translateValue: boolean = false
  /**
   * Defines whether the input field is in a read-only state
   */
  @Input() readonly: boolean = false
  /**
   * The value of the input
   */
  _value: any[] = []
  /**
   * the status of the success message
   */
  _successMessage: string = ''
  /**
   * the status of the help message
   */
  _helpMessage: string = ''
  /**
   * set disable state
   */
  _disabled: boolean = false
  /**
   * The html input element
   */
  @ViewChild('input', { static: true }) input: ElementRef<HTMLSelectElement> | undefined
  _showOptions$ = new BehaviorSubject<boolean>(false)
  optionHideTimeout: any

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

  _list: string[] = []

  get list(): string[] {
    return this._list
  }

  /**
   * the list of selectable options
   */
  @Input() set list(data: string[]) {
    if (data && this._list.toString() !== data.toString()) {
      this._list = data
      this._value = []
      this.ngControl?.control?.getRawValue()?.forEach((x: any) => {
        this.onSelectItem(x)
      })
    }
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
   */
  onChangedHandler(): void {
    this.onChanged(this._value.map((x) => x))
  }

  onSelectItem(itemCode: string | number): void {
    if (itemCode !== null && itemCode !== undefined) {
      const listItem = this.list.find((x) => x === itemCode)
      if (listItem) {
        if (this._value?.includes(listItem)) {
          this._value = this._value?.filter((x) => x !== listItem)
        } else {
          this._value?.push(listItem)
        }
        if (this._value?.length > 1) {
          const valueMap = new Map()
          this.list.forEach((x, i) => {
            valueMap.set(x, i)
          })
          this._value?.sort((a, b) => {
            return valueMap.get(a) - valueMap.get(b)
          })
        }
        this.onChangedHandler()
      }
    }
  }

  getSelected(item: any): boolean {
    return !!this._value?.includes(item)
  }

  /**
   * Standard definition to create a control value accessor
   * When the value of the input field from the form is set, the value of the input html tag is changed
   */
  writeValue(value: any): void {
    if (value?.length) {
      value.forEach((x) => {
        this.onSelectItem(x)
      })
    } else {
      this._value = value
    }
    this.renderer.setProperty(this.input?.nativeElement, 'value', value)
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled || this.readonly)
    this._disabled = isDisabled || this.readonly
  }

  changeOptionsVisibility(skipTimeout = false): void {
    if (this._showOptions$.value) {
      this.hideOptionVisibility(skipTimeout)
    } else {
      this.showOptionVisibility()
    }
  }

  showOptionVisibility(): void {
    if (this.optionHideTimeout) {
      clearTimeout(this.optionHideTimeout)
      this.optionHideTimeout = null
    }
    this._showOptions$.next(true)
  }

  hideOptionVisibility(skipTimeout = false): void {
    this.optionHideTimeout = setTimeout(
      () => {
        this._showOptions$.next(false)
      },
      skipTimeout ? 0 : 200
    )
  }
}
