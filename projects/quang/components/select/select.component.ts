import { NgClass } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  forwardRef,
  input,
  signal,
  viewChild,
} from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { combineLatest, filter } from 'rxjs'

import {
  OptionListParentType,
  QuangBaseComponent,
  QuangOptionListComponent,
  SelectOption,
} from 'quang/components/shared'

@Component({
  selector: 'quang-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangSelectComponent),
      multi: true,
    },
    {
      provide: QuangOptionListComponent,
      multi: false,
    },
  ],
  imports: [TranslocoPipe, NgClass, QuangOptionListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Select component for choosing one or multiple options from a dropdown.
 *
 * @usageNotes
 * This component supports both single and multiple selection modes. It can be configured
 * to display a list of options and allows users to select one or more of them by setting the `selectionMode` property to either `single` or `multiple`.
 */
export class QuangSelectComponent
  extends QuangBaseComponent<string | number | string[] | number[] | null>
  implements AfterViewInit
{
  selectionMode = input<'single' | 'multiple'>('single')

  /**
   * Set the max height of the selection list before scrolling.
   * Default: 18rem
   * @default 18rem
   */
  optionListMaxHeight = input<string>('18rem')

  selectOptions = input.required<SelectOption[]>()

  scrollBehaviorOnOpen = input<ScrollBehavior>('smooth')

  selectButton = viewChild<ElementRef<HTMLButtonElement>>('selectButton')

  /** Whether the option list is currently visible */
  _showOptions = signal<boolean>(false)

  _selectedItems = computed(() => {
    if (this._value() !== null) {
      const targetValue = this._value()
      return this.selectOptions().filter((x) => {
        if (Array.isArray(targetValue)) {
          return targetValue.some((k) => k === x.value)
        }
        return targetValue === x.value
      })
    }
    return null
  })

  translateValue = input<boolean>(true)

  nullOption = input<boolean>(true)

  autoSelectSingleOption = input<boolean>(false)

  readonly ParentType = OptionListParentType.SELECT

  constructor() {
    super()
    combineLatest([toObservable(this.autoSelectSingleOption), toObservable(this.selectOptions)])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(([autoselect, options]) => autoselect === true && options.length === 1)
      )
      .subscribe(([_, options]) => {
        if (this._value() === null || this._value() === undefined || this._value() === '') {
          this.onChangedHandler(options[0].value)
        }
      })
  }

  changeOptionsVisibility(): void {
    if (this.isReadonly()) return
    if (this._showOptions()) {
      this.hideOptionVisibility()
    } else {
      this.showOptionVisibility()
    }
  }

  showOptionVisibility(): void {
    this._showOptions.set(true)
  }

  hideOptionVisibility(): void {
    this._showOptions.set(false)
  }

  override onBlurHandler() {
    if (this.selectionMode() === 'single') {
      this.hideOptionVisibility()
      super.onBlurHandler()
    }
  }

  override onChangedHandler(value: string | number | string[] | number[] | null): void {
    super.onChangedHandler(value)
    if (this.selectionMode() === 'single') {
      this.hideOptionVisibility()
      // Return focus to button after selection
      this.focusButton()
    }
  }

  onMouseLeaveCallback() {
    if (this.selectionMode() === 'multiple') {
      this.hideOptionVisibility()
    }
  }

  /**
   * Handles keydown events on the select button for accessibility.
   * @param event The keyboard event
   */
  onButtonKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        // Open dropdown if closed
        if (!this._showOptions()) {
          event.preventDefault()
          this.showOptionVisibility()
        }
        break
      case ' ':
      case 'Enter':
        // Toggle dropdown with Space or Enter
        if (!this._showOptions()) {
          event.preventDefault()
          this.showOptionVisibility()
        }
        break
      case 'Escape':
        // Close dropdown and keep focus on button
        if (this._showOptions()) {
          event.preventDefault()
          this.onEscapePressed()
        }
        break
    }
  }

  /**
   * Handles Escape key press from option list.
   * Closes dropdown and returns focus to button.
   */
  onEscapePressed(): void {
    this.hideOptionVisibility()
    this.focusButton()
  }

  /**
   * Handles Tab key press from option list.
   * Closes dropdown and allows natural tab navigation.
   */
  onTabPressed(_event: { shiftKey: boolean }): void {
    this.hideOptionVisibility()
  }

  /**
   * Sets focus to the select button element.
   */
  focusButton(): void {
    const buttonEl = this.selectButton()?.nativeElement
    if (buttonEl) {
      buttonEl.focus()
    }
  }
}
