import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { NgControl } from '@angular/forms'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'quix-input-url',
  templateUrl: './input-url.component.html',
  styles: ['']
})
export class InputUrlComponent implements OnInit {
  @Input() label: string;
  @Input() ariaLabel: string;
  @Input() customClass: string[];
  @Input() placeholder = '';
  @Input() id: string;
  @Input() formName: string;
  @Input() helpMessage: boolean;
  @Input() errorMessage: boolean;
  @Input() successMessage: boolean;
  @Input() min: number;
  @Input() max: number;
  @Input() pattern: string;
  @Input() autofocus: boolean;
  @Input() readonly: boolean;
  @Input() tabIndex: number;
  @Input() size: 'lg' | 'sm' = null
  @Input() autocomplete: string = 'off';

  _value: string;
  _successMessage: string;
  _errorMessage: string;
  _helpMessage: string;
  _requiredValue: any;
  onTouched: any = () => {
  }
  onChanged: any = () => {
  }

  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement>;

  constructor(private renderer: Renderer2,
    @Self() @Optional() public control: NgControl
  ) {
    this.control && (this.control.valueAccessor = this);
  }

  /*
   * create the key for the error message
   */
  ngOnInit() {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control.name}.help`;
    }
    if(!this.ariaLabel){
      this.ariaLabel = `Input ${this.label}`
    }
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
    ).subscribe((v) => {
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
