import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

import { TranslocoPipe } from '@jsverse/transloco'
import { Subscription, fromEvent } from 'rxjs'

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuangOptionListComponent {
  selectionMode = input<'single' | 'multiple'>('single')

  optionListMaxHeight = input<string>('201px')

  selectOptions = input<SelectOption[]>([])

  selectButtonRef = input.required<HTMLButtonElement | HTMLInputElement>()

  _value = input<any>()

  _isDisabled = input<boolean>()

  componentClass = input<string | string[]>('')

  componentLabel = input<string>('')

  componentTabIndex = input<number>(0)

  translateValue = input<boolean>(false)

  nullOption = input<boolean>(true)

  elementWidth = signal<string>('0px')

  elementTop = signal<string>('0px')

  elementBottom = signal<string>('0px')

  changedHandler = output<any>()

  blurHandler = output<any>()

  optionList = viewChild<ElementRef>('optionList')

  destroyRef = inject(DestroyRef)

  selectButtonRef$ = toObservable(this.selectButtonRef)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => {
      this.getOptionListWidth()
      this.getOptionListTop()
      this.getScrollParent(this.selectButtonRef())?.addEventListener('scroll', () => {
        this.getOptionListWidth()
        this.getOptionListTop()
      })
    })

  selectOptionsList = computed(() => {
    if (this.nullOption() && this.selectionMode() === 'single') {
      return [
        {
          label: '',
          value: null,
        },
        ...this.selectOptions(),
      ]
    }
    return [...this.selectOptions()]
  })

  onKeyDown: Subscription | null = null

  selectedElementIndex = computed<number>(
    () => this.selectOptionsList()?.findIndex((x) => x?.value === this._value()) ?? 0
  )

  optionList$ = effect(() => {
    if (this.optionList()) {
      this.optionList()?.nativeElement.focus()
    }
    const ul = this.optionList()?.nativeElement?.children[0]
    const li = ul.children
    let currentIndex = this.selectedElementIndex()
    // if (this._value()) {
    //   currentIndex = this.selectOptionsList()?.findIndex((x) => x.value === this._value())
    // }
    li[currentIndex]?.classList.add('selected')

    if (this.onKeyDown) {
      this.onKeyDown.unsubscribe()
    }

    this.onKeyDown = fromEvent(document, 'keydown', { capture: true })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        switch ((event as KeyboardEvent).key) {
          case 'ArrowDown': {
            if (currentIndex !== this.selectedElementIndex()) li[currentIndex]?.classList.remove('selected')
            if (currentIndex === li.length - 1) {
              currentIndex = li.length - 1
            } else {
              currentIndex += 1
            }
            li[currentIndex]?.classList.add('selected')
            if (
              this.optionList()?.nativeElement?.scrollTop >=
              (this.optionList()?.nativeElement?.scrollHeight ?? 0) -
                (this.optionList()?.nativeElement?.offsetHeight ?? 0)
            ) {
              event.preventDefault()
            }
            break
          }
          case 'ArrowUp': {
            if (currentIndex !== this.selectedElementIndex()) li[currentIndex]?.classList.remove('selected')
            if (currentIndex === 0) {
              currentIndex = 0
            } else {
              currentIndex -= 1
            }
            li[currentIndex]?.classList.add('selected')
            if (!this.optionList()?.nativeElement?.scrollTop) {
              event.preventDefault()
            }
            break
          }
          case 'Enter': {
            this.onSelectItem(this.selectOptionsList()[currentIndex])
            break
          }
          default: {
            li[currentIndex]?.classList.add('selected')
            break
          }
        }
      })
  })

  @HostListener('window:scroll') changePosition() {
    this.getOptionListWidth()
    this.getOptionListTop()
  }

  isScrollable(ele: HTMLElement): boolean {
    if (!ele) return false

    let result = false

    try {
      const hasScrollableContent = ele.scrollHeight > ele.clientHeight

      const overflowYStyle = window.getComputedStyle(ele).overflowY
      const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1

      result = hasScrollableContent && !isOverflowHidden
    } catch (e) {
      console.error('captured error isScrollable', e)
    }

    return result
  }

  getScrollParent(node: HTMLElement): HTMLElement {
    if (!node || node === document.body) return document.body
    return this.isScrollable(node) ? node : this.getScrollParent(node?.parentNode as HTMLElement)
  }

  onSelectItem(item: SelectOption | null): void {
    if (this.selectionMode() === 'single') {
      this.changedHandler.emit(item?.value ?? null)
    } else {
      const values: string[] | number[] | null = this._value() as string[] | number[] | null
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

  onBlurHandler(e: Event): void {
    this.blurHandler.emit(e)
  }

  getOptionListWidth() {
    this.elementWidth.set(`${this.selectButtonRef()?.offsetWidth}px`)
  }

  getOptionListTop() {
    const diff =
      window.innerHeight -
      (this.optionList()?.nativeElement?.getBoundingClientRect()?.height ?? 0) -
      (this.selectButtonRef()?.getBoundingClientRect()?.top ?? 0) -
      (this.selectButtonRef()?.getBoundingClientRect()?.height ?? 0)
    if (diff >= 0) {
      this.elementTop.set(
        `${(this.selectButtonRef()?.getBoundingClientRect()?.top ?? 0) + (this.selectButtonRef()?.offsetHeight ?? 0)}px`
      )
      this.elementBottom.set(`unset`)
      this.optionList()?.nativeElement?.classList.remove('option-list-top')
    } else {
      this.elementTop.set(`unset`)
      this.elementBottom.set(
        `${window.innerHeight - (this.selectButtonRef()?.getBoundingClientRect()?.bottom ?? 0) + (this.selectButtonRef()?.getBoundingClientRect()?.height ?? 0)}px`
      )
      this.optionList()?.nativeElement?.classList.add('option-list-top')
    }
  }
}
