import { NgClass, NgFor, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, effect, forwardRef, input, signal } from '@angular/core'
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
export class QuangSelectComponent extends QuangBaseComponent<string | number | string[] | number[] | null> {
  selectionMode = input<'single' | 'multiple'>('single')
  /**
   * Set the mode to make the selection list disappear
   * Default: 'leave'
   * @default 'leave'
   */
  hideMode = input<'leave' | 'click'>('leave')
  selectOptions = input.required<SelectOption[]>()
  /**
   * Set the max height of the selection list before scrolling.
   * Default: 18rem
   * @default 18rem
   */
  selectionMaxHeight = input<string>('')

  _selectOptions = signal<SelectOption[]>([])

  translateValue = input<boolean>(true)
  nullOption = input<boolean>(true)
  _inputArrayChange = effect(
    () => {
      if (this.nullOption() && !this.selectOptions().find((x) => x.value === null)) {
        const nullValue: SelectOption[] = [{ label: '', value: null }]
        this._selectOptions.set(nullValue.concat(this.selectOptions()))
      } else if (!this.nullOption() && this.selectOptions().find((x) => x.value === null)) {
        this._selectOptions.set(this.selectOptions())
      }
    },
    {
      allowSignalWrites: true
    }
  )

  _showOptions = signal<boolean>(false)
  _optionHideTimeout = signal<any | undefined>(undefined)

  _selectedItems = computed(() => {
    const targetValue = this._value()
    return this.selectOptions().filter((x) => {
      if (Array.isArray(targetValue)) {
        return targetValue.some((k) => k === x.value)
      } else {
        return targetValue === x.value
      }
    })
  })

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
    if (this._optionHideTimeout()) {
      clearTimeout(this._optionHideTimeout())
    }
    this._optionHideTimeout.set(
      setTimeout(
        () => {
          this._showOptions.set(false)
        },
        skipTimeout ? 0 : 50
      )
    )
  }

  onSelectItem(item: SelectOption | null): void {
    if (this.selectionMode() === 'single') {
      this.onChangedHandler(item?.value ?? null)
      // this._selectedItems.set([item])
      this.hideOptionVisibility()
    } else {
      let values: string[] | number[] | null = this._value() as string[] | number[] | null
      if (values) {
        if (values.some((x) => x === item?.value)) {
          this.onChangedHandler(values.filter((x) => x !== item?.value) as string[] | number[])
        } else if (item) {
          this.onChangedHandler([...values, item.value] as string[] | number[])
        } else {
          this.onChangedHandler([...values] as string[] | number[])
        }
      } else {
        this.onChangedHandler(null)
      }
    }
  }

  getSelected(item: SelectOption): boolean {
    return this._selectedItems().some((x) => x.value === item.value)
  }
}
