/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgClass, NgStyle } from '@angular/common'
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
import { QUANG_LOGGING_BEHAVIOR } from 'quang'
import { Subscription, fromEvent } from 'rxjs'

export interface SelectOption {
  label: string
  value: string | number | null
}

export enum OptionListParentType {
  SELECT = 'select',
  AUTOCOMPLETE = 'autocomplete',
}

@Component({
  selector: 'quang-option-list',
  imports: [NgStyle, NgClass, TranslocoPipe],
  templateUrl: './option-list.component.html',
  styleUrl: './option-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuangOptionListComponent {
  logLevel = inject(QUANG_LOGGING_BEHAVIOR, { optional: true })

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

  scrollBehaviorOnOpen = input<ScrollBehavior>('smooth')

  changedHandler = output<any>()

  blurHandler = output<any>()

  optionListContainer = viewChild<ElementRef<HTMLDivElement>>('optionListContainer')

  destroyRef = inject(DestroyRef)

  parentType = input.required<OptionListParentType>()

  parentID = input<string>('')

  searchString = signal<string>('')

  searchResetTimer: ReturnType<typeof setTimeout> | null = null

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
    const optionListContainer = this.optionListContainer()
    if (optionListContainer && this.parentType() === OptionListParentType.SELECT) {
      optionListContainer?.nativeElement.focus()
      const optionListContainerNativeElement = optionListContainer?.nativeElement
      if (optionListContainerNativeElement) {
        const ul = optionListContainerNativeElement?.children[0] as HTMLUListElement
        const listItem = ul?.children.item(this.selectedElementIndex()) as HTMLLIElement | undefined
        if (listItem) {
          setTimeout(() => {
            listItem.scrollIntoView({ behavior: this.scrollBehaviorOnOpen() })
          }, 0)
        }
      }
    }
    const ul = optionListContainer?.nativeElement?.children[0] as HTMLUListElement | undefined
    const listItems = (ul?.children ?? []) as HTMLLIElement[]
    let currentIndex = this.selectedElementIndex()
    listItems?.[currentIndex]?.classList.add('selected')

    if (this.onKeyDown) {
      this.onKeyDown.unsubscribe()
    }

    this.onKeyDown = fromEvent(document, 'keydown', {
      capture: true,
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        switch ((event as KeyboardEvent).key) {
          case 'ArrowDown': {
            if (this.parentType() === OptionListParentType.AUTOCOMPLETE) optionListContainer?.nativeElement.focus()
            if (currentIndex !== this.selectedElementIndex()) listItems[currentIndex]?.classList.remove('selected')
            if (currentIndex === listItems.length - 1) {
              currentIndex = listItems.length - 1
            } else {
              currentIndex += 1
            }
            if (currentIndex === 0) {
              event.preventDefault()
              optionListContainer?.nativeElement?.scroll(0, 0)
            }
            const optionListBottom = optionListContainer?.nativeElement?.getBoundingClientRect()?.bottom ?? 0
            const itemListHeight = optionListContainer?.nativeElement?.children?.[0]?.children
              ?.item(currentIndex)
              ?.getBoundingClientRect()?.height
            const itemListBottom = optionListContainer?.nativeElement?.children?.[0]?.children
              ?.item(currentIndex)
              ?.getBoundingClientRect()?.bottom
            if (optionListBottom > (itemListBottom ?? 0) + (itemListHeight ?? 0)) event.preventDefault()

            listItems[currentIndex]?.classList.add('selected')
            if (
              (optionListContainer?.nativeElement?.scrollTop ?? 0) >=
              (optionListContainer?.nativeElement?.scrollHeight ?? 0) -
                (optionListContainer?.nativeElement?.offsetHeight ?? 0)
            ) {
              event.preventDefault()
            }
            break
          }
          case 'ArrowUp': {
            if (this.parentType() === OptionListParentType.AUTOCOMPLETE) optionListContainer?.nativeElement.focus()
            if (currentIndex !== this.selectedElementIndex()) listItems[currentIndex]?.classList.remove('selected')
            if (currentIndex !== 0) currentIndex -= 1
            const optionListTop = optionListContainer?.nativeElement?.getBoundingClientRect()?.top ?? 0
            const itemListHeight = optionListContainer?.nativeElement?.children?.[0]?.children
              ?.item(currentIndex)
              ?.getBoundingClientRect()?.height
            const itemListTop = optionListContainer?.nativeElement?.children?.[0]?.children
              ?.item(currentIndex)
              ?.getBoundingClientRect()?.top
            if (optionListTop < (itemListTop ?? 0) - (itemListHeight ?? 0)) event.preventDefault()
            listItems[currentIndex]?.classList.add('selected')
            if (!optionListContainer?.nativeElement?.scrollTop) {
              event.preventDefault()
            }
            break
          }
          case 'Enter': {
            this.onSelectItem(this.selectOptionsList()[currentIndex])
            break
          }
          default: {
            if (
              ((event as KeyboardEvent)?.key?.length === 1 || (event as KeyboardEvent)?.key === 'Backspace') &&
              this.parentType() === OptionListParentType.AUTOCOMPLETE &&
              document.activeElement?.id === optionListContainer?.nativeElement?.id
            ) {
              currentIndex = 0
              document.getElementById(this.parentID())?.focus()
              document.getElementById(this.parentID())?.click()
            } else if (
              (event as KeyboardEvent)?.key?.length === 1 &&
              this.parentType() === OptionListParentType.SELECT
            ) {
              const key = (event as KeyboardEvent).key
              currentIndex = this.handleSearch(key, listItems, currentIndex)
              event.preventDefault()
            }
            break
          }
        }
      })
  })

  handleSearch(key: string, listItems: HTMLLIElement[], currentIndex: number): number {
    if (this.searchResetTimer) {
      clearTimeout(this.searchResetTimer)
    }

    this.searchString.update((current) => current + key)

    this.searchResetTimer = setTimeout(() => {
      this.searchString.set('')
      this.searchResetTimer = null
    }, 500)

    const searchStr = this.searchString().toLowerCase()
    const matchIndex = this.selectOptionsList().findIndex((option) => option.label.toLowerCase().includes(searchStr))

    if (matchIndex !== -1 && matchIndex !== currentIndex) {
      listItems[currentIndex]?.classList.remove('selected')
      listItems[matchIndex]?.classList.add('selected')
      listItems[matchIndex]?.scrollIntoView({ behavior: this.scrollBehaviorOnOpen() })
      return matchIndex
    }

    return currentIndex
  }

  @HostListener('window:scroll') changePosition() {
    this.getOptionListWidth()
    this.getOptionListTop()
  }

  isScrollable(ele: Element): boolean {
    if (!ele) return false

    let result = false

    try {
      const hasScrollableContent = ele.scrollHeight > ele.clientHeight

      const overflowYStyle = window.getComputedStyle(ele).overflowY
      const isOverflowHidden = overflowYStyle.includes('hidden')

      result = hasScrollableContent && !isOverflowHidden
    } catch (_error) {
      if (this.logLevel === 'verbose') console.error('captured error isScrollable', _error)
    }

    return result
  }

  getScrollParent(node: unknown): Element {
    if (!node || node === document.body || !(node instanceof Element)) return document.body
    return this.isScrollable(node) ? node : this.getScrollParent(node.parentNode)
  }

  onSelectItem(item: SelectOption | null): void {
    if (this.selectionMode() === 'single') {
      this.changedHandler.emit(item?.value ?? null)
    } else {
      let targetValue = this._value()
      if (!Array.isArray(targetValue) && targetValue) {
        targetValue = [targetValue]
      }
      const values: string[] | number[] | null = targetValue as string[] | number[] | null
      if (values) {
        if (values.some((x) => x === item?.value)) {
          this.changedHandler.emit(values.filter((x) => x !== item?.value) as string[] | number[])
        } else if (item) {
          this.changedHandler.emit([...values, item.value] as string[] | number[])
        } else {
          this.changedHandler.emit([...values] as string[] | number[])
        }
      } else if (item?.value) {
        this.changedHandler.emit([item.value] as string[] | number[])
      } else {
        this.changedHandler.emit(null)
      }
    }
  }

  getSelected(item: SelectOption): boolean {
    if (this.selectionMode() === 'single' || !Array.isArray(this._value())) {
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
    const nativeElement = this.optionListContainer()?.nativeElement
    const diff =
      window.innerHeight -
      (nativeElement?.getBoundingClientRect()?.height ?? 0) -
      (this.selectButtonRef()?.getBoundingClientRect()?.top ?? 0) -
      (this.selectButtonRef()?.getBoundingClientRect()?.height ?? 0)
    let topValue = 'unset'
    let bottomValue = 'unset'
    const isTop = diff >= 0
    if (isTop) {
      topValue = `${(this.selectButtonRef()?.getBoundingClientRect()?.top ?? 0) + (this.selectButtonRef()?.offsetHeight ?? 0)}px`
    } else {
      bottomValue = `${window.innerHeight - (this.selectButtonRef()?.getBoundingClientRect()?.bottom ?? 0) + (this.selectButtonRef()?.getBoundingClientRect()?.height ?? 0)}px`
    }
    nativeElement?.classList.toggle('option-list-top', !isTop)
    this.elementTop.set(topValue)
    this.elementBottom.set(bottomValue)
  }
}
