import { NgClass, NgIf } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  computed,
  forwardRef,
  inject,
  input,
  signal
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, Validators } from '@angular/forms'

import { QuangTranslationModule } from '@quix/quang/translation'

import { baseRandomId } from '../makeId'

@Component({
  selector: 'quang-input',
  standalone: true,
  imports: [QuangTranslationModule, NgClass, NgIf],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangInputComponent),
      multi: true
    }
    /*{
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => QuangInputComponent),
      multi: true
    }*/
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangInputComponent implements ControlValueAccessor, OnInit {
  _valueSig = signal<string | number>('')
  customIdSig = input<string>(baseRandomId)
  readonlySig = input<boolean>(false)
  tabIndexSig = input<number>(0)
  classSig = input<string | string[]>('')
  labelSig = input<string>('')
  placeholderSig = input<string>('')
  errorMapSig = input<Map<string, string>>(new Map())
  successMessageSig = input<string>('')
  helpMessageSig = input<string>('')
  typeSig = input.required<string>()

  _customIdSig = computed(() => 'quang-' + this.customIdSig())

  _ngControl?: NgControl
  _injector = inject(Injector)
  _requiredSig = computed(() => this._ngControl?.control?.hasValidator(Validators.required))
  _isControlInteractedSig = computed(() => this._ngControl?.dirty || this._ngControl?.touched)
  _showErrorsSig = computed(
    () => this.errorMapSig().size > 0 && this._ngControl?.invalid && this._isControlInteractedSig()
  )
  _showSuccessSig = computed(() => this.successMessageSig() && this._ngControl?.valid && this._isControlInteractedSig())
  _isControlDisabledSig = computed(() => this._ngControl?.control?.disabled)
  _currentErrorMessageSig = computed(() =>
    this._ngControl?.errors ? this.errorMapSig().get(Object.keys(this._ngControl.errors)[0]) : ''
  )
  onChange?: (value: string) => void
  onTouched?: () => void

  writeValue(val: string | number): void {
    this._valueSig.set(val)
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  onChangedHandler($event: Event) {
    const inputElement = $event.target as HTMLInputElement
    this._valueSig.set(inputElement.value)

    if (this.onChange) {
      this.onChange(inputElement.value)
    }

    this.onBlurHandler()
  }

  onBlurHandler() {
    if (this.onTouched) {
      this.onTouched()
    }
  }

  ngOnInit(): void {
    this._ngControl = this._injector.get(NgControl)
  }
}
