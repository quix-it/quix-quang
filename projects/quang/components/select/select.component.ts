import { NgClass, NgFor, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@ngneat/transloco'

import { QuangBaseComponent } from '@quix/quang/components/shared'

export interface SelectOption {
  label: string
  value: string | number
}

@Component({
  selector: 'quang-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangSelectComponent),
      multi: true
    }
  ],
  imports: [TranslocoPipe, NgIf, NgFor, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangSelectComponent extends QuangBaseComponent<string | number | string[] | number[]> {
  inputMode = input<'single' | 'multiple'>('single')
  inputArray = input.required<SelectOption[]>()
  translateValue = input<boolean>(true)
  nullOption = input<boolean>(true)

  _showOptions = signal<boolean>(false)
  _optionHideTimeout = signal<any | undefined>(undefined)
  _list = signal<SelectOption[]>([])

  constructor() {
    super()
  }

  changeOptionsVisibility(skipTimeout = false): void {
    if (this._showOptions()) {
      this._showOptions.set(skipTimeout)
    } else {
      this.showOptionVisibility()
    }
  }

  showOptionVisibility(): void {
    if (this._optionHideTimeout()) {
      clearTimeout(this._optionHideTimeout())
      this._optionHideTimeout.set(null)
    }
    this._showOptions.set(true)
  }

  hideOptionVisibility(skipTimeout = false): void {
    this._optionHideTimeout.set(
      setTimeout(
        () => {
          this._showOptions.set(false)
        },
        skipTimeout ? 0 : 200
      )
    )
  }

  getListText(val: string | number): string {
    const value = this._list().find((x) => x.value === val)
    if (value) {
      return value.label
    }
    return ''
  }

  onSelectItem(itemCode?: string | number): void {
    // if (itemCode !== null && itemCode !== undefined) {
    //   if (this._value.find((x) => x === itemCode)) {
    //     this._value = this._value?.filter((x) => x !== itemCode)
    //   } else {
    //     this._list()?.push(itemCode)
    //   }
    //   this.sortSelectedItems()
    // }
  }

  sortSelectedItems(): void {
    // if (this._value?.length > 1) {
    //   const valueMap = new Map()
    //   this._list().forEach((x, i) => {
    //     valueMap.set(x.value, i)
    //   })
    //   this._list().sort((a, b) => {
    //     return valueMap.get(a) - valueMap.get(b)
    //   })
    // }
    // this._value.set(this._list()?.map((x) => x.value))
  }

  getSelected(item: SelectOption): boolean {
    return this._list().some((x) => x.value === item.value)
  }

  returnSelectedValue(event: any): string | number {
    return event?.target?.value ?? (typeof this.inputArray()[0].value === 'string' ? '' : 0)
  }
}
