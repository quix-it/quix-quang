import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoPipe } from '@ngneat/transloco'

export interface SelectOption {
  label: string
  value: string | number | null
}

@Component({
  selector: 'quang-option-list',
  standalone: true,
  imports: [NgStyle, NgIf, NgFor, NgClass, TranslocoPipe],
  templateUrl: './option-list.component.html',
  styleUrl: './option-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangOptionListComponent {
  selectionMode = input<'single' | 'multiple'>('single')
  optionListMaxHeight = input<string>('200px')
  selectOptions = input<SelectOption[]>([])
  _value = input<any>()
  _isDisabled = input<boolean>()
  componentClass = input<string | string[]>('')
  componentLabel = input<string>('')
  componentTabIndex = input<number>(0)
  translateValue = input<boolean>(true)

  changedHandler = output<any>()
  blurHandler = output<any>()

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

  showOptionVisibility(): void {
    if (this._optionHideTimeout()) {
      clearTimeout(this._optionHideTimeout())
      this._optionHideTimeout.set(null)
    }
    this._showOptions.set(true)
    console.log(this.selectOptions())
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
      this.changedHandler.emit(item?.value ?? null)
      // this._selectedItems.set([item])
      this.hideOptionVisibility()
    } else {
      let values: string[] | number[] | null = this._value() as string[] | number[] | null
      if (values) {
        if (values.some((x) => x === item?.value)) {
          this.changedHandler.emit(values.filter((x) => x !== item?.value) as string[] | number[])
        } else if (item) {
          this.changedHandler.emit([...values, item.value] as string[] | number[])
        } else {
          this.changedHandler.emit([...values] as string[] | number[])
        }
      } else {
        this.changedHandler.emit(null)
      }
    }
  }

  getSelected(item: SelectOption): boolean {
    return this._selectedItems().some((x) => x.value === item.value)
  }

  onBlurHandler(e: any): void {
    this.blurHandler.emit(e)
  }
}
