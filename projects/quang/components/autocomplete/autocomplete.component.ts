import { NgClass, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@ngneat/transloco'
import { debounceTime, of } from 'rxjs'

import { QuangBaseComponent, QuangOptionListComponent, SelectOption } from '@quix/quang/components/shared'

@Component({
  selector: 'quang-autocomplete',
  standalone: true,
  imports: [TranslocoPipe, NgClass, NgIf, QuangOptionListComponent],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangAutocompleteComponent),
      multi: true
    },
    {
      provide: QuangOptionListComponent,
      multi: false
    }
  ]
})
export class QuangAutocompleteComponent extends QuangBaseComponent<string | number | string[] | number[] | null> {
  selectionMode = input<'single' | 'multiple'>('single')
  optionListMaxHeight = input<string>('200px')
  selectOptions = input.required<SelectOption[]>()
  translateValue = input<boolean>(true)

  _showOptions = signal<boolean>(false)
  _optionHideTimeout = signal<any | undefined>(undefined)

  _inputValue = signal<string>('')

  _filteredOptions = computed<SelectOption[]>(() => {
    const text = this._inputValue()
    return text?.length ? this.filterOptions(text) : this.selectOptions()
  })
  constructor() {
    super()
  }

  changeOptionsVisibility(skipTimeout = false, event: Event): void {
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
    setTimeout(() => {
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
    }, 100)
  }

  onChangeInput(value: any): void {
    of(value)
      .pipe(debounceTime(300))
      .subscribe((val) => {
        this._inputValue.set(value.target?.value)
      })
  }

  filterOptions(value: string): SelectOption[] {
    const options = this.selectOptions()
    const text = value.toLowerCase()
    return options.filter((x) => x.label.toLowerCase().includes(text))
  }
}
