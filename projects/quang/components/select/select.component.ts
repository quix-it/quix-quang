import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  effect,
  forwardRef,
  input,
  signal
} from '@angular/core'
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
export class QuangSelectComponent
  extends QuangBaseComponent<string | number | string[] | number[] | null>
  implements AfterViewInit
{
  @HostListener('focusout', ['$event']) focusOut(event: Event): void {
    console.log(event)
    if (event && this._canLeave()) {
      setTimeout(() => {
        this.hideOptionVisibility()
      }, 100)
    }
  }
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

  _canLeave = computed(() => {
    if (this.selectionMode() === 'single') return true
    return false
  })

  _leave = signal<boolean>(true)

  _selectOptions = signal<SelectOption[]>([])
  _showOptions = signal<boolean>(false)
  _optionHideTimeout = signal<any | undefined>(undefined)
  _selectedItems = computed(() => {
    if (this._value()) {
      const targetValue = this._value()
      return this.selectOptions().filter((x) => {
        if (Array.isArray(targetValue)) {
          return targetValue.some((k) => k === x.value)
        } else {
          return targetValue === x.value
        }
      })
    }
    return null
  })

  QuangSelectComponent = QuangSelectComponent

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

  constructor() {
    super()
  }

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

  override onChangedHandler(value: string | number | string[] | number[] | null): void {
    super.onChangedHandler(value)
    this._leave.set(false)
    console.log(this._leave())
  }
}
