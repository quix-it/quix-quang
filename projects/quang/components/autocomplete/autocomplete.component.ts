import { NgClass, NgIf } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
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
      multi: true,
    },
    {
      provide: QuangOptionListComponent,
      multi: false,
    },
  ],
})
/**
 * Autocomplete component for providing suggestion options {@link SelectOption} as the user types.
 *
 * @usageNotes
 * This component displays a list of filtered options based on user input.
 * It allows users to select an option from the suggestions and emits the event `selectedOption` when an option is selected.
 *
 * `searchTextDebounce` is by default set to 300ms.
 */
export class QuangAutocompleteComponent extends QuangBaseComponent<string | number | null> {
  elementRef = inject(ElementRef)

  optionListMaxHeight = input<string>('200px')

  selectOptions = input.required<SelectOption[]>()

  translateValue = input<boolean>(true)

  /**
   * Only emits the value without saving it in ngControl
   */
  emitOnly = input<boolean>(false)

  _showOptions = signal<boolean | null>(null)

  _inputValue = signal<string | null>(null)

  _optionHideTimeout = signal<any | undefined>(undefined)

  inputValue$ = new Subject<string>()

  _filteredOptions = computed<SelectOption[]>(() => {
    const text = this._inputValue()
    return text?.length ? this.filterOptions(text) : this.selectOptions()
  })

  selectedOption = output<string | number | null>()

  searchTextChange = output<string>()

  searchTextDebounce = input<number>(300)

  constructor() {
    super()
    this.inputValue$
      .pipe(this._takeUntilDestroyed(), debounceTime(this.searchTextDebounce()), distinctUntilChanged())
      .subscribe((value) => {
        if (value !== this._inputValue()) this.searchTextChange.emit(value?.toString() || '')
        this._inputValue.set(value?.toString() || '')
      })
    toObservable(this._showOptions)
      .pipe(this._takeUntilDestroyed())
      .subscribe((data) => {
        if (!data && data !== null) {
          this.checkInputValue()
        }
      })
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

  onChangeInput(value: any): void {
    this.inputValue$.next(value.target?.value)
  }

  filterOptions(value: string): SelectOption[] {
    const options = this.selectOptions()
    return options.filter((x) => x.label.toLowerCase().includes(value.toLowerCase()))
  }

  override onChangedHandler(value: string | number | null): void {
    super.onChangedHandler(value)
    this.setInputValue()
  }

  onValueChange(value: string | number | null): void {
    this.onChangedHandler(value)
    this.hideOptionVisibility()
    this.selectedOption.emit(value)
  }

  checkInputValue(): void {
    const option = this.selectOptions().find((x) => x.label.toLowerCase() === this._inputValue()?.toLowerCase())
    if (option?.value === this._value()) return
    if (option) {
      this.onChangedHandler(option.value)
    } else {
      this.onChangedHandler(null)
    }
  }

  override writeValue(val: string | number | null): void {
    super.writeValue(val)
    this.setInputValue(true)
  }

  override onBlurHandler() {
    setTimeout(() => {
      this.hideOptionVisibility()
      if (!this._inputValue()?.length) this._ngControl()?.control?.patchValue(null)
      super.onBlurHandler()
    }, 500)
  }

  onBlurOptionList(event: any): void {
    if (event) this.hideOptionVisibility()
  }

  setInputValue(resetOnMiss = false) {
    this._inputValue.set(
      this.selectOptions().find((x) => x.value === this._value())?.label ?? (resetOnMiss ? null : this._inputValue())
    )
    this.inputValue$.next(this._inputValue() ?? '')
  }
}
