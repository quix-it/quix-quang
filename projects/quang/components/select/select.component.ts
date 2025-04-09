import { NgClass, NgFor, NgIf } from '@angular/common'
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
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import {
  OptionListParentType,
  QuangBaseComponent,
  QuangOptionListComponent,
  SelectOption,
} from '@quang-lib/components/shared'

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
  imports: [TranslocoPipe, NgIf, NgFor, NgClass, QuangOptionListComponent],
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

  _showOptions = signal<boolean>(false)

  _optionHideTimeout = signal<any | undefined>(undefined)

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

  readonly ParentType = OptionListParentType.SELECT

  changeOptionsVisibility(skipTimeout = false): void {
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

  override onBlurHandler() {
    if (this.selectionMode() === 'single') {
      setTimeout(() => {
        this.hideOptionVisibility()
        super.onBlurHandler()
      }, 100)
    }
  }

  override onChangedHandler(value: string | number | string[] | number[] | null): void {
    super.onChangedHandler(value)
    if (this.selectionMode() === 'single') {
      this.hideOptionVisibility()
    }
  }

  onMouseLeaveCallback() {
    if (this.selectionMode() === 'multiple') {
      this.hideOptionVisibility()
    }
  }
}
