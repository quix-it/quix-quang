import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common'
import { ChangeDetectionStrategy, Component, effect, forwardRef, input, signal } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@ngneat/transloco'

import { QuangBaseComponent, QuangOptionListComponent, SelectOption } from '@quix/quang/components/shared'

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
    },
    {
      provide: QuangOptionListComponent,
      multi: false
    }
  ],
  imports: [TranslocoPipe, NgIf, NgFor, NgClass, NgStyle, QuangOptionListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangSelectComponent extends QuangBaseComponent<string | number | string[] | number[] | null> {
  selectionMode = input<'single' | 'multiple'>('single')
  optionListMaxHeight = input<string>('200px')
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
  _showOptions = signal<boolean>(false)
  _selectedItems = this.optionListComponent._selectedItems

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

  constructor(private readonly optionListComponent: QuangOptionListComponent) {
    super()
  }

  changeOptionsVisibility(skipTimeout = false): void {
    if (this._showOptions()) {
      this._showOptions.set(skipTimeout)
    } else {
      this.showOptionVisibility()
    }
    console.log(this.selectOptions())
  }

  showOptionVisibility(): void {
    this.optionListComponent.showOptionVisibility()
  }

  hideOptionVisibility(): void {
    this.optionListComponent.hideOptionVisibility()
  }
}
