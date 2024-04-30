import { NgClass, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@ngneat/transloco'
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs'

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
  // selectionMode = input<'single' | 'multiple'>('single')
  optionListMaxHeight = input<string>('200px')
  selectOptions = input.required<SelectOption[]>()
  translateValue = input<boolean>(true)

  _showOptions = signal<boolean>(false)
  _optionHideTimeout = signal<any | undefined>(undefined)

  _inputValue = signal<string>('')
  inputValue$ = new Subject<string>()
  _val = computed(() => {
    // if (this.selectionMode() === 'single') {
    return this.selectOptions().find((x) => x.value === this._value())?.label ?? ''
    // }
    // if (this.selectionMode() === 'multiple') {
    //   const value = this._value()
    //   if (Array.isArray(value))
    //     return this.selectOptions()
    //       .filter((x: SelectOption) => value.some((v) => v === x.value))
    //       .map((x) => x.label)
    //       .join(', ')
    // }
    // return ''
  })

  _filteredOptions = computed<SelectOption[]>(() => {
    const text = this._inputValue()
    return text?.length ? this.filterOptions(text) : this.selectOptions()
  })

  constructor() {
    super()
    this.inputValue$.pipe(this._takeUntilDestroyed(), debounceTime(300), distinctUntilChanged()).subscribe((value) => {
      console.log('value', value)
      this._inputValue.set(value ? (value as string) : '')
    })
  }

  changeOptionsVisibility(skipTimeout = false, event: Event): void {
    if (this.isReadonly()) return
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
    this.inputValue$.next(value.target?.value)
  }

  filterOptions(value: string): SelectOption[] {
    const options = this.selectOptions()
    return options.filter((x) => {
      const labels = x.label.toLowerCase().split(' ')
      const inputs = value.toLowerCase().split(' ')
      return inputs.find((input) => labels.some((label) => label.includes(input)))
    })
  }
}
