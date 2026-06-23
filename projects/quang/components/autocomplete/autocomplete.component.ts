import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  forwardRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTooltipDirective } from 'quang/overlay/tooltip'
import { Subscription } from 'rxjs'

import {
  OptionListParentType,
  QuangBaseComponent,
  QuangOptionListComponent,
  SelectOption,
} from 'quang/components/shared'

/**
 * Autocomplete component for providing suggestion options {@link SelectOption} as the user types.
 *
 * @usageNotes
 * This component displays a list of filtered options based on user input.
 * It allows users to select an option from the suggestions and emits the event `selectedOption` when an option is selected.
 *
 * `searchTextDebounce` is by default set to 300ms.
 */
@Component({
  selector: 'quang-autocomplete',
  imports: [TranslocoPipe, NgClass, NgTemplateOutlet, QuangOptionListComponent, NgStyle, QuangTooltipDirective],
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
export class QuangAutocompleteComponent extends QuangBaseComponent<string | number | string[] | number[] | null> {
  // ============================================
  // INPUTS - Configuration properties
  // ============================================

  /**
   * The list of options to display in the autocomplete dropdown.
   */
  selectOptions = input.required<SelectOption[]>()

  /**
   * When true, allows any text input as a valid form value, not just option values.
   * The form value will sync with whatever text the user types.
   * When false (default), the form value must match one of the option values.
   * @default false
   */
  allowFreeText = input<boolean>(false)

  /**
   * When true and allowFreeText is false, automatically selects an option if the user's
   * input text matches an option's label exactly (case-insensitive, trimmed).
   * This provides a better UX by auto-selecting when users type a complete option label.
   * @default true
   */
  autoSelectOnExactMatch = input<boolean>(true)

  /**
   * When true, updates the form value as the user types (after debounce).
   * When false (default), the form value is only updated when:
   * - User selects an option from the dropdown
   * - User stops typing and the input loses focus (blur)
   *
   * Note: when `allowFreeText` (or the deprecated `syncFormWithText`) is true,
   * the input text IS the form value, so the value is always synced while typing
   * regardless of this flag.
   * @default false
   */
  updateValueOnType = input<boolean>(false)

  /**
   * Whether the form value can be any text or must match one of the options.
   * When true, the form value syncs with the input text.
   * When false (default), the form value must be one of the option values.
   * @default false
   * @deprecated Use `allowFreeText` instead. This input will be removed in a future version.
   */
  syncFormWithText = input<boolean>(false)

  /**
   * Maximum height of the option list before scrolling.
   * @default '200px'
   */
  optionListMaxHeight = input<string>('200px')

  /**
   * Whether to translate option labels.
   * @default true
   */
  translateValue = input<boolean>(true)

  /**
   * Scroll behavior when the option list opens.
   * @default 'smooth'
   */
  scrollBehaviorOnOpen = input<ScrollBehavior>('smooth')

  /**
   * When true, only emits the value without saving it to ngControl.
   * @default false
   */
  emitOnly = input<boolean>(false)

  /**
   * Enable multiple selection mode with chips.
   * @default false
   */
  multiple = input<boolean>(false)

  /**
   * Maximum length in characters for chip display text.
   * When set, chips will be truncated and show a tooltip with full text.
   * @default 0 (no limit)
   */
  chipMaxLength = input<number>(0)

  /**
   * Layout direction for chips in multiple selection mode.
   * @default 'vertical'
   */
  multiSelectDisplayMode = input<'vertical' | 'horizontal'>('vertical')

  /**
   * Position of chips relative to the input in multiple selection mode.
   * - 'top': Chips are displayed above the input (default)
   * - 'bottom': Chips are displayed below the input
   * @default 'top'
   */
  chipsPosition = input<'top' | 'bottom'>('top')

  /**
   * Debounce time in milliseconds for search text changes.
   * @default 300
   */
  searchTextDebounce = input<number>(300)

  /**
   * Whether to filter options internally based on input text.
   * When false, filtering should be handled externally via searchTextChange event.
   * @default true
   */
  internalFilterOptions = input<boolean>(true)

  // ============================================
  // OUTPUTS - Event emitters
  // ============================================

  /**
   * Emitted when an option is selected.
   * Emits the selected option's value, or null when cleared.
   */
  selectedOption = output<string | number | null>()

  /**
   * Emitted when the search text changes (after debounce).
   * Useful for external filtering or API calls.
   */
  searchTextChange = output<string>()

  // ============================================
  // VIEW CHILDREN - Template references
  // ============================================

  /** Reference to the option list component */
  protected readonly optionList = viewChild<QuangOptionListComponent>('optionList')

  /** Reference to the input element */
  private readonly selectInput = viewChild<ElementRef<HTMLInputElement>>('selectInput')

  /** Reference to the chip container element */
  private readonly chipContainer = viewChild<ElementRef<HTMLDivElement>>('chipContainer')

  /** Reference to the main autocomplete container */
  private readonly autocompleteContainer = viewChild<ElementRef<HTMLDivElement>>('autocompleteContainer')

  // ============================================
  // PUBLIC STATE - Used in template
  // ============================================

  /** Constant for option list parent type */
  readonly ParentType = OptionListParentType.AUTOCOMPLETE

  /** Height of the input element (used for positioning) */
  readonly inputHeight = signal<number>(0)

  /**
   * The display text for the input field.
   * - When searching: shows what the user typed
   * - When allowFreeText/syncFormWithText is true and no matching option: shows the raw value
   * - When not searching: shows the selected option's label (derived from _value)
   */
  readonly _inputValue = computed<string>(() => {
    if (this._isSearching()) {
      return this._userSearchText()
    }
    // Derive display text from _value by finding the matching option
    const value = this._value()
    if (value === null || value === undefined || value === '' || Array.isArray(value)) {
      return ''
    }
    const option = this.selectOptions().find((x) => x.value === value)
    // When free text is allowed and no matching option found, display the value itself
    // (since the value IS the text the user typed)
    if (!option && this._allowFreeTextInternal()) {
      return String(value)
    }
    return option?.label ?? ''
  })

  /** Whether the option list is currently visible */
  readonly _showOptions = signal<boolean | null>(null)

  /** List of selected chip values (for multiple mode) */
  readonly _chipList = signal<string[]>([])

  /** List of selected option objects (for multiple mode) */
  readonly _selectedOptions = signal<SelectOption[]>([])

  /** Filtered options based on search text and chip selection */
  readonly _filteredOptions = computed<SelectOption[]>(() => {
    const searchText = this._isSearching() ? this._userSearchText() : ''
    if (this.multiple()) {
      return this.filterOptions(searchText).filter(
        (x) => !this._chipList().some((chip) => chip?.toString() === x.value?.toString())
      )
    }
    return searchText?.length ? this.filterOptions(searchText) : this.selectOptions()
  })

  /**
   * The value to use for highlighting in the option list.
   * When searching: shows the matched option (if any) based on exact label match
   * When not searching: shows the current form value
   * This keeps highlighting in sync with what will be selected on blur.
   */
  readonly _highlightedValue = computed<string | number | string[] | number[] | null>(() => {
    if (this._isSearching() && !this.multiple()) {
      const searchText = this._userSearchText()
      if (!searchText?.trim()) {
        // If search text is empty, don't highlight anything
        return null
      }
      // Find exact match for highlighting
      const matchingOption = this.findMatchingOption(searchText)
      if (matchingOption && this.autoSelectOnExactMatch()) {
        return matchingOption.value
      }
      // If free text is allowed, don't highlight any option
      // (the typed text itself will be the value)
      return null
    }
    // When not searching, use the current value
    return this._value()
  })

  // ============================================
  // PROTECTED STATE - Internal but accessible to subclasses
  // ============================================

  /** Whether the user is actively typing/searching */
  protected readonly _isSearching = signal<boolean>(false)

  /** The text the user is currently typing while searching */
  protected readonly _userSearchText = signal<string>('')

  /**
   * Internal computed that returns true if free text input is allowed.
   * Combines both `allowFreeText` and deprecated `syncFormWithText` inputs.
   */
  protected readonly _allowFreeTextInternal = computed<boolean>(() => {
    return this.allowFreeText() || this.syncFormWithText()
  })

  /**
   * Finds an option whose label exactly matches the given text (case-insensitive, trimmed).
   * @param text The text to match against option labels
   * @returns The matching option, or undefined if no match
   */
  protected findMatchingOption(text: string | null | undefined): SelectOption | undefined {
    if (!text) return undefined
    const searchTextLower = text.trim().toLowerCase()
    return this.selectOptions().find((x) => x.label.trim().toLowerCase() === searchTextLower)
  }

  // ============================================
  // PRIVATE STATE - Internal implementation details
  // ============================================

  /** Timer for search text debounce */
  private _searchDebounceTimer: ReturnType<typeof setTimeout> | null = null

  /** Last emitted search text (for distinctUntilChanged behavior) */
  private _lastEmittedSearchText: string | null = null

  /** Whether the component has been destroyed */
  private _isDestroyed = false

  /** Subscription to form value changes */
  private formValueChangeSubscription: Subscription | undefined = undefined

  // ============================================
  // EFFECTS - Reactive side effects
  // ============================================

  /** Effect to handle input element setup and keyboard events */
  private readonly onChangeSelectInputEffect = effect(() => {
    const selectInput = this.selectInput()
    if (!selectInput) return
    this.inputHeight.set(selectInput.nativeElement.getBoundingClientRect().height)
    selectInput.nativeElement.addEventListener('keydown', (e: KeyboardEvent) => {
      this.handleInputKeydown(e, selectInput.nativeElement)
    })
  })

  /** Subscription to options changes */
  private readonly selectOptionsChangeSubscription = toObservable(this.selectOptions)
    .pipe(takeUntilDestroyed())
    .subscribe(() => {
      this.handleOptionsChange()
    })

  /** Subscription to show options changes */
  private readonly showOptionsChangeSubscription = toObservable(this._showOptions)
    .pipe(takeUntilDestroyed())
    .subscribe((data) => {
      // Note: Form value processing is now handled directly in onBlurHandler
      // for immediate processing. This subscription is kept for backwards compatibility
      // but the _isSearching check prevents double-processing since onBlurHandler
      // already sets _isSearching to false before this subscription fires.
      if (!(!data && data !== null && this._isSearching())) return
      // Only process if still in search mode (which means onBlurHandler didn't run)
      this.processTextToFormValue(this._userSearchText(), {
        exitSearchMode: true,
        updateOnMatch: true,
        clearSearchText: true,
      })
    })

  // ============================================
  // CONSTRUCTOR
  // ============================================

  constructor() {
    super()
    this.destroyRef.onDestroy(() => {
      this._isDestroyed = true
      if (!this._searchDebounceTimer) return
      clearTimeout(this._searchDebounceTimer)
    })
  }

  // ============================================
  // LIFECYCLE HOOKS / OVERRIDES
  // ============================================

  override setupFormControl(): void {
    super.setupFormControl()
    const formControl = this._ngControl()?.control

    if (this.formValueChangeSubscription) {
      this.formValueChangeSubscription.unsubscribe()
      this.formValueChangeSubscription = undefined
    }

    if (!formControl) return

    this.formValueChangeSubscription = formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: string | number | string[] | number[] | null) => {
        this.handleFormValueChange(value)
      })
  }

  override writeValue(val: string | number | string[] | number[] | null): void {
    // Simply update the value - _inputValue is computed and will automatically
    // show the correct display text based on _value and _isSearching state.
    super.writeValue(val)

    // Handle array values for multiple mode
    if (Array.isArray(val)) {
      val.forEach((x) => {
        this.handleSelectValue(x)
      })
    }
  }

  override onChangedHandler(value: string | number | string[] | number[] | null): void {
    super.onChangedHandler(value)
    // Exit search mode - _inputValue will now derive from _value
    // Note: Don't clear _userSearchText here - it's needed for processTextToFormValue matching
    this._isSearching.set(false)
  }

  override onBlurHandler(): void {
    // Process form value and exit search mode immediately to avoid visual glitches
    this.processTextToFormValue(this._userSearchText(), {
      exitSearchMode: true,
      updateOnMatch: true,
      clearSearchText: true,
    })

    // Hide dropdown immediately - click events on options are protected by onBlurInput
    // which checks if focus moved to the option list before calling this handler
    this.hideOptionVisibility()
    super.onBlurHandler()
  }

  // ============================================
  // PUBLIC METHODS - Used in template
  // ============================================

  /**
   * Shows the option list dropdown.
   */
  showOptionVisibility(): void {
    this._showOptions.set(true)

    // Initialize _userSearchText with current input value when showing options
    // This ensures that if user focuses and blurs without typing, the value is preserved
    // Also enter search mode to enable filtering
    if (this._isSearching()) return
    const currentInputValue = this._inputValue()
    this._userSearchText.set(currentInputValue || '')
    this._isSearching.set(true)
  }

  /**
   * Hides the option list dropdown.
   */
  hideOptionVisibility(): void {
    this._showOptions.set(false)
  }

  /**
   * Handles input text changes (typing).
   * @param event The input event
   */
  onChangeInput(event: Event): void {
    this.showOptionVisibility()
    const value = (event.target as HTMLInputElement)?.value ?? ''
    this._isSearching.set(true)
    this._userSearchText.set(value)
    this.emitDebouncedSearchText(value)
  }

  /**
   * Handles option selection from the dropdown.
   * @param value The selected option's value
   * @param hideOptions Whether to hide the dropdown after selection
   */
  onValueChange(value: string | number | null, hideOptions = true): void {
    if (this.multiple()) {
      const valueToHandle = this.resolveValueForMultipleMode(value)
      if (!valueToHandle?.toString().trim()) {
        return
      }

      this.handleSelectValue(valueToHandle)
      this.onChangedHandler(this._chipList())

      if (hideOptions) {
        this.hideOptionVisibility()
        this.focusInput()
      }

      this._userSearchText.set('')
      this._isSearching.set(false)
      this.selectedOption.emit(valueToHandle)
      return
    }

    // When allowFreeText is true and a null/undefined value is received (e.g., from selecting
    // a non-existent option in the dropdown), use the typed text as the value instead of clearing
    if ((value === null || value === undefined) && this._allowFreeTextInternal()) {
      const typedText = this._userSearchText()?.trim()
      if (typedText) {
        this.onChangedHandler(typedText)
        if (hideOptions) {
          this.hideOptionVisibility()
          this.focusInput()
        }
        this.selectedOption.emit(typedText)
        return
      }
    }

    // Update _userSearchText to the selected option's label
    // This enables processTextToFormValue to match correctly on blur
    const selectedOption = this.selectOptions().find((x) => x.value === value)
    if (selectedOption) {
      this._userSearchText.set(selectedOption.label)
    }
    this.onChangedHandler(value)
    if (hideOptions) {
      this.hideOptionVisibility()
      // Return focus to input after selection
      this.focusInput()
    }
    this.selectedOption.emit(value)
  }

  /**
   * Handles keydown events on the input element for accessibility.
   * @param event The keyboard event
   */
  onInputKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        // Open dropdown if closed, or let option-list handle navigation
        if (!this._showOptions()) {
          event.preventDefault()
          this.showOptionVisibility()
        }
        break
      case 'ArrowUp':
        // Open dropdown if closed
        if (!this._showOptions()) {
          event.preventDefault()
          this.showOptionVisibility()
        }
        break
      case 'Escape':
        // Close dropdown and keep focus on input
        if (this._showOptions()) {
          event.preventDefault()
          this.onEscapePressed()
        }
        break
      case 'Enter':
        // In multiple+freeText mode, Enter should add either an exact matching option
        // or the typed custom text as a chip.
        if (this._showOptions() && this._allowFreeTextInternal() && this.multiple()) {
          const searchText = this._userSearchText()?.trim()
          if (!searchText) {
            break
          }

          event.preventDefault()
          const matchingOption = this.findMatchingOption(searchText)
          this.onValueChange(matchingOption?.value ?? null)
          break
        }

        // When allowFreeText is true and dropdown is open, handle Enter specially in single mode
        if (this._showOptions() && this._allowFreeTextInternal()) {
          const filteredOptions = this._filteredOptions()
          if (filteredOptions.length === 0) {
            event.preventDefault()
            this.processTextToFormValue(this._userSearchText(), {
              exitSearchMode: true,
              updateOnMatch: true,
              clearSearchText: false,
            })
            this.hideOptionVisibility()
          }
        }
        break
    }
  }

  /**
   * Handles Escape key press from option list.
   * Closes dropdown and returns focus to input.
   */
  onEscapePressed(): void {
    this.hideOptionVisibility()
    this.focusInput()
  }

  /**
   * Handles Tab key press from option list.
   * Closes dropdown and allows natural tab navigation.
   */
  onTabPressed(_event: { shiftKey: boolean }): void {
    // Close the dropdown, tab will naturally move focus
    this.hideOptionVisibility()
    // Process any pending input value
    this.processTextToFormValue(this._userSearchText(), {
      exitSearchMode: true,
      updateOnMatch: true,
      clearSearchText: true,
    })
  }

  /**
   * Sets focus to the input element.
   */
  focusInput(): void {
    const inputEl = this.selectInput()?.nativeElement
    if (!inputEl) return
    inputEl.focus()
  }

  /**
   * Handles input blur event.
   * @param event The focus event
   */
  onBlurInput(event: FocusEvent): void {
    const relatedTarget = event.relatedTarget as HTMLElement | null
    const optionListId = this.optionList()?.optionListContainer()?.nativeElement?.id
    // Only skip blur handling when focus actually moved into the option list.
    // Guard against both ids being undefined (e.g. clicking outside the field,
    // where relatedTarget is null and the option list isn't rendered), which
    // would otherwise short-circuit and skip the form value update.
    if (optionListId && relatedTarget?.id === optionListId) return
    this.onBlurHandler()
  }

  /**
   * Handles blur event on the option list.
   * @param event The blur event (truthy if should hide)
   */
  onBlurOptionList(event: FocusEvent | boolean): void {
    if (!event) return
    this.hideOptionVisibility()
  }

  /**
   * Gets the display description for a chip value.
   * @param chipValue The chip's value
   * @returns The chip's display label
   */
  getDescription(chipValue: string | number): string {
    const option = this.selectOptions().find((x) => x.value?.toString() === chipValue?.toString())
    return option?.label?.toString() ?? chipValue?.toString() ?? ''
  }

  getOptionByValue(value: string | number): SelectOption | undefined {
    return this.selectOptions().find((x) => x.value?.toString() === value?.toString())
  }

  getOptionIndex(option: SelectOption): number {
    return this.selectOptions().findIndex((x) => x.value === option.value)
  }

  /**
   * Removes a chip from the selection (multiple mode).
   * @param chipValue The chip value to remove
   */
  deleteChip(chipValue: string | number): void {
    const stringChipValue = chipValue?.toString()
    const index = this._chipList().findIndex((x) => x.toString() === stringChipValue)
    if (index < 0) return
    this._chipList.update((list) => list.filter((_, i) => i !== index))
    this.onChangedHandler(this._chipList())
  }

  // ============================================
  // PROTECTED METHODS - Internal logic, accessible to subclasses
  // ============================================

  /**
   * Filters options based on input text.
   * @param value The search text
   * @returns Filtered options
   */
  protected filterOptions(value: string): SelectOption[] {
    const options = this.selectOptions()
    const trimmedValue = value?.trim()
    return this.internalFilterOptions() && trimmedValue
      ? options.filter((x) => x.label.toLowerCase().includes(trimmedValue.toLowerCase()))
      : options
  }

  // ============================================
  // PRIVATE METHODS - Internal implementation
  // ============================================

  /**
   * Core method that processes text input and updates form value accordingly.
   *
   * Matching logic:
   * - If text matches an option label (case-insensitive, trimmed) and autoSelectOnExactMatch is true, select that option
   * - If no match and allowFreeText is true, use the typed text as value
   * - If no match and allowFreeText is false, clear the value
   *
   * @param text The text to process
   * @param options Configuration options:
   *   - exitSearchMode: If true, uses onChangedHandler which exits search mode. If false, stays in search mode.
   *   - updateOnMatch: If true, updates form when match found. If false, only clears on no-match.
   *   - clearSearchText: If true, clears _userSearchText after processing.
   */
  private processTextToFormValue(
    text: string,
    options: { exitSearchMode: boolean; updateOnMatch: boolean; clearSearchText: boolean }
  ): void {
    const searchText = text?.trim()

    // Find matching option: exact match (case-insensitive, trimmed)
    const matchingOption = this.findMatchingOption(text)

    if (!this.multiple()) {
      // If the found option is already selected, nothing to do except exit search mode
      if (matchingOption?.value === this._value()) {
        if (options.exitSearchMode) {
          this._isSearching.set(false)
        }
        if (options.clearSearchText) {
          this._userSearchText.set('')
        }
        return
      }

      // Determine what action to take based on match status and settings
      const shouldAutoSelect = matchingOption && this.autoSelectOnExactMatch() && options.updateOnMatch
      const shouldUseFreeText = this._allowFreeTextInternal() && searchText && options.updateOnMatch

      // Clear logic differs between typing and blur:
      // - On blur (exitSearchMode=true): clear when input is empty (regardless of allowFreeText setting)
      // - On blur: also clear when no valid selection and free text not allowed
      // - During typing (exitSearchMode=false): only clear when updateOnMatch is true and text doesn't match
      const shouldClearOnBlurEmpty = options.exitSearchMode && !searchText
      const shouldClearOnBlurNoMatch =
        options.exitSearchMode && !this._allowFreeTextInternal() && (!matchingOption || !this.autoSelectOnExactMatch())
      const shouldClearWhileTyping =
        !options.exitSearchMode && options.updateOnMatch && !matchingOption && !this._allowFreeTextInternal()

      if (shouldAutoSelect) {
        // Auto-select the matching option
        if (options.exitSearchMode) {
          this.onChangedHandler(matchingOption.value ?? '')
        } else {
          this.onValueChange(matchingOption.value ?? '', false)
        }
      } else if (shouldUseFreeText) {
        // Free text allowed: use the typed text as value
        if (options.exitSearchMode) {
          this.onChangedHandler(searchText)
        } else {
          this.onValueChange(searchText, false)
        }
      } else if (shouldClearOnBlurEmpty || shouldClearOnBlurNoMatch) {
        // On blur with empty input or no valid selection: clear the value to null
        this.onChangedHandler(null)
      } else if (shouldClearWhileTyping) {
        // While typing, text doesn't match any option: clear the value but stay in search mode
        this.updateValueWithoutExitingSearchMode('')
      }
    }

    if (options.clearSearchText) {
      this._userSearchText.set('')
    }
  }

  /**
   * Handles keyboard events on the input element.
   */
  private handleInputKeydown(e: KeyboardEvent, inputElement: HTMLInputElement): void {
    if (!(this.multiple() && this._chipList().length > 0 && !this._inputValue()?.length && e.key === 'Backspace')) {
      return
    }
    e.preventDefault()
    const chipContainerEl = this.chipContainer()?.nativeElement
    if (chipContainerEl) {
      const chips = chipContainerEl.querySelectorAll('.chip button.btn-chip') as NodeListOf<HTMLButtonElement>
      if (chips.length > 0) {
        const lastChip = chips[chips.length - 1]
        lastChip.focus()
        lastChip.addEventListener('keydown', (event: KeyboardEvent) => {
          if (event.key === 'Backspace') {
            event.preventDefault()
            this.deleteChip(this._chipList()[this._chipList().length - 1])
            inputElement.focus()
            return
          }
          event.preventDefault()
        })
      }
    }
  }

  /**
   * Handles changes to the select options input.
   */
  private handleOptionsChange(): void {
    const value = this._value()
    if (this.multiple() && Array.isArray(value) && value.length > 0) {
      for (const valueElement of value) {
        this.handleSelectValue(valueElement)
      }
    }
    // For single mode: _inputValue is computed, so it automatically updates
  }

  /**
   * Handles form value changes from external sources.
   */
  private handleFormValueChange(value: string | number | string[] | number[] | null): void {
    if (!(this.multiple() && Array.isArray(value))) {
      return
    }
    this._chipList.set([])
    this._selectedOptions.set([])
    value.forEach((x) => {
      this.handleSelectValue(x)
    })
    // Note: Don't clear _userSearchText here - it's managed by processTextToFormValue
    // which runs when options are hidden and needs _userSearchText for matching.
  }

  /**
   * Handles selecting a value (adding to chip list in multiple mode).
   */
  private handleSelectValue(value: string | number): void {
    const stringValue = value?.toString()
    if (!stringValue) {
      return
    }

    if (this._chipList().some((x) => x.toString() === stringValue)) {
      return
    }

    const option = this.selectOptions().find((x) => x.value === value)
    if (option) {
      this._chipList.update((list) => [...list, option.value as string])
      this._selectedOptions.update((list) => [...list, option])
      return
    }

    if (this._allowFreeTextInternal()) {
      this._chipList.update((list) => [...list, stringValue])
    }
  }

  /**
   * Resolves the value to add in multiple mode.
   * If no option value is provided and free text is enabled, use the currently typed text.
   */
  private resolveValueForMultipleMode(value: string | number | null): string | number | null {
    if (value !== null && value !== undefined) {
      return value
    }

    if (!this._allowFreeTextInternal()) {
      return null
    }

    const typedText = this._userSearchText()?.trim()
    return typedText || null
  }

  /**
   * Emits search text change after debounce.
   * When `updateValueOnType` is true, also updates the form value using the same
   * matching logic as processTextToFormValue (auto-select matching options, or use free text).
   */
  private emitDebouncedSearchText(value: string): void {
    if (this._searchDebounceTimer) {
      clearTimeout(this._searchDebounceTimer)
    }

    this._searchDebounceTimer = setTimeout(() => {
      if (this._isDestroyed) {
        return
      }

      if (value === this._lastEmittedSearchText) {
        return
      }
      this._lastEmittedSearchText = value
      this.searchTextChange.emit(value || '')

      // Update form value based on what the user typed
      // - When updateValueOnType is true: update on both match and no-match
      // - When allowFreeText is true: the input text IS the form value, so the
      //   value must always stay in sync with what the user types
      // - Otherwise: only clear the value when text doesn't match
      this.processTextToFormValue(value, {
        exitSearchMode: false,
        updateOnMatch: this.updateValueOnType() || this._allowFreeTextInternal(),
        clearSearchText: false,
      })
    }, this.searchTextDebounce())
  }

  /**
   * Updates the form value and internal _value signal without exiting search mode.
   * This is used when clearing the value during typing - we want to update the form
   * but keep the user in search mode so they can continue typing.
   */
  private updateValueWithoutExitingSearchMode(value: string | number | string[] | number[] | null): void {
    this._value.set(value)
    if (this.onChange) {
      this.onChange(value as string)
    }
  }
}
