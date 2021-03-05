import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { delay } from 'rxjs/operators'
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropComponent, NgxFileDropEntry } from 'ngx-file-drop'

@Component({
  selector: 'quix-input-file',
  templateUrl: './input-file.component.html',
  styles: ['']
})

export class InputFileComponent implements OnInit, OnChanges, ControlValueAccessor, AfterViewInit {
  @Input() id: string
  @Input() label: string
  @Input() ariaLabel: string
  @Input() buttonLabel: string
  @Input() formName: string
  @Input() helpMessage: boolean
  @Input() errorMessage: boolean
  @Input() multiple: boolean
  @Input() successMessage: boolean
  @Input() tabIndex: number
  @Input() buttonClass: string[]
  @Input() buttonDeleteIcon: string[]
  @Input() customClass: string[] = []
  @Output() onDragOver = new EventEmitter<any>()
  @Output() onDragLeave = new EventEmitter<any>()

  @ViewChild('input', { static: false }) input: NgxFileDropComponent
  @ViewChild('inputBtn', { static: false }) inputBtn: ElementRef<HTMLButtonElement>
  _value: File
  _values: File[] = []
  _successMessage: string
  _errorMessage: string
  _helpMessage: string
  _dropMessage: string
  _requiredValue: any
  onTouched: any = () => {
  }
  onChanged: any = () => {
  }

  constructor (
    private renderer: Renderer2,
    @Self() @Optional() public control: NgControl,
  ) {
    this.control && (this.control.valueAccessor = this)
  }

  ngOnInit () {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control?.name}.help`
    }
    this._dropMessage = `${this.formName}.${this.control?.name}.drop`
  }

  ngAfterViewInit (): void {
    this.observeValidate()
  }

  ngOnChanges (changes: SimpleChanges): void {}

  // We implement this method to keep a reference to the onChange
  // callback function passed by the forms API
  registerOnChange (fn: any) {
    this.onChanged = fn
  }

  // We implement this method to keep a reference to the onTouched
  // callback function passed by the forms API
  registerOnTouched (fn: any) {
    this.onTouched = fn
  }

  onChangedHandler (files: NgxFileDropEntry[]) {
    files.forEach(f => {
      if (f.fileEntry.isFile) {
        const fileEntry = f.fileEntry as FileSystemFileEntry
        fileEntry.file((file: File) => {
            if (this.multiple) {
              (this._values as File[]).push(file)
            } else {
              this._value = file
            }
            this.onTouched()
            this.onChanged(this._value)
          }
        )
      }
    })
  }

  // This is a basic setter that the forms API is going to use
  writeValue (value: File | File []) {
    if (this.multiple) {
      this._values = value as File[]
    } else {
      this._value = value as File
    }
  }

  setDisabledState (isDisabled: boolean): void {
    this.input.disabled = isDisabled
    this.renderer.setProperty(this.inputBtn.nativeElement, 'disabled', isDisabled)
  }

  deleteFile () {
    this._value = null
    this.onTouched()
    this.onChanged(this._value)
  }

  deleteFiles (index: number) {
    this._values = this._values.splice(index, 1)
    this.onTouched()
    this.onChanged(this._value)
  }

  observeValidate () {
    this.control?.statusChanges
      .pipe(
        delay(0)
      )
      .subscribe(() => {
        if (this.control.dirty) {
          if (this.control.valid && this.successMessage) {
            this._successMessage = `${this.formName}.${this.control.name}.valid`
          } else if (this.control.invalid && this.errorMessage) {
            for (const error in this.control.errors) {
              if (this.control.errors.hasOwnProperty(error)) {
                if (this.control.errors[error]) {
                  this._errorMessage = `${this.formName}.${this.control.name}.${error}`
                  this._requiredValue = this.control.errors[error].requiredValue
                }
              }
            }
          }
        }
      })
  }

  fileOver (e: any) {
    this.onDragOver.emit(e)
  }

  fileLeave (e: any) {
    this.onDragLeave.emit(e)
  }

}
