import { NgClass, NgIf } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Injector,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, Validators } from '@angular/forms'

import { Subscription } from 'rxjs'

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
  componentId = input<string>(baseRandomId)
  isReadonly = input<boolean>(false)
  componentTabIndex = input<number>(0)
  componentClass = input<string | string[]>('')
  componentLabel = input<string>('')
  componentPlaceholder = input<string>('')
  errorMap = input<{ error: string; message: string }[]>([])
  successMessage = input<string>('')
  helpMessage = input<string>('')
  componentType = input.required<string>()
  formControl = input<FormControl>()
  //endregion

  //region Computed signals
  _showSuccess = computed(() => this.successMessage() && this._isValid() && this._isTouched())
  _showErrors = computed(() => this.errorMap().length > 0 && !this._isValid() && this._isTouched())
  /*_currentErrorMessageSig = computed(() =>
    this._showErrorsSig()
      ? this.errorMapSig().find((error) => error.error === Object.keys(this._ngControl?.errors ?? {})[0])?.message
      : ''
  )*/ // <- questo non funziona come pensavo
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
  _value = signal<string | number>('')
  _isRequired = signal<boolean>(false)
  _isaDisabled = signal<boolean>(false)
  _isTouched = signal<boolean>(false)
  _isValid = signal<boolean>(false)
  _currentErrorMessage = signal<string>('')
  _currentErrorMessageExtraData = signal<{}>({})

  _formControlEffect = effect(
    () => {
      if (this.formControl()) {
        this.setupFormControl()
      }
    },
    { allowSignalWrites: true }
  )
  //endregion

  //region Private properties
  _ngControl = signal<NgControl | null>(null)
  _injector = signal<Injector>(inject(Injector))
  _takeUntilDestroyed = signal(takeUntilDestroyed())
  _statusChange$?: Subscription
  //endregion

  onChange?: (value: string) => void
  onTouched?: () => void

  ngAfterViewInit(): void {
    this.setupFormControl()
  }

  writeValue(val: string | number): void {
    this._value.set(val)
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = () => {
      this._isTouched.set(true)
      fn()
    }
  }

  onChangedHandler($event: Event) {
    const inputElement = $event.target as HTMLInputElement
    this._value.set(inputElement.value)

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

  setupFormControl() {
    if (this._statusChange$) {
      this._statusChange$.unsubscribe()
    }

    this._ngControl.set(this._injector().get(NgControl))

    this._statusChange$ = this._ngControl()
      ?.control?.statusChanges.pipe(this._takeUntilDestroyed())
      .subscribe(() => {
        this.checkFormErrors()
      })

    this._isTouched.set(this._ngControl()?.touched ?? false)
    this._isaDisabled.set(this._ngControl()?.disabled ?? false)

    this.checkFormErrors()
  }

  setDisabledState(isDisabled: boolean) {
    this._isaDisabled.set(isDisabled)
  }

  checkFormErrors() {
    this._isValid.set(this._ngControl()?.control?.valid ?? false)
    const controlErrors = this._ngControl()?.control?.errors
    if (controlErrors) {
      const targetErrorKey = Object.keys(controlErrors)[0]
      this._currentErrorMessage.set(
        this.errorMap().find((error) => error.error.toLowerCase() === targetErrorKey.toLowerCase())?.message ?? ''
      )
      this._currentErrorMessageExtraData.set(controlErrors[targetErrorKey])
    }
    if (controlErrors?.[Validators.required.name]) {
      this._isRequired.set(true)
    } else {
      this._isRequired.set(false)
    }
  }
}
