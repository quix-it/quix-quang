import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {QuixStyleService} from '../style/style.service';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'quix-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true
    }
  ]
})
export class InputFileComponent implements ControlValueAccessor {
  @Input() id: string;
  @Input() buttonText: string;
  // tslint:disable-next-line:max-line-length
  @Input() buttonClass: 'btn-outline-primary' | 'btn-outline-secondary' | 'btn-outline-success' | 'btn-outline-danger' | 'btn-outline-warning' | 'btn-outline-info' | 'btn-outline-light' | 'btn-outline-dark' | 'btn-outline-link';
  @Input() successMessage: string;
  @Input() placeholder: string;
  @Input() dropLabel: string;
  @Input() errorMessage: string;
  @Input() wrongFileMssage: string;
  @Input() disabled: boolean;
  @Input() validator: string;
  @Input() customClass: string;
  @Input() ariaLabel: string;
  @Input() label: string;
  @Input() tabIndex: number;
  @Input() multiFile: boolean;
  @Input() fileTypes: Array<string>;
  @Output() eventOver = new EventEmitter<any>();
  @Output() eventLeave = new EventEmitter<any>();
  // tslint:disable-next-line:no-input-rename
  @Input('value')
    // tslint:disable-next-line:variable-name
  _value: any;
  fileName = '';
  wrongFile: boolean;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < val.length; i++) {
      this.fileName = (this.fileName !== '' ? this.fileName + ', ' : '') + val[i].name;
    }
    this.onChange(val);
    this.onTouched();
  }

  constructor(private style: QuixStyleService) {
  }

  onChange(val) {
  }

  onTouched() {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value.target) {
      this.value = value.target.value;
    } else {
      this.value = value;
      if (value === '') {
        this.fileName = '';
      }
    }
  }

  getClass() {
    return this.style.getClassArray(this.validator, this.customClass);
  }

  fileOver(event) {
    this.eventOver.emit(event);
  }

  fileLeave(event) {
    this.eventLeave.emit(event);
  }

  dropped(files: NgxFileDropEntry[]) {
    if (!this.disabled) {
      this.validator = null;
      this.wrongFile = false;
      this.fileName = null;
      if (this.multiFile) {
        this.value = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < files.length; i++) {
          if (this.fileTypes.includes(files[i].fileEntry.name.split('.')[1].toLowerCase())) {
            if (files[i].fileEntry.isFile) {
              const fileEntry = files[i].fileEntry as FileSystemFileEntry;
              fileEntry.file((file: File) => {
                this.value.push(file);
                this.fileName = (this.fileName !== null ? this.fileName + ', ' : '') + file.name;
              });
            } else {
              this.invalidFile();
              return;
            }
          } else {
            // Invalid File extension
          }
        }
      } else {
        if (files.length === 1) {
          if (files[0].fileEntry.isFile) {
            const fileEntry = files[0].fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
              this.value = file;
              this.fileName = file.name;
            });
          } else {
            const fileEntry = files[0].fileEntry as FileSystemDirectoryEntry;
            this.invalidFile();
          }
        } else {
          this.invalidFile();
        }
      }
    }
  }

  invalidFile() {
    this.validator = 'is-invalid';
    this.disabled = true;
    this.wrongFile = true;
  }
}
