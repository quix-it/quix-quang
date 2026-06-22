import { NgClass, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, TemplateRef, computed, forwardRef, input } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTooltipDirective } from 'quang/overlay/tooltip'

import { QuangBaseComponent } from 'quang/components/shared'

export type RadioPosition = 'left' | 'right'

export interface QuangRadioOptionTemplateContext<T extends string | number | null = string | number | null> {
  $implicit: RadioOption<T>
  selected: boolean
  index: number
}

export interface RadioOption<T extends string | number | null = string | number | null> {
  value: T
  label?: string
  disabled?: boolean
  renderer?: TemplateRef<QuangRadioOptionTemplateContext<T>>
}

@Component({
  selector: 'quang-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangRadioGroupComponent),
      multi: true,
    },
  ],
  imports: [TranslocoPipe, NgClass, NgTemplateOutlet, QuangTooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuangRadioGroupComponent extends QuangBaseComponent<string | number | null> {
  radioOptions = input.required<RadioOption[]>()

  name = input<string>('')

  radioPosition = input<RadioPosition>('left')

  _radioName = computed(() => this.name() || this.componentId())

  getOptionId(index: number): string {
    return `${this.componentId()}-option-${index}`
  }

  isOptionDisabled(option: RadioOption): boolean {
    return this._isDisabled() || this.isReadonly() || !!option.disabled
  }

  getOptionLabel(option: RadioOption): string {
    if (option.label !== undefined) return option.label
    if (option.value === null) return ''
    return String(option.value)
  }

  onSelectOption(option: RadioOption): void {
    if (this.isOptionDisabled(option)) return
    this.onChangedHandler(option.value)
  }
}
