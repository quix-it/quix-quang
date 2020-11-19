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
} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';

import {delay} from 'rxjs/operators';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {QuangConfig} from "../quang-config.model";

@Component({
  selector: 'quix-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})

export class InputFileComponent implements OnInit, OnChanges, ControlValueAccessor, AfterViewInit {
  @Input() id: string;
  @Input() label: string;
  @Input() autofocus: boolean;
  @Input() ariaLabel: string;
  @Input() buttonLabel: string;
  @Input() formName: string;
  @Input() helpMessage: boolean;
  @Input() errorMessage: boolean;
  @Input() successMessage: boolean;
  @Input() disabled: boolean;
  @Input() tabIndex: number;
  @Input() buttonClass: string[];
  @Input() buttonDeleteIcon: string[];
  @Output() onDragOver = new EventEmitter<any>();
  @Output() onDragLeave = new EventEmitter<any>();

  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: File;
  @ViewChild('input', {static: false}) input: ElementRef<HTMLButtonElement>;
  _config: QuangConfig;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _dropMessage: string;
  _requiredValue: any;
  _classArray: string[] = [];

  get value() {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor(private renderer: Renderer2,
              @Self() @Optional() public control: NgControl,
              @Optional() config: QuangConfig) {
    this.control && (this.control.valueAccessor = this);
    this._config = config;
  }

  ngOnInit() {
    if (this.helpMessage) {
      this._helpMessage = this.formName + '.' + this.control?.name + '.help';
    }
    this._dropMessage = this.formName + '.' + this.control?.name + '.drop';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.nativeElement.focus();
      }
    }, 0);
    this.observeValidate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus && this.input) {
      this.input.nativeElement.focus();
    }
  }

  onChange(val) {
  }

  onTouched() {
  }

  // We implement this method to keep a reference to the onChange
  // callback function passed by the forms API
  registerOnChange(fn) {
    this.onChange = fn;
  }

  // We implement this method to keep a reference to the onTouched
  // callback function passed by the forms API
  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  // This is a basic setter that the forms API is going to use
  writeValue(value) {
    if (value) {
      if (value.target) {
        this.value = value.target.value;
      } else {
        this.value = value;
      }
    } else {
      this.value = value;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  observeValidate() {
    this.control?.statusChanges
      .pipe(
        delay(0)
      )
      .subscribe(() => {
        if (this.control.dirty) {
          if (this.control.valid && this.successMessage) {
            this._successMessage = `${this.formName}.${this.control.name}.valid`;
            this._classArray = [this._config.inputValidClass];
          } else if (this.control.invalid && this.errorMessage) {
            for (const error in this.control.errors) {
              if (this.control.errors.hasOwnProperty(error)) {
                if (this.control.errors[error]) {
                  this._errorMessage = this.formName + '.' + this.control.name + '.' + error;
                  this._requiredValue = this.control.errors[error].requiredValue;
                }
              }
            }
            this._classArray = [this._config.inputInvalidClass];
          } else {
            this._classArray = [];
          }
        } else {
          this._classArray = [];
        }
      });
  }

  dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
            this.writeValue(file);
          }
        );
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        this.writeValue(fileEntry);
      }
    }
  }

  fileOver(e: any) {
    this.onDragOver.emit(e);
  }

  fileLeave(e: any) {
    this.onDragLeave.emit(e);
  }

}
