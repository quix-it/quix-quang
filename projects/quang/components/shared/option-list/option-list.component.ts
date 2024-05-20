import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal
} from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

import { TranslocoPipe } from '@ngneat/transloco'
import { map } from 'rxjs'

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
  selectButtonRef = input<HTMLButtonElement>()
  _value = input<any>()
  _isDisabled = input<boolean>()
  componentClass = input<string | string[]>('')
  componentLabel = input<string>('')
  componentTabIndex = input<number>(0)
  translateValue = input<boolean>(false)
  elementWidth = signal<string>('0px')
  elementTop = signal<string>('0px')

  changedHandler = output<any>()
  blurHandler = output<any>()

  _takeUntilDestroyed = signal(takeUntilDestroyed())

  @HostListener('window:scroll') changePosition() {
    this.getOptionListWidth()
    this.getOptionListTop()
  }

  selectButtonRef$ = toObservable(this.selectButtonRef)
    .pipe(this._takeUntilDestroyed())
    .subscribe(() => {
      this.getOptionListWidth()
      this.getOptionListTop()
      this.getScrollParent(this.selectButtonRef())?.addEventListener('scroll', () => {
        this.getOptionListWidth()
        this.getOptionListTop()
      })
    })

  isScrollable(ele: HTMLElement): string | boolean {
    const hasScrollableContent = ele.scrollHeight > ele.clientHeight

    const overflowYStyle = window.getComputedStyle(ele).overflowY
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1

    return hasScrollableContent && !isOverflowHidden
  }

  getScrollParent(node: any): HTMLElement {
    return !node || node === document.body
      ? document.body
      : this.isScrollable(node)
        ? node
        : this.getScrollParent(node?.parentNode)
  }

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
    return this._value()?.some((x: number | string | null) => x === item?.value)
  }

  onBlurHandler(e: any): void {
    this.blurHandler.emit(e)
  }

  getOptionListWidth() {
    this.elementWidth.set(`${this.selectButtonRef()?.offsetWidth}px`)
  }

  getOptionListTop() {
    this.elementTop.set(
      `${(this.selectButtonRef()?.getBoundingClientRect()?.top ?? 0) + (this.selectButtonRef()?.offsetHeight ?? 0)}px`
    )
  }
}
