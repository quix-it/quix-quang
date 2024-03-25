import { NgClass } from '@angular/common'
import { Component, forwardRef, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms'

import { QuangTranslationModule } from '@quix/quang/translation'

@Component({
  selector: 'quang-input',
  standalone: true,
  imports: [QuangTranslationModule, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => QuangInputComponent),
      multi: true
    }
  ]
})
export class QuangInputComponent implements ControlValueAccessor {
  value = signal<string | number>('')
  isDisabled = signal<boolean>(false)

  onChange?: (value: string) => void
  onTouched?: () => void

  writeValue(val: string | number): void {
    this.value.set(val)
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled)
  }

  onChangedHandler($event: Event) {
    const inputElement = $event.target as HTMLInputElement
    this.value.set(inputElement.value)

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
}
