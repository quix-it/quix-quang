import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Renderer2,
  Self,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

import { FileSystemFileEntry, NgxFileDropComponent, NgxFileDropEntry } from 'ngx-file-drop'
import { delay, filter } from 'rxjs/operators'

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
export class QuangInputFileComponent implements ControlValueAccessor, OnInit, AfterViewInit {
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
   * the status of the error message
   */
  _errorMessage: string = ''
  /**
   * the status of the help message
   */
  _helpMessage: string = ''
  /**
   * the status of the drop message
   */
  _dropMessage: string = ''
  /**
   * Contains the value required by a validation when it fails
   */
  _requiredValue: any = ''
  /**
   * Define disabled state
   */
  _disabled: boolean = false

  /**
   * constructor
   * @param renderer html access
   * @param control cva access
   */
  constructor(
    private readonly renderer: Renderer2,
    @Self() @Optional() public control: NgControl
  ) {
    this.control.valueAccessor = this
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
      this._helpMessage = `${this.formName}.${this.control?.name}.help`
    }
    if (this.successMessage) {
      this._successMessage = `${this.formName}.${this.control?.name}.valid`
    }
    this._dropMessage = `${this.formName}.${this.control?.name}.drop`
  }

  /**
   * After rendering the component, it checks if the input field must have focus
   * and activates the monitoring of the validation of the entered values
   */
  ngAfterViewInit(): void {
    this.observeValidate()
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
      if (value) {
        this._values = value as File[]
      } else {
        this._values = []
      }
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
          for (const error in this.control.errors) {
            if (this.control.errors[error]) {
              this._errorMessage = `${this.formName}.${this.control?.name}.${error}`
              this._requiredValue = this.control.errors[error].requiredValue
            }
          }
        }
      })
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
