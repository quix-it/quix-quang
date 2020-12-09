import {AfterViewInit, Component, ElementRef, Input, OnInit, Optional, Renderer2, Self, ViewChild} from '@angular/core';
import {NgControl} from '@angular/forms';

import {delay} from 'rxjs/operators';
import 'quill-emoji/dist/quill-emoji.js'
import {QuillEditorComponent} from "ngx-quill";
import {QuangConfig} from "../quang-config.model";


@Component({
  selector: 'quix-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, AfterViewInit, OnInit {
  @Input() label: string;
  @Input() placeholder = '';
  @Input() id: string;
  @Input() successMessage: boolean;
  @Input() errorMessage: boolean;
  @Input() helpMessage: boolean;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() tabIndex: number;
  @Input() max: number;
  @Input() min: number;
  @Input() ariaLabel: string;
  @Input() toolbar: any;
  @Input() formName: string;
  @Input() returnHtml: boolean;
  @Input() listBar: boolean;
  @Input() textTypeBar: boolean;
  @Input() textStyleBar: boolean;
  @Input() alignBar: boolean;
  @Input() fontBar: boolean;
  @Input() mediaBar: boolean;
  @Input() headerBar: boolean;
  @Input() sizeBar: boolean;
  @Input() emojiBar: boolean;
  @Input() indentBar: boolean;
  @Input() preserveWhitespace: boolean;


  @ViewChild('input', {static: true}) input: QuillEditorComponent;
  @Input('value')
  _value: string;
  _config: QuangConfig;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  _classArray: string[] = [];
  _toolbar: any = {toolbar: []}

  modules: { [key: string]: string };
  private disabled = false; // used to store initial value before ViewInit

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              @Self() @Optional() public control: NgControl,
              @Optional() config: QuangConfig) {
    this.control && (this.control.valueAccessor = this);
    this._config = config;
  }

  ngOnInit() {
    if (this.helpMessage) {
      this._helpMessage = this.formName + '.' + this.control.name + '.help';
    }
    if (this.listBar) {
      this._toolbar.toolbar.push([{list: 'ordered'}, {list: 'bullet'}])
    }
    if (this.textTypeBar) {
      this._toolbar.toolbar.push(['bold', 'italic', 'underline', 'strike'])
      this._toolbar.toolbar.push(['blockquote', 'code-block'],)
    }
    if (this.textStyleBar) {
      this._toolbar.toolbar.push([{'color': []}, {'background': []}])
    }
    if (this.alignBar) {
      this._toolbar.toolbar.push([{align: []}])
    }
    if (this.fontBar) {
      this._toolbar.toolbar.push([{font: []}])
    }
    if (this.mediaBar) {
      this._toolbar.toolbar.push(['link', 'image', 'video'])
    }
    if (this.headerBar) {
      this._toolbar.toolbar.push([{header: [1, 2, 3, 4, 5, 6, false]}])
    }
    if (this.sizeBar) {
      this._toolbar.toolbar.push([{size: ['small', 'normal', 'large', 'huge']}])
    }
    if (this.indentBar) {
      this._toolbar.toolbar.push([{indent: '-1'}, {indent: '+1'}])
    }
    if (this.emojiBar) {
      this._toolbar['emoji-shortname'] = true
      this._toolbar['emoji-textarea'] = true
      this._toolbar['emoji-toolbar'] = true
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.editorElem.focus()
      }
    }, 0);
    this.observeValidate();
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
        this.value = this.returnHtml ? value.target.value.html : value.target.value.text;
      } else {
        this.value = value
      }
    } else {
      this.value = value
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.input.setDisabledState(isDisabled)
  }

  observeValidate() {
    this.control?.statusChanges
      .pipe(
        delay(0)
      )
      .subscribe(() => {
        if (this.control.dirty) {
          if (this.control.valid && this.successMessage) {
            this._successMessage = this.formName + '.' + this.control.name + '.valid';
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
}
