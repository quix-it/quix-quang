import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

import { FileSystemFileEntry, NgxFileDropComponent, NgxFileDropEntry } from 'ngx-file-drop'

/**
 * input file component decorator
 */
@Component({
  selector: 'quang-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
/**
 * input file component
 */
export class QuangInputFileComponent implements ControlValueAccessor, OnInit, DoCheck {
  /**
   * Html id of input
   */
  @Input() id: string = ''
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
   * The label to display in the button for file selection
   */
  @Input() buttonLabel: string = ''
  /**
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = ''
  /**
   * Defines if you want to display the help message for the user
   */
  @Input() helpMessage: boolean = false
  /**
   * Defines if you want to display the error message for the user
   */
  @Input() errorMessage: boolean = false
  /**
   * Defines whether the input field can accept multiple value
   */
  @Input() multiple: boolean = false
  /**
   * Defines if you want to display the success message for the user
   */
  @Input() successMessage: boolean = false
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * The classes that define the style of the button for selecting the file
   */
  @Input() buttonClass: string[] = []
  /**
   * Array of additional classes to the input field
   */
  @Input() customClass: string[] = []
  /**
   * Indicate the file type selectable
   */
  @Input() acceptFileType: string = ''
  /**
   * Defines whether the input field is in a read-only state
   */
  @Input() readonly: boolean = false
  /**
   * Event that emits when the file being dragged is above the input field
   */
  @Output() whenDragOver: EventEmitter<any> = new EventEmitter<any>()
  /**
   * Event that emits when the file in drag state is dropped on the input field
   */
  @Output() whenDragLeave: EventEmitter<any> = new EventEmitter<any>()
  /**
   * The html input element
   */
  @ViewChild('input', { static: false }) input: NgxFileDropComponent | undefined
  /**
   * The html button of selection
   */
  @ViewChild('inputBtn', { static: false }) inputBtn: ElementRef<HTMLButtonElement> | undefined
  /**
   * The value of the input
   */
  _value: File | null = null
  /**
   * The value of the input with multiple selection
   */
  _values: File[] = []
  /**
   * the status of the success message
   */
  _successMessage: string = ''
  /**
   * the status of the help message
   */
  _helpMessage: string = ''
  /**
   * the status of the drop message
   */
  _dropMessage: string = ''
  /**
   * Define disabled state
   */
  _disabled: boolean = false

  @Input() errorMap: Record<string, string>

  errorMessageKey: string = ''

  requiredValue: string = ''

  /**
   * constructor
   * @param renderer html access
   * @param ngControl cva access
   */
  constructor(@Self() @Optional() public ngControl?: NgControl) {
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
   * Create the key for the help and drop message
   */
  ngOnInit(): void {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.ngControl?.name}.help`
    }
    if (this.successMessage) {
      this._successMessage = `${this.formName}.${this.ngControl?.name}.valid`
    }
    this._dropMessage = `${this.formName}.${this.ngControl?.name}.drop`
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
   * When the input field changes value,
   * it extracts the data of the selected file and starts the flow of the cva
   * @param files
   */
  async onChangedHandler(files: NgxFileDropEntry[]): Promise<void> {
    const targetCount = files.length
    await new Promise<void>((resolve) => {
      if (this.multiple) {
        let count = files.filter((x) => !x.fileEntry.isFile)?.length ?? 0
        files.forEach((f) => {
          if (f.fileEntry.isFile) {
            const fileEntry = f.fileEntry as FileSystemFileEntry
            fileEntry.file((file: File) => {
              count++
              this._values = [...this._values, file]
              if (count >= targetCount) {
                resolve()
              }
            })
          }
        })
      } else {
        const file = files[0]
        if (file.fileEntry.isFile) {
          const fileEntry = file.fileEntry as FileSystemFileEntry
          fileEntry.file((f: File) => {
            this._value = f
            resolve()
          })
        }
      }
    })
    if (this.multiple) {
      this.onChanged(this._values)
    } else {
      this.onChanged(this._value)
    }
    this.onTouched()
  }

  /**
   * When the CVA is initialized as control it initializes the internal states
   * check if the value is a list or not and decide which state to initialize
   * @param value
   */
  writeValue(value: File | File[]): void {
    if (this.multiple) {
      this._values = value ? (value as File[]) : []
    } else {
      this._value = value as File
    }
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled || this.readonly
  }

  /**
   * Delete the file, change the input status and start the cva flow
   */
  deleteFile(): void {
    this._value = null
    this.onTouched()
    this.onChanged(this._value)
  }

  /**
   * Delete the file list, change the input status and start the cva flow
   * @param index
   */
  deleteFiles(index: number): void {
    this._values.splice(index, 1)
    this.onTouched()
    this.onChanged(this._values)
  }

  /**
   * When the file during a drag action and above the input field emits an event
   * @param e
   */
  fileOver(e: any): void {
    this.whenDragOver.emit(e)
  }

  /**
   * When the file is dropped into the input field during a drag action, it emits an event
   * @param e
   */
  fileLeave(e: any): void {
    this.whenDragLeave.emit(e)
  }
}
