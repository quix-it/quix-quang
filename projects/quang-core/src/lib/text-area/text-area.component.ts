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
} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {delay} from 'rxjs/operators';


@Component({
  selector: 'quix-text-area',
  templateUrl: './text-area.component.html',
  styles: ['']
})
export class TextAreaComponent implements ControlValueAccessor, AfterViewInit, OnInit, OnChanges {
  @Input() label: string;
  @Input() placeholder = '';
  @Input() id: string;
  @Input() successMessage: boolean;
  @Input() errorMessage: boolean;
  @Input() helpMessage: boolean;
  @Input() min: number;
  @Input() max = 255;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() autoResize: boolean;
  @Input() rows: number;
  @Input() cols: number;
  @Input() tabIndex: number;
  @Input() ariaLabel: string;
  @Input() formName: string;
  @Input() resizeMode: 'none' | 'auto' | 'vertical' | 'horizzontal' = 'auto';
  @Input() customClass: string[] = [];

  _value: string;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  onTouched: any = () => {
  }
  onChanged: any = () => {
  }

  @ViewChild('input', {static: true}) input: ElementRef<HTMLTextAreaElement>;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private renderer: Renderer2,
              @Self() @Optional() public control: NgControl,
             ) {
    this.control && (this.control.valueAccessor = this);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input.nativeElement.focus();
      }
    }, 0);
    if (this.autoResize) {
      this.autosize.resizeToFitContent(true);
    }
    this.observeValidate();
  }

  /**
   * create the key for the help message
   */
  ngOnInit() {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control.name}.help`;
    }
    if(!this.ariaLabel){
      this.ariaLabel = `Input ${this.label}`
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus && this.input) {
      this.input.nativeElement.focus();
    }
  }

  // We implement this method to keep a reference to the onChange
  // callback function passed by the forms API
  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  // We implement this method to keep a reference to the onTouched
  // callback function passed by the forms API
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChangedHandler(e: Event) {
    this._value = (e.target as HTMLInputElement).value
    this.onTouched()
    this.onChanged(this._value)
  }

  // This is a basic setter that the forms API is going to use
  writeValue(value) {
    this._value = value
    this.renderer.setProperty(this.input?.nativeElement, 'value', value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled);
  }

  observeValidate() {
    this.control?.statusChanges.pipe(
      delay(0)
    ).subscribe(() => {
      if (this.control.dirty) {
        if (this.control.valid && this.successMessage) {
          this._successMessage = `${this.formName}.${this.control.name}.valid`;
        }
        if (this.control.invalid && this.errorMessage) {
          for (const error in this.control.errors) {
            if (this.control.errors.hasOwnProperty(error)) {
              if (this.control.errors[error]) {
                this._errorMessage = `${this.formName}.${this.control.name}.${error}`;
                if (error === 'minlength' || error === 'maxlength') {
                  this._requiredValue = this.control.errors[error].requiredLength;
                } else {
                  this._requiredValue = this.control.errors[error].requiredValue;
                }
              }
            }
          }
        }
      }
    });
  }
}
