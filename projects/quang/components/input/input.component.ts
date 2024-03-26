import { NgClass, NgIf } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Injector,
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangInputComponent implements ControlValueAccessor, AfterViewInit {
  //region Input signals
  customIdSig = input<string>(baseRandomId)
  readonlySig = input<boolean>(false)
  tabIndexSig = input<number>(0)
  classSig = input<string | string[]>('')
  labelSig = input<string>('')
  placeholderSig = input<string>('')
  errorMapSig = input<{ error?: string; message?: string }[]>([])
  successMessageSig = input<string>('')
  helpMessageSig = input<string>('')
  typeSig = input.required<string>()
  //endregion

  //region Computed signals
  _customIdSig = computed(() => 'quang-' + this.customIdSig())
  _showSuccessSig = computed(() => this.successMessageSig() && this._isValidSig() && this._isTouchedSig())
  _showErrorsSig = computed(() => this.errorMapSig().length > 0 && !this._isValidSig() && this._isTouchedSig())
  _currentErrorMessageSig = computed(() =>
    this._showErrorsSig()
      ? this.errorMapSig().find((error) => error.error === Object.keys(this._ngControl?.errors ?? {})[0])?.message
      : ''
  )
  /*_showSuccessSig = computed(() => this.successMessageSig() && this._ngControl?.control?.valid && this._isTouchedSig()) // <- questo funziona in parte
        console.log(
        'check _showSuccessSig',
        this.successMessageSig() && this._ngControl?.control?.valid && this._isTouchedSig(),
        this._showSuccessSig()
      )
   */
  //_isControlInteractedSig = computed(() => this._ngControl?.dirty || this._ngControl?.touched) // <- questo non funziona
  //_requiredSig = computed(() => this._ngControl?.control?.hasValidator(Validators.required)) // <- questo non funziona
  // _isControlDisabledSig = computed(() => this._ngControl?.control?.disabled) // <- questo non funziona
  //endregion

  //region Private Signals
  _valueSig = signal<string | number>('')
  _isRequiredSig = signal<boolean>(false)
  _isaDisabledSig = signal<boolean>(false)
  _isTouchedSig = signal<boolean>(false)
  _isValidSig = signal<boolean>(false)

  //endregion

  //region Private properties
  _ngControl?: NgControl
  _injector = inject(Injector)
  //endregion

  onChange?: (value: string) => void
  onTouched?: () => void

  writeValue(val: string | number): void {
    this._valueSig.set(val)
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = () => {
      this._isTouchedSig.set(true)
      fn()
    }
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

  ngAfterViewInit(): void {
    this._ngControl = this._injector.get(NgControl)

    console.log('this._ngControl', this._ngControl.control)

    this._ngControl.control?.statusChanges.subscribe(() => {
      this.checkFormErrors()
    })

    this.checkFormErrors()
  }

  setDisabledState(isDisabled: boolean) {
    this._isaDisabledSig.set(isDisabled)
  }

  checkFormErrors() {
    const errors = this._ngControl?.control?.errors
    if (errors) {
      this._isValidSig.set(false)
    } else {
      this._isValidSig.set(true)
      this._isRequiredSig.set(false)
      return
    }
    if (errors[Validators.required.name]) {
      this._isRequiredSig.set(true)
    } else {
      this._isRequiredSig.set(false)
    }
  }
}
