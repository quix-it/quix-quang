import { NgClass } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs'

import {
  OptionListParentType,
  QuangBaseComponent,
  QuangOptionListComponent,
  SelectOption,
} from 'quang/components/shared'

@Component({
  selector: 'quang-autocomplete',
  imports: [TranslocoPipe, NgClass, QuangOptionListComponent],
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
export class QuangAutocompleteComponent extends QuangBaseComponent<string | number | string[] | number[]> {
  // the form can't be a random text but must be one of the options if this is false
  syncFormWithText = input<boolean>(false)

  optionListMaxHeight = input<string>('200px')

  selectOptions = input.required<SelectOption[]>()

  translateValue = input<boolean>(true)

  scrollBehaviorOnOpen = input<ScrollBehavior>('smooth')

  /**
   * Only emits the value without saving it in ngControl
   */
  emitOnly = input<boolean>(false)

  multiple = input<boolean>(false)

  optionList = viewChild<QuangOptionListComponent>('optionList')

  _showOptions = signal<boolean | null>(null)

  _inputValue = signal<string>('')

  _optionHideTimeout = signal<any | undefined>(undefined)

  _chipList = signal<string[]>([])

  _selectedOptions = signal<SelectOption[]>([])

  inputValue$ = new Subject<string>()

  selectOptionsChange = toObservable(this.selectOptions)
    .pipe(takeUntilDestroyed())
    .subscribe(() => {
      if (!this._inputValue()) {
        this.setInputValue()
      }
    })

  _filteredOptions = computed<SelectOption[]>(() => {
    const text = this._inputValue()
    if (this.multiple()) {
      return this.filterOptions(text).filter((x) => !this._chipList().some((chip) => chip === x.value))
    } else {
      return text?.length ? this.filterOptions(text) : this.selectOptions()
    }
  })

  selectedOption = output<string | number | null>()

  searchTextChange = output<string>()

  searchTextDebounce = input<number>(300)

  internalFilterOptions = input<boolean>(true)

  readonly ParentType = OptionListParentType.AUTOCOMPLETE

  formValueChange$: Subscription | undefined = undefined

  private readonly selectInput = viewChild<HTMLInputElement>('selectInput')

  constructor() {
    super()
    this.inputValue$
      .pipe(takeUntilDestroyed(), debounceTime(this.searchTextDebounce()), distinctUntilChanged())
      .subscribe((value) => {
        if (value !== this._inputValue()) {
          this.searchTextChange.emit(value?.toString() || '')
          if (this.syncFormWithText()) {
            this.onValueChange(value, false)
          }
        }
        this._inputValue.set(value?.toString() || '')
        if (!this._inputValue()?.length && !this.emitOnly() && !this.multiple()) {
          this._ngControl()?.control?.patchValue(null)
        }
      })
    toObservable(this._showOptions)
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        if (!data && data !== null) {
          this.checkInputValue()
        }
      })
  }

  override setupFormControl(): void {
    super.setupFormControl()
    const formControl = this._ngControl()?.control
    if (this.formValueChange$) {
      this.formValueChange$.unsubscribe()
      this.formValueChange$ = undefined
    }
    if (formControl) {
      this.formValueChange$ = formControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
        if (!this.syncFormWithText() && !value) {
          this._inputValue.set('')
        }
      })
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

  onChangeInput(value: any): void {
    this.showOptionVisibility()
    this.inputValue$.next(value.target?.value)
  }

  filterOptions(value: string): SelectOption[] {
    const options = this.selectOptions()
    if (this.internalFilterOptions()) {
      return options.filter((x) => x.label.toLowerCase().includes(value.toLowerCase()))
    }
    return options
  }

  override onChangedHandler(value: string | number | string[] | number[]): void {
    super.onChangedHandler(value)
    this.setInputValue()
  }

  onValueChange(value: string | number, hideOptions = true): void {
    if (this.multiple()) {
      this.onSelectValue(value)
      this.onChangedHandler(this._chipList())
    } else {
      this.onChangedHandler(value)
      if (hideOptions) {
        this.hideOptionVisibility()
      }
      this.selectedOption.emit(value)
    }
  }

  checkInputValue(): void {
    const option = this.selectOptions().find((x) => x.label.toLowerCase() === this._inputValue()?.toLowerCase())
    if (!this.multiple()) {
      if (option?.value === this._value()) return
      if (option) {
        this.onChangedHandler(option.value ?? '')
      } else if (!this.syncFormWithText()) {
        this.onChangedHandler('')
      }
    }
  }

  override writeValue(val: string | number | string[] | number[]): void {
    super.writeValue(val)
    this.setInputValue(true)
    if (Array.isArray(val)) {
      this._chipList.set(val as any[])
    }
  }

  onBlurInput(event: FocusEvent) {
    if ((event?.relatedTarget as HTMLDivElement)?.id !== this.optionList()?.optionListContainer()?.nativeElement?.id)
      this.onBlurHandler()
  }

  override onBlurHandler() {
    setTimeout(() => {
      this.hideOptionVisibility()
      if (!this._inputValue()?.length && !this.emitOnly()) {
        this._ngControl()?.control?.patchValue(null)
      }
      super.onBlurHandler()
    }, 100)
  }

  onBlurOptionList(event: any): void {
    if (event) this.hideOptionVisibility()
  }

  setInputValue(resetOnMiss = false) {
    this._inputValue.set(
      this.selectOptions().find((x) => x.value === this._value())?.label ?? (resetOnMiss ? '' : this._inputValue())
    )
    if (!this.syncFormWithText()) this.inputValue$.next(this._inputValue() ?? '')
  }

  getDescription(chip: any): string {
    const valueChip = this.selectOptions().find((x) => x.value === chip)
    return valueChip ? valueChip.label.toString() : ''
  }

  onSelectValue(value: any): void {
    this._inputValue.set('')
    const newChip = this.selectOptions().find((x) => x.value === value)
    if (newChip) {
      this.createChipList(newChip)
      this._selectedOptions.update((list) => [...list, newChip])
    }
  }

  /**
   * remove chip from chips list
   * @param chipValue chip to delete
   */
  deleteChip(chipValue: any): void {
    const stringChipValue = chipValue?.toString()
    const i = this._chipList()?.findIndex((x) => x.toString() === stringChipValue)
    if (i >= 0) {
      const currentList = this._chipList()
      if (Array.isArray(currentList) && currentList.length > 0) {
        this._chipList.update((list) => (list as string[]).filter((_, index) => index !== i))
        this.onChangedHandler(this._chipList())
      }
    }
    // this.onChanged(this._chipList())
  }

  createChipList(chip: any): void {
    if (chip) {
      this._chipList.update((list) => [...list, chip.value])
    }
  }
}
