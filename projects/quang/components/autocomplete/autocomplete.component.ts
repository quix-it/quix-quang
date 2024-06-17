import { NgClass, NgIf } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  forwardRef,
  inject,
  input,
  output,
  signal
} from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
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
export class QuangAutocompleteComponent extends QuangBaseComponent<string | number | null> {
  elementRef = inject(ElementRef)
  optionListMaxHeight = input<string>('200px')
  selectOptions = input.required<SelectOption[]>()
  translateValue = input<boolean>(true)
  /**
   * only emit value without save in ngControl
   */
  emitOnly = input<boolean>(false)
  _showOptions = signal<boolean | null>(null)
  _inputValue = signal<string | null>(null)
  inputValue$ = new Subject<string>()
  _filteredOptions = computed<SelectOption[]>(() => {
    const text = this._inputValue()
    return text?.length ? this.filterOptions(text) : this.selectOptions()
  })
  selectedOption = output<string | number | null>()
  searchTextChange = output<string>()

  constructor() {
    super()
    this.inputValue$.pipe(this._takeUntilDestroyed(), debounceTime(300), distinctUntilChanged()).subscribe((value) => {
      this._inputValue.set(value?.toString() ?? '')
    })
    toObservable(this._showOptions)
      .pipe(this._takeUntilDestroyed())
      .subscribe((data) => {
        if (!data && data !== null) {
          this.checkInputValue()
        }
      })
  }

  // selectionMode = input<'single' | 'multiple'>('single')
  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideOptionVisibility()
    }
  }

  showOptionVisibility(): void {
    this._showOptions.set(true)
  }

  hideOptionVisibility(): void {
    this._showOptions.set(false)
  }

  onChangeInput(value: any): void {
    this.inputValue$.next(value.target?.value)
    this.searchTextChange.emit(value.target?.value)
  }

  filterOptions(value: string): SelectOption[] {
    const options = this.selectOptions()
    return options.filter((x) => {
      return x.label.toLowerCase().includes(value.toLowerCase())
    })
  }

  override onChangedHandler(value: string | number | null): void {
    super.onChangedHandler(value)
    this._inputValue.set(this.selectOptions().find((x) => x.value === this._value())?.label ?? '')
  }

  onValueChange(value: string | number | null): void {
    if (!this.emitOnly()) {
      this.onChangedHandler(value)
      this.hideOptionVisibility()
    }
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
    this._inputValue.set(val?.toString() ?? '')
    super.writeValue(val)
  }
}
