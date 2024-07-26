import { AfterViewInit, Directive, Injector, computed, inject, input, output, signal } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms'

import { Subscription } from 'rxjs'

import { ErrorData } from './ErrorData'
import { makeId } from './makeId'

@Directive()
export abstract class QuangBaseComponent<T = any> implements ControlValueAccessor, AfterViewInit {
  componentId = input<string>(makeId(10))
  isReadonly = input<boolean>(false)
  componentTabIndex = input<number>(0)
  componentClass = input<string | string[]>('')
  componentLabel = input<string>('')
  componentPlaceholder = input<string>('')
  errorMap = input<ErrorData[]>([])
  successMessage = input<string>('')
  helpMessage = input<string>('')
  formControl = input<FormControl>()
  componentBlur = output<void>()

  _value = signal<T | null>(null)
  _isRequired = signal<boolean>(false)
  _isDisabled = signal<boolean>(false)
  _isTouched = signal<boolean>(false)
  _isValid = signal<boolean>(false)
  _showSuccess = computed(() => this.successMessage() && this._isValid() && this._isTouched() && !this._isDisabled())
  _showErrors = computed(
    () => this.errorMap()?.length > 0 && !this._isValid() && this._isTouched() && !this._isDisabled()
  )
  _currentErrorMessage = signal<string>('')
  _currentErrorMessageExtraData = signal<{}>({})

  _ngControl = signal<NgControl | null>(null)
  _injector = signal<Injector>(inject(Injector))
  _takeUntilDestroyed = signal(takeUntilDestroyed())
  _statusChange$?: Subscription

  getIsRequiredControl = computed(
    () => !!(this._ngControl()?.control as any)?.['_rawValidators']?.find((x: any) => x.name === 'required')
  )

  onChange?: (value: T) => void
  onTouched?: () => void

  constructor() {
    toObservable(this.formControl)
      .pipe(this._takeUntilDestroyed())
      .subscribe((form) => {
        if (form) {
          this.setupFormControl()
        }
      })
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn
  }

  writeValue(val: T): void {
    this._value.set(val)
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = () => {
      this._isTouched.set(true)
      fn()
    }
  }

  onChangedEventHandler($event: Event) {
    const inputElement = $event.target as HTMLInputElement
    this.onChangedHandler(inputElement.value as T)
  }

  onChangedHandler(value: T) {
    this._value.set(value)
    if (this.onChange) {
      this.onChange(value)
    }

    if (this.onTouched) {
      this.onTouched()
    }
  }

  onBlurHandler() {
    if (this.onTouched) {
      this.onTouched()
    }
    this.componentBlur.emit()
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
    this._isDisabled.set(this.isReadonly() || this._ngControl()?.disabled || false)

    this.checkFormErrors()
  }

  setDisabledState(isDisabled: boolean) {
    this._isDisabled.set(isDisabled)
  }

  checkFormErrors() {
    this._isValid.set(this._ngControl()?.control?.valid ?? false)
    const controlErrors = this._ngControl()?.control?.errors

    if (controlErrors) {
      if (this.errorMap()?.length) {
        const targetError = this.errorMap()?.find(
          (error) =>
            !!Object.keys(controlErrors)?.find((targetError) => error.error.toLowerCase() === targetError.toLowerCase())
        )
        if (targetError) {
          this._currentErrorMessage.set(targetError.message ?? '')
          this._currentErrorMessageExtraData.set(targetError.error)
        } else {
          this._currentErrorMessage.set('')
          this._currentErrorMessageExtraData.set({})
        }
      }
    }
    if (controlErrors?.[Validators.required.name]) {
      this._isRequired.set(true)
    } else {
      this._isRequired.set(false)
    }
  }

  ngAfterViewInit(): void {
    this.setupFormControl()
  }
}
