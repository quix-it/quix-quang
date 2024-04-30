import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common'
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'

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

  onSelectItem(item: SelectOption | null): void {
    if (this.selectionMode() === 'single') {
      this.changedHandler.emit(item?.value ?? null)
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
    if (this.selectionMode() === 'single') {
      return this._value() === item.value
    }
    return this._value().some((x: number | string | null) => x === item.value)
  }

  onBlurHandler(e: any): void {
    this.blurHandler.emit(e)
  }
}
