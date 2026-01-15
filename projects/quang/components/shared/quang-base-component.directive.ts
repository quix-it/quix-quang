import { AfterViewInit, DestroyRef, Directive, Injector, computed, inject, input, output, signal } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms'

import { Subscription } from 'rxjs'

import { ErrorData } from './ErrorData'
import { makeId } from './makeId'

@Directive()
export abstract class QuangBaseComponent<T = any> implements ControlValueAccessor, AfterViewInit {
  componentId = input<string>(makeId(10))

  isReadonly = input<boolean>(false)

  isReadonly$ = toObservable(this.isReadonly)

  componentTabIndex = input<number>(0)

  componentClass = input<string | string[]>('')

  componentLabel = input<string>('')

  componentPlaceholder = input<string>('')

  errorMap = input<ErrorData[]>([])

  _errorMessagesByKey = computed(
    () => new Map((this.errorMap() ?? []).map((errorData) => [errorData.error, errorData.message]))
  )

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

  _currentErrorMessageExtraData = signal<Record<string, any>>({})

  _ngControl = signal<NgControl | null>(null)

  _injector = signal<Injector>(inject(Injector))

  _statusChange$?: Subscription

  _valueChange$?: Subscription

  _eventsChange$?: Subscription

  getIsRequiredControl = computed(() => {
    const control = this._ngControl()?.control
    if (!control) {
      return false
    }

    return control.hasValidator(Validators.required) || control.hasValidator(Validators.requiredTrue)
  })

  onChange?: (value: T) => void

  onTouched?: () => void

  destroyRef = inject(DestroyRef)

  constructor() {
    toObservable(this.formControl)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((form) => {
        if (form) {
          this.setupFormControl()
        }
      })
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn
  }

  writeValue(value: T): void {
    this._value.set(value)
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
      this._statusChange$ = undefined
    }

    if (this._valueChange$) {
      this._valueChange$.unsubscribe()
      this._valueChange$ = undefined
    }

    if (this._eventsChange$) {
      this._eventsChange$.unsubscribe()
      this._eventsChange$ = undefined
    }

    this._ngControl.set(this._injector().get(NgControl))

    const control = this._ngControl()?.control

    this._statusChange$ = control?.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.checkFormErrors()
    })

    this._valueChange$ = control?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.checkFormErrors()
    })

    // `markAllAsTouched()` updates the control's `touched` state without emitting `statusChanges`.
    // Angular exposes an `events` stream that includes touched/pristine changes.
    this._eventsChange$ = (control as any)?.events?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.checkFormErrors()
    })

    this._isTouched.set(!!(control?.touched || control?.dirty))
    this._isDisabled.set(this.isReadonly() || control?.disabled || false)
    this.checkFormErrors()
  }

  onChangeIsReadonly = this.isReadonly$.pipe(takeUntilDestroyed()).subscribe((isReadonly: boolean) => {
    this._isDisabled.set(isReadonly || this._ngControl()?.disabled || false)
  })

  setDisabledState(isDisabled: boolean) {
    this._isDisabled.set(isDisabled)
  }

  checkFormErrors() {
    const control = this._ngControl()?.control
    this._isValid.set(control?.valid ?? false)
    this._isTouched.set(!!(control?.touched || control?.dirty))

    this._isRequired.set(
      !!control && (control.hasValidator(Validators.required) || control.hasValidator(Validators.requiredTrue))
    )

    const validationErrors = control?.errors

    let errorName = ''
    let errorMessage = ''
    let errorData = true

    for (const [validationErrorName, validationErrorData] of Object.entries(validationErrors ?? {})) {
      const relatedErrorMessage = this._errorMessagesByKey().get(validationErrorName)
      if (relatedErrorMessage) {
        errorName = validationErrorName
        errorMessage = relatedErrorMessage
        errorData = validationErrorData
      }
    }

    this._currentErrorMessage.set(errorMessage)
    this._currentErrorMessageExtraData.set({ [errorName]: errorData })
  }

  ngAfterViewInit(): void {
    this.setupFormControl()
  }
}
