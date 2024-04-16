import { NgClass, NgFor, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit, forwardRef, input, signal } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@ngneat/transloco'

import { QuangBaseComponent } from '@quix/quang/components/shared'

export interface SelectOption {
  label: string
  value: string | number | null
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
export class QuangSelectComponent
  extends QuangBaseComponent<string | number | string[] | number[] | null>
  implements OnInit
{
  inputMode = input<'single' | 'multiple'>('single')
  inputArray = input.required<SelectOption[]>()
  translateValue = input<boolean>(true)
  nullOption = input<boolean>(true)

  _showOptions = signal<boolean>(false)
  _optionHideTimeout = signal<any | undefined>(undefined)
  _selectedItems = signal<SelectOption[]>([])

  constructor() {
    super()
  }

  ngOnInit(): void {
    if (this.nullOption()) this.inputArray().unshift({ label: '', value: null })
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
        skipTimeout ? 0 : 50
      )
    )
  }

  getListText(val: SelectOption): string {
    const value = this._selectedItems().find((x) => x.value === val.value)
    if (value) {
      return value.label
    }
    return ''
  }

  test(input: any): void {
    console.log(input)
  }

  onSelectItem(item: SelectOption): void {
    if (item !== null && item !== undefined) {
      if (this.inputMode() === 'single') {
        this._value.set(item.value)
        this._selectedItems.set([item])
        this.hideOptionVisibility()
      } else {
        if (item !== null) {
          this._selectedItems.update((selectedItems) => {
            if (this._selectedItems().some((x) => x.value === item.value)) {
              return selectedItems.filter((x) => x.value !== item.value)
            } else {
              return [...selectedItems, item]
            }
          })
        }
        this._value.set(this._selectedItems().map((x) => x.value) as string[] | number[])
        this.sortSelectedItems()
      }
      this.onChangedHandler(this._value())
    }
  }

  sortSelectedItems(): void {
    if (this._selectedItems()?.length > 1) {
      if (this._selectedItems()[0].label === '') {
        this._selectedItems().shift()
      }
      this._selectedItems.set(
        this._selectedItems().sort((a, b) => {
          return a.label.localeCompare(b.label)
        })
      )
    }
  }

  getSelected(item: SelectOption): boolean {
    return this._selectedItems().some((x) => x.value === item.value)
  }

  returnSelectedValue(event: any): string | number {
    return event?.target?.value ?? (typeof this.inputArray()[0].value === 'string' ? '' : 0)
  }
}
