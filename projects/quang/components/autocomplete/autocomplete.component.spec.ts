import { Component, DebugElement, Injectable, TemplateRef, signal, viewChild } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { vi } from 'vitest'

import { QuangAutocompleteComponent } from './autocomplete.component'
import { QuangSelectOptionTemplateContext, SelectOption } from 'quang/components/shared'

// Mock transloco loader for testing
@Injectable()
class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(_lang: string): Observable<Record<string, string>> {
    return of({})
  }
}

// Helper to get transloco testing providers
const getTranslocoTestingProviders = () =>
  provideTransloco({
    config: {
      availableLangs: ['en'],
      defaultLang: 'en',
      fallbackLang: 'en',
      prodMode: true,
    },
    loader: TestTranslocoLoader,
  })

// Test host component
@Component({
  template: `
    <form [formGroup]="form">
      <quang-autocomplete
        [componentLabel]="label"
        [componentPlaceholder]="placeholder"
        [emitOnly]="emitOnly"
        [errorMap]="errorMap"
        [multiple]="multiple"
        [searchTextDebounce]="debounce"
        [selectOptions]="options"
        [syncFormWithText]="syncFormWithText"
        [translateValue]="translateValue"
        (searchTextChange)="onSearchTextChange($event)"
        (selectedOption)="onOptionSelected($event)"
        formControlName="autocomplete"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
})
class TestHostComponent {
  form = new FormGroup({
    autocomplete: new FormControl<string | number | null>(null),
  })

  options: SelectOption[] = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
    { label: 'Another Item', value: 'another' },
  ]

  label = 'Test Autocomplete'
  placeholder = 'Search...'
  errorMap = [{ error: 'required', message: 'This field is required' }]
  multiple = false
  debounce = 50 // Shorter debounce for tests
  translateValue = false
  emitOnly = false
  syncFormWithText = false

  selectedValue: string | number | null = null
  searchText = ''

  onOptionSelected(value: string | number | null): void {
    this.selectedValue = value
  }

  onSearchTextChange(text: string): void {
    this.searchText = text
  }
}

// Test host component for multiple selection
@Component({
  template: `
    <form [formGroup]="form">
      <quang-autocomplete
        [multiple]="true"
        [searchTextDebounce]="50"
        [selectOptions]="options"
        formControlName="autocomplete"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
})
class TestHostMultipleComponent {
  form = new FormGroup({
    autocomplete: new FormControl<string[]>([]),
  })

  options: SelectOption[] = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ]
}

// Test host component for multiple selection with free text
@Component({
  template: `
    <form [formGroup]="form">
      <quang-autocomplete
        [allowFreeText]="true"
        [multiple]="true"
        [searchTextDebounce]="50"
        [selectOptions]="options"
        formControlName="autocomplete"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
})
class TestHostMultipleAllowFreeTextComponent {
  form = new FormGroup({
    autocomplete: new FormControl<string[]>([]),
  })

  options: SelectOption[] = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ]
}

// Test host component for multiple selection with templated options
@Component({
  template: `
    <form [formGroup]="form">
      <ng-template
        #optTpl
        let-opt
        let-selected="selected"
      >
        <span class="custom-chip-opt">Custom {{ opt.label }} selected: {{ selected }}</span>
      </ng-template>

      <quang-autocomplete
        [multiple]="true"
        [searchTextDebounce]="50"
        [selectOptions]="options"
        formControlName="autocomplete"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
})
class TestHostMultipleTemplatedComponent {
  form = new FormGroup({
    autocomplete: new FormControl<string[]>([]),
  })

  private readonly optTpl = viewChild<TemplateRef<QuangSelectOptionTemplateContext>>('optTpl')

  options: SelectOption[] = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ]

  setTemplatedOptions(): void {
    this.options = [
      { label: 'Option 1', value: 'opt1', renderer: this.optTpl() },
      { label: 'Option 2', value: 'opt2' },
      { label: 'Option 3', value: 'opt3' },
    ]
  }
}

describe('QuangAutocompleteComponent', () => {
  let hostComponent: TestHostComponent
  let hostFixture: ComponentFixture<TestHostComponent>
  let autocompleteDebugElement: DebugElement
  let autocompleteComponent: QuangAutocompleteComponent
  let inputElement: HTMLInputElement

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    hostFixture = TestBed.createComponent(TestHostComponent)
    hostComponent = hostFixture.componentInstance
    hostFixture.detectChanges()

    autocompleteDebugElement = hostFixture.debugElement.query(By.directive(QuangAutocompleteComponent))
    autocompleteComponent = autocompleteDebugElement.componentInstance
    inputElement = hostFixture.nativeElement.querySelector('input')
  })

  afterEach(() => {
    hostFixture.destroy()
    vi.useRealTimers()
  })

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(autocompleteComponent).toBeTruthy()
    })

    it('should render the label', () => {
      const label = hostFixture.nativeElement.querySelector('label')
      expect(label.textContent).toContain('Test Autocomplete')
    })

    it('should render the placeholder', () => {
      expect(inputElement.placeholder).toBe('Search...')
    })

    it('should initialize with null value', () => {
      expect(hostComponent.form.get('autocomplete')?.value).toBeNull()
    })

    it('should have the correct number of options', () => {
      expect(autocompleteComponent.selectOptions().length).toBe(4)
    })
  })

  describe('User Input', () => {
    it('should update input value on typing', async () => {
      // Simulate user typing - this enters search mode and sets _userSearchText
      autocompleteComponent['_isSearching'].set(true)
      autocompleteComponent['_userSearchText'].set('Option')
      hostFixture.detectChanges()

      // _inputValue is computed: when searching, it returns _userSearchText
      expect(autocompleteComponent._inputValue()).toBe('Option')
    })

    it('should emit searchTextChange on input', async () => {
      // Subscribe to the searchTextChange output before triggering
      let emittedValue = ''
      const sub = autocompleteComponent.searchTextChange.subscribe((val: string) => {
        emittedValue = val
      })

      // Verify initial state
      expect(autocompleteComponent._inputValue()).toBe('')

      // Simulate onChangeInput being called (which is triggered by (input) binding)
      const mockEvent = { target: { value: 'test' } } as unknown as Event
      autocompleteComponent.onChangeInput(mockEvent)

      // Check the signal was updated immediately
      expect(autocompleteComponent._inputValue()).toBe('test')

      // Wait for debounce timer (TestHostComponent sets debounce to 50ms)
      await vi.advanceTimersByTimeAsync(100)

      sub.unsubscribe()
      expect(emittedValue).toBe('test')
    })

    it('should show options on mousedown', async () => {
      inputElement.dispatchEvent(new MouseEvent('mousedown'))
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(autocompleteComponent._showOptions()).toBe(true)
    })

    it('should filter options based on input', async () => {
      // Enter search mode and set search text
      autocompleteComponent['_isSearching'].set(true)
      autocompleteComponent['_userSearchText'].set('Option 1')
      hostFixture.detectChanges()

      const filteredOptions = autocompleteComponent._filteredOptions()
      expect(filteredOptions.length).toBe(1)
      expect(filteredOptions[0].label).toBe('Option 1')
    })

    it('should filter options case-insensitively', async () => {
      // Enter search mode and set search text
      autocompleteComponent['_isSearching'].set(true)
      autocompleteComponent['_userSearchText'].set('option')
      hostFixture.detectChanges()

      const filteredOptions = autocompleteComponent._filteredOptions()
      expect(filteredOptions.length).toBe(3)
    })
  })

  describe('Option Selection', () => {
    it('should update form value when option is selected', async () => {
      autocompleteComponent.onValueChange('opt1')
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(hostComponent.form.get('autocomplete')?.value).toBe('opt1')
    })

    it('should emit selectedOption when option is selected', async () => {
      autocompleteComponent.onValueChange('opt2')
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(hostComponent.selectedValue).toBe('opt2')
    })

    it('should hide options after selection', async () => {
      autocompleteComponent.showOptionVisibility()
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()
      expect(autocompleteComponent._showOptions()).toBe(true)

      autocompleteComponent.onValueChange('opt1')
      await vi.advanceTimersByTimeAsync(100)
      hostFixture.detectChanges()

      expect(autocompleteComponent._showOptions()).toBe(false)
    })

    it('should update input value to selected option label', async () => {
      hostComponent.form.get('autocomplete')?.setValue('opt1')
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(autocompleteComponent._inputValue()).toBe('Option 1')
    })
  })

  describe('Form Control Integration', () => {
    it('should update component when form control value changes', async () => {
      hostComponent.form.get('autocomplete')?.setValue('opt2')
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(autocompleteComponent._value()).toBe('opt2')
      expect(autocompleteComponent._inputValue()).toBe('Option 2')
    })

    it('should update input text when form is patched with new value (bug fix: QUANG-254)', async () => {
      // This test verifies the fix for the bug where after patching a form,
      // the autocomplete input text wasn't updated correctly, causing incorrect filtering

      // Initial state - no value
      expect(autocompleteComponent._inputValue()).toBe('')
      expect(autocompleteComponent._value()).toBe(null)

      // Patch the form with a value
      hostComponent.form.patchValue({ autocomplete: 'opt1' })
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      // Both the internal value and input text should be updated
      expect(autocompleteComponent._value()).toBe('opt1')
      expect(autocompleteComponent._inputValue()).toBe('Option 1')

      // Patch again with a different value
      hostComponent.form.patchValue({ autocomplete: 'opt2' })
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      // Input text should reflect the new value
      expect(autocompleteComponent._value()).toBe('opt2')
      expect(autocompleteComponent._inputValue()).toBe('Option 2')

      // When not searching, all options should be shown in the dropdown
      // (the input displays the selected value's label, but dropdown shows all options)
      const filteredOptions = autocompleteComponent._filteredOptions()
      expect(filteredOptions.length).toBe(4) // All options shown when not searching

      // When user starts typing/searching, then filtering happens
      autocompleteComponent['_isSearching'].set(true)
      autocompleteComponent['_userSearchText'].set('Option 2')
      hostFixture.detectChanges()

      const filteredAfterSearch = autocompleteComponent._filteredOptions()
      expect(filteredAfterSearch.length).toBe(1)
      expect(filteredAfterSearch[0].value).toBe('opt2')
    })

    it('should mark form as touched on blur', async () => {
      expect(hostComponent.form.get('autocomplete')?.touched).toBe(false)

      // Call blur handler directly as the component does
      autocompleteComponent.onBlurHandler()
      await vi.advanceTimersByTimeAsync(150)
      hostFixture.detectChanges()

      expect(hostComponent.form.get('autocomplete')?.touched).toBe(true)
    })

    it('should clear form value when input is cleared and blurred', async () => {
      hostComponent.form.get('autocomplete')?.setValue('opt1')
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      // The component uses processTextToFormValue when options hide
      // If input doesn't match an option and syncFormWithText is false, it clears
      // Simulate user clearing the input (entering search mode with empty text)
      autocompleteComponent['_isSearching'].set(true)
      autocompleteComponent['_userSearchText'].set('')
      autocompleteComponent['processTextToFormValue']('', {
        exitSearchMode: true,
        updateOnMatch: true,
        clearSearchText: true,
      })
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      // When input is empty and no match, the form value should be cleared to null
      expect(hostComponent.form.get('autocomplete')?.value).toBe(null)
    })

    it('should disable input when form control is disabled', async () => {
      hostComponent.form.get('autocomplete')?.disable()
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(inputElement.disabled).toBe(true)
    })
  })

  describe('Validation', () => {
    it('should show required indicator when required', async () => {
      hostComponent.form.get('autocomplete')?.setValidators([Validators.required])
      hostComponent.form.get('autocomplete')?.updateValueAndValidity()
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      const requiredIndicator = hostFixture.nativeElement.querySelector('label span')
      expect(requiredIndicator).toBeTruthy()
    })

    it('should show error message when invalid and touched', async () => {
      hostComponent.form.get('autocomplete')?.setValidators([Validators.required])
      hostComponent.form.get('autocomplete')?.updateValueAndValidity()
      hostComponent.form.get('autocomplete')?.markAsTouched()
      hostComponent.form.get('autocomplete')?.markAsDirty()
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      // Trigger checkFormErrors to update internal state
      autocompleteComponent.checkFormErrors()
      hostFixture.detectChanges()

      expect(autocompleteComponent._showErrors()).toBe(true)

      const invalidFeedback = hostFixture.nativeElement.querySelector('.invalid-feedback') as HTMLDivElement | null
      expect(invalidFeedback).toBeTruthy()
      expect(invalidFeedback?.classList.contains('d-block')).toBe(true)
      expect(invalidFeedback?.textContent).toContain('This field is required')
    })

    it('should hide error message when valid', async () => {
      hostComponent.form.get('autocomplete')?.setValidators([Validators.required])
      hostComponent.form.get('autocomplete')?.setValue('opt1')
      hostComponent.form.get('autocomplete')?.markAsTouched()
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(autocompleteComponent._showErrors()).toBe(false)
    })
  })

  describe('Helper Methods', () => {
    it('should get description for chip value', () => {
      const description = autocompleteComponent.getDescription('opt1')
      expect(description).toBe('Option 1')
    })

    it('should return chip value for unknown chip value', () => {
      const description = autocompleteComponent.getDescription('unknown')
      expect(description).toBe('unknown')
    })

    it('should check input value against options on blur', async () => {
      // Simulate user typing 'Option 1' (entering search mode)
      autocompleteComponent['_isSearching'].set(true)
      autocompleteComponent['_userSearchText'].set('Option 1')
      autocompleteComponent['processTextToFormValue']('Option 1', {
        exitSearchMode: true,
        updateOnMatch: true,
        clearSearchText: true,
      })
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(hostComponent.form.get('autocomplete')?.value).toBe('opt1')
    })
  })
})

describe('QuangAutocompleteComponent - Multiple Selection', () => {
  let hostComponent: TestHostMultipleComponent
  let hostFixture: ComponentFixture<TestHostMultipleComponent>
  let autocompleteDebugElement: DebugElement
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [TestHostMultipleComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    hostFixture = TestBed.createComponent(TestHostMultipleComponent)
    hostComponent = hostFixture.componentInstance
    hostFixture.detectChanges()

    autocompleteDebugElement = hostFixture.debugElement.query(By.directive(QuangAutocompleteComponent))
    autocompleteComponent = autocompleteDebugElement.componentInstance
  })

  afterEach(() => {
    hostFixture.destroy()
    vi.useRealTimers()
  })

  describe('Multiple Selection Mode', () => {
    it('should be in multiple selection mode', () => {
      expect(autocompleteComponent.multiple()).toBe(true)
    })

    it('should add chip when option is selected', async () => {
      autocompleteComponent.onValueChange('opt1')
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(autocompleteComponent._chipList()).toContain('opt1')
    })

    it('should add multiple chips', async () => {
      autocompleteComponent.onValueChange('opt1')
      await vi.advanceTimersByTimeAsync(0)
      autocompleteComponent.onValueChange('opt2')
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(autocompleteComponent._chipList().length).toBe(2)
      expect(autocompleteComponent._chipList()).toContain('opt1')
      expect(autocompleteComponent._chipList()).toContain('opt2')
    })

    it('should not add duplicate chips', async () => {
      autocompleteComponent.onValueChange('opt1')
      await vi.advanceTimersByTimeAsync(0)
      autocompleteComponent.onValueChange('opt1')
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(autocompleteComponent._chipList().filter((c) => c === 'opt1').length).toBe(1)
    })

    it('should delete chip', async () => {
      autocompleteComponent.onValueChange('opt1')
      autocompleteComponent.onValueChange('opt2')
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      autocompleteComponent.deleteChip('opt1')
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(autocompleteComponent._chipList()).not.toContain('opt1')
      expect(autocompleteComponent._chipList()).toContain('opt2')
    })

    it('should delete a single chip when Backspace is pressed on the chip after returning to the input', async () => {
      hostComponent.form.get('autocomplete')?.setValue(['opt1', 'opt2', 'opt3'])
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()
      expect(autocompleteComponent._chipList().length).toBe(3)

      const inputEl = hostFixture.nativeElement.querySelector('input') as HTMLInputElement

      // Backspace on the empty input moves the focus to the last chip
      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }))
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      // The user goes back to the input without pressing Backspace on the chip
      inputEl.focus()
      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }))
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      const chipButtons = hostFixture.nativeElement.querySelectorAll('.chip button.btn-chip')
      const lastChipButton = chipButtons[chipButtons.length - 1] as HTMLButtonElement
      lastChipButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }))
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(autocompleteComponent._chipList()).toEqual(['opt1', 'opt2'])
    })

    it('should update form control with chip list', async () => {
      autocompleteComponent.onValueChange('opt1')
      autocompleteComponent.onValueChange('opt2')
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(hostComponent.form.get('autocomplete')?.value).toEqual(['opt1', 'opt2'])
    })

    it('should filter out selected options from dropdown', async () => {
      autocompleteComponent._chipList.set(['opt1'])
      // Not in search mode, so _filteredOptions uses empty search text
      autocompleteComponent['_isSearching'].set(false)
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      const filteredOptions = autocompleteComponent._filteredOptions()
      expect(filteredOptions.find((o) => o.value === 'opt1')).toBeUndefined()
    })

    it('should render chips in template', async () => {
      autocompleteComponent.onValueChange('opt1')
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      const chips = hostFixture.nativeElement.querySelectorAll('.chip')
      expect(chips.length).toBe(1)
    })

    it('should initialize with existing array value', async () => {
      hostComponent.form.get('autocomplete')?.setValue(['opt1', 'opt2'])
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(autocompleteComponent._chipList().length).toBe(2)
    })
  })
})

describe('QuangAutocompleteComponent - Multiple Selection (Templated Chips)', () => {
  let hostFixture: ComponentFixture<TestHostMultipleTemplatedComponent>
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [TestHostMultipleTemplatedComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    hostFixture = TestBed.createComponent(TestHostMultipleTemplatedComponent)
    hostFixture.detectChanges()

    const hostComponent = hostFixture.componentInstance
    hostComponent.setTemplatedOptions()
    hostFixture.detectChanges()

    autocompleteComponent = hostFixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    hostFixture.destroy()
    vi.useRealTimers()
  })

  it('should render the selected option renderer template inside the chip', async () => {
    autocompleteComponent.onValueChange('opt1')
    await vi.advanceTimersByTimeAsync(0)
    hostFixture.detectChanges()

    const custom = hostFixture.nativeElement.querySelector('.custom-chip-opt') as HTMLElement | null
    expect(custom).toBeTruthy()
    expect(custom?.textContent).toContain('Custom Option 1')
    expect(custom?.textContent).toContain('selected: true')
  })
})

describe('QuangAutocompleteComponent - Multiple Selection + AllowFreeText', () => {
  let hostFixture: ComponentFixture<TestHostMultipleAllowFreeTextComponent>
  let hostComponent: TestHostMultipleAllowFreeTextComponent
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [TestHostMultipleAllowFreeTextComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    hostFixture = TestBed.createComponent(TestHostMultipleAllowFreeTextComponent)
    hostComponent = hostFixture.componentInstance
    hostFixture.detectChanges()
    autocompleteComponent = hostFixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    hostFixture.destroy()
    vi.useRealTimers()
  })

  it('should add custom text as chip on Enter', async () => {
    autocompleteComponent.showOptionVisibility()
    autocompleteComponent['_userSearchText'].set('custom chip')
    autocompleteComponent.onInputKeydown(new KeyboardEvent('keydown', { key: 'Enter' }))

    await vi.advanceTimersByTimeAsync(0)
    hostFixture.detectChanges()

    expect(autocompleteComponent._chipList()).toEqual(['custom chip'])
    expect(hostComponent.form.get('autocomplete')?.value).toEqual(['custom chip'])
  })

  it('should keep previous chips when adding custom text', async () => {
    autocompleteComponent.onValueChange('opt1')
    await vi.advanceTimersByTimeAsync(0)
    hostFixture.detectChanges()

    autocompleteComponent.showOptionVisibility()
    autocompleteComponent['_userSearchText'].set('custom chip')
    autocompleteComponent.onInputKeydown(new KeyboardEvent('keydown', { key: 'Enter' }))

    await vi.advanceTimersByTimeAsync(0)
    hostFixture.detectChanges()

    expect(autocompleteComponent._chipList()).toEqual(['opt1', 'custom chip'])
    expect(hostComponent.form.get('autocomplete')?.value).toEqual(['opt1', 'custom chip'])
  })
})

describe('QuangAutocompleteComponent - Internal Filter Options', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    fixture.detectChanges()

    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should filter options internally by default', async () => {
    // Enter search mode and set search text
    autocompleteComponent['_isSearching'].set(true)
    autocompleteComponent['_userSearchText'].set('Another')
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    const filtered = autocompleteComponent._filteredOptions()
    expect(filtered.length).toBe(1)
    expect(filtered[0].value).toBe('another')
  })

  it('should return all options when input is empty', async () => {
    // When not searching (or searching with empty text), show all options
    autocompleteComponent['_isSearching'].set(false)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    const filtered = autocompleteComponent._filteredOptions()
    expect(filtered.length).toBe(4)
  })
})

describe('QuangAutocompleteComponent - SyncFormWithText', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <quang-autocomplete
          [searchTextDebounce]="50"
          [selectOptions]="options"
          [syncFormWithText]="true"
          [updateValueOnType]="true"
          formControlName="autocomplete"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  })
  class SyncFormTestHostComponent {
    form = new FormGroup({
      autocomplete: new FormControl<string | null>(null),
    })

    options: SelectOption[] = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
    ]
  }

  let fixture: ComponentFixture<SyncFormTestHostComponent>
  let hostComponent: SyncFormTestHostComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [SyncFormTestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(SyncFormTestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should sync form with typed text', async () => {
    const autocompleteComp = fixture.debugElement.query(By.directive(QuangAutocompleteComponent))
      .componentInstance as QuangAutocompleteComponent

    // Simulate typing via onChangeInput (which sets _inputValue and triggers debounced emission)
    const mockEvent = { target: { value: 'custom text' } } as unknown as Event
    autocompleteComp.onChangeInput(mockEvent)
    // Wait for debounce - SyncFormTestHostComponent sets debounce to 50ms
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // When syncFormWithText is true, the component calls onValueChange
    // which then calls onChangedHandler to update the form
    expect(hostComponent.form.get('autocomplete')?.value).toBe('custom text')
  })
})

describe('QuangAutocompleteComponent - AllowFreeText', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <quang-autocomplete
          [allowFreeText]="true"
          [searchTextDebounce]="50"
          [selectOptions]="options"
          [updateValueOnType]="true"
          formControlName="autocomplete"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  })
  class AllowFreeTextTestHostComponent {
    form = new FormGroup({
      autocomplete: new FormControl<string | null>(null),
    })

    options: SelectOption[] = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
    ]
  }

  let fixture: ComponentFixture<AllowFreeTextTestHostComponent>
  let hostComponent: AllowFreeTextTestHostComponent
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [AllowFreeTextTestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(AllowFreeTextTestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should allow any text as form value when allowFreeText is true', async () => {
    // Simulate typing custom text that doesn't match any option
    const mockEvent = { target: { value: 'my custom text' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)

    // Wait for debounce
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Form should have the custom text as its value
    expect(hostComponent.form.get('autocomplete')?.value).toBe('my custom text')
  })

  it('should display custom text in input when value does not match any option', async () => {
    // Set form value to custom text that doesn't match any option
    hostComponent.form.patchValue({ autocomplete: 'custom value' })
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // _inputValue should display the custom text (since no option matches)
    expect(autocompleteComponent._inputValue()).toBe('custom value')
  })

  it('should still display option label when value matches an option', async () => {
    // Set form value to an existing option value
    hostComponent.form.patchValue({ autocomplete: 'opt1' })
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // _inputValue should display the option's label
    expect(autocompleteComponent._inputValue()).toBe('Option 1')
  })

  it('should not clear form value on blur when text does not match an option', async () => {
    // Type custom text
    const mockEvent = { target: { value: 'unmatched text' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    expect(hostComponent.form.get('autocomplete')?.value).toBe('unmatched text')

    // Simulate blur (which triggers processTextToFormValue)
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Value should NOT be cleared because allowFreeText is true
    expect(hostComponent.form.get('autocomplete')?.value).toBe('unmatched text')
  })

  it('should work with _allowFreeTextInternal computed', () => {
    // The internal computed should reflect allowFreeText being true
    expect(autocompleteComponent['_allowFreeTextInternal']()).toBe(true)
  })
})

describe('QuangAutocompleteComponent - EmitOnly Mode', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <quang-autocomplete
          [emitOnly]="true"
          [searchTextDebounce]="50"
          [selectOptions]="options"
          (selectedOption)="onSelected($event)"
          formControlName="autocomplete"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  })
  class EmitOnlyTestHostComponent {
    form = new FormGroup({
      autocomplete: new FormControl<string | null>(null),
    })

    options: SelectOption[] = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
    ]

    selectedValue: string | number | null = null

    onSelected(value: string | number | null): void {
      this.selectedValue = value
    }
  }

  let fixture: ComponentFixture<EmitOnlyTestHostComponent>
  let hostComponent: EmitOnlyTestHostComponent
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [EmitOnlyTestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(EmitOnlyTestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()

    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should be in emit only mode', () => {
    expect(autocompleteComponent.emitOnly()).toBe(true)
  })

  it('should emit selected option without clearing input on blur', async () => {
    autocompleteComponent.onValueChange('opt1')
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(hostComponent.selectedValue).toBe('opt1')
  })
})

describe('QuangAutocompleteComponent - Visibility Control', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    fixture.detectChanges()

    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should show options on showOptionVisibility', async () => {
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._showOptions()).toBe(true)
  })

  it('should hide options on hideOptionVisibility', async () => {
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()
    expect(autocompleteComponent._showOptions()).toBe(true)

    autocompleteComponent.hideOptionVisibility()
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    expect(autocompleteComponent._showOptions()).toBe(false)
  })

  it('should clear pending hide timeout when showing options', async () => {
    autocompleteComponent.hideOptionVisibility()
    await vi.advanceTimersByTimeAsync(10) // Partial timeout
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    expect(autocompleteComponent._showOptions()).toBe(true)
  })

  it('should hide options immediately when skipTimeout is true', async () => {
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    autocompleteComponent.hideOptionVisibility()
    await vi.advanceTimersByTimeAsync(10)
    fixture.detectChanges()

    expect(autocompleteComponent._showOptions()).toBe(false)
  })
})

describe('QuangAutocompleteComponent - WriteValue', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    fixture.detectChanges()

    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should handle writeValue with string value', async () => {
    autocompleteComponent.writeValue('opt1')
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._value()).toBe('opt1')
    expect(autocompleteComponent._inputValue()).toBe('Option 1')
  })

  it('should handle writeValue with number value', async () => {
    // Test with existing options that have number values
    autocompleteComponent.writeValue(123)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._value()).toBe(123)
  })

  it('should preserve user search text when writeValue is called during active search', async () => {
    // Set up: user types something, triggering search mode
    autocompleteComponent['_isSearching'].set(true)
    autocompleteComponent['_userSearchText'].set('Some text')
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // When writeValue is called while user is searching,
    // their typed text should be preserved (this is key for NGRX compatibility)
    autocompleteComponent.writeValue('nonexistent')
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // _value is updated but _inputValue still shows user's search text
    // because _isSearching is still true
    expect(autocompleteComponent._value()).toBe('nonexistent')
    expect(autocompleteComponent._inputValue()).toBe('Some text')
  })

  it('should derive input from value when not searching and value not found', async () => {
    // Not in search mode
    autocompleteComponent['_isSearching'].set(false)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // writeValue with nonexistent value
    autocompleteComponent.writeValue('nonexistent')
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // Since 'nonexistent' doesn't match any option and we're not searching,
    // _inputValue should be '' (derived from _value with no matching option)
    expect(autocompleteComponent._inputValue()).toBe('')
  })
})

describe('QuangAutocompleteComponent - Bug Fix: Click after clearing input', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let hostComponent: TestHostComponent
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()

    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should allow selecting an option after clearing input text (bug scenario)', async () => {
    // Scenario: After form submit and patch, user clears input and clicks new option
    // Bug: clicking option did nothing because onBlurHandler patched null after selection

    // Step 1: Set initial value via form patch (simulating form submit + reload)
    hostComponent.form.patchValue({ autocomplete: 'opt1' })
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._value()).toBe('opt1')
    expect(autocompleteComponent._inputValue()).toBe('Option 1')

    // Step 2: User clears the input text by typing (entering search mode)
    autocompleteComponent['_isSearching'].set(true)
    autocompleteComponent['_userSearchText'].set('')
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // Step 3: User clicks on a different option
    // The click should work even after input is cleared
    autocompleteComponent.onValueChange('opt2')
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._value()).toBe('opt2')
    expect(autocompleteComponent._inputValue()).toBe('Option 2')
    expect(hostComponent.form.get('autocomplete')?.value).toBe('opt2')

    // Step 4: Ensure the blur handler doesn't override the selection
    // (This is where the bug manifested - the 100ms timeout would patch null)
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Value should still be opt2, not reverted to null
    expect(autocompleteComponent._value()).toBe('opt2')
    expect(hostComponent.form.get('autocomplete')?.value).toBe('opt2')
  })

  it('should not revert value when blur happens after option selection', async () => {
    // This test specifically checks the timing issue between blur and click

    // Set up with a value
    hostComponent.form.patchValue({ autocomplete: 'opt1' })
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // Clear input (user deleted text) - enter search mode
    autocompleteComponent['_isSearching'].set(true)
    autocompleteComponent['_userSearchText'].set('')
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // Simulate blur happening (this starts the 100ms timeout)
    autocompleteComponent.onBlurHandler()

    // Immediately select a new value (click happens before timeout)
    autocompleteComponent.onValueChange('opt3')
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._value()).toBe('opt3')

    // Now let the blur timeout complete
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // The selection should persist, not be overwritten by blur's patch(null)
    expect(autocompleteComponent._value()).toBe('opt3')
    expect(hostComponent.form.get('autocomplete')?.value).toBe('opt3')
  })

  it('should work with syncFormWithText=true and internalFilterOptions=true', async () => {
    // Configure to match the playground test case
    hostComponent.syncFormWithText = true
    fixture.detectChanges()
    await vi.advanceTimersByTimeAsync(0)

    // Step 1: Select an option
    autocompleteComponent.onValueChange('opt1')
    await vi.advanceTimersByTimeAsync(60) // wait for debounce
    fixture.detectChanges()

    expect(autocompleteComponent._value()).toBe('opt1')
    expect(autocompleteComponent._inputValue()).toBe('Option 1')

    // Step 2: Simulate form reset (like after submit)
    hostComponent.form.reset()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._value()).toBe(null)
    expect(autocompleteComponent._inputValue()).toBe('')

    // Step 3: User opens options (shows all options since input is empty)
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._showOptions()).toBe(true)
    expect(autocompleteComponent._filteredOptions().length).toBe(4) // all options

    // Step 4: User clicks on an option - THIS IS THE BUG SCENARIO
    autocompleteComponent.onValueChange('opt2')
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // The selection should work
    expect(autocompleteComponent._value()).toBe('opt2')
    expect(autocompleteComponent._inputValue()).toBe('Option 2')
    expect(hostComponent.form.get('autocomplete')?.value).toBe('opt2')
  })
})

describe('QuangAutocompleteComponent - AutoSelectOnExactMatch', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <quang-autocomplete
          [autoSelectOnExactMatch]="autoSelectOnExactMatch()"
          [searchTextDebounce]="50"
          [selectOptions]="options"
          formControlName="autocomplete"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  })
  class AutoSelectTestHostComponent {
    form = new FormGroup({
      autocomplete: new FormControl<string | null>(null),
    })

    options: SelectOption[] = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
      { label: 'Italy', value: 'IT' },
    ]

    autoSelectOnExactMatch = signal(true)
  }

  let fixture: ComponentFixture<AutoSelectTestHostComponent>
  let hostComponent: AutoSelectTestHostComponent
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [AutoSelectTestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(AutoSelectTestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should auto-select option when user types exact label (case-insensitive)', async () => {
    // Type "italy" in lowercase
    const mockEvent = { target: { value: 'italy' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Trigger blur which calls processTextToFormValue
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Should auto-select "Italy" option with value "IT"
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
  })

  it('should auto-select option when user types exact label with extra whitespace', async () => {
    // Type "  Italy  " with whitespace
    const mockEvent = { target: { value: '  Italy  ' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Trigger blur
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Should auto-select "Italy" option
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
  })

  it('should auto-select option when user types exact label in UPPERCASE', async () => {
    // Type "OPTION 1" in uppercase
    const mockEvent = { target: { value: 'OPTION 1' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Trigger blur
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Should auto-select "Option 1" option
    expect(hostComponent.form.get('autocomplete')?.value).toBe('opt1')
  })

  it('should NOT auto-select when autoSelectOnExactMatch is false', async () => {
    // Disable auto-select
    hostComponent.autoSelectOnExactMatch.set(false)
    fixture.detectChanges()

    // Type "Italy"
    const mockEvent = { target: { value: 'Italy' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Trigger blur
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Value should be cleared since it doesn't match and autoSelect is disabled
    expect(hostComponent.form.get('autocomplete')?.value).toBe(null)
  })

  it('should clear value when text does not match any option label', async () => {
    // Type something that doesn't match
    const mockEvent = { target: { value: 'nonexistent' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Trigger blur
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Value should be cleared
    expect(hostComponent.form.get('autocomplete')?.value).toBe(null)
  })

  it('should not change value when it already matches the found option', async () => {
    // Pre-select an option
    hostComponent.form.patchValue({ autocomplete: 'IT' })
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._inputValue()).toBe('Italy')

    // Type the same label
    const mockEvent = { target: { value: 'Italy' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Trigger blur
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Value should remain the same
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
  })

  it('should handle partial matches correctly (not auto-select)', async () => {
    // Type "Option" which partially matches multiple options but isn't exact
    const mockEvent = { target: { value: 'Option' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Trigger blur
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Value should be cleared since "Option" doesn't exactly match any label
    expect(hostComponent.form.get('autocomplete')?.value).toBe(null)
  })

  it('should clear form value when user modifies text to no longer match an option (on blur)', async () => {
    // Step 1: Type "italy" which matches an option
    const mockEvent1 = { target: { value: 'italy' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent1)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Trigger blur to select the option
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Verify "Italy" was selected (value = 'IT')
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')

    // Step 2: User clicks back on input and deletes the 'y', making it "ital"
    const mockEvent2 = { target: { value: 'ital' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent2)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // With updateValueOnType=false (default), form value should NOT be cleared while typing
    // It should still have 'IT' until the user blurs
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')

    // Step 3: Trigger blur - NOW the form should be cleared because "ital" doesn't match
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Form value should be cleared on blur because "ital" doesn't match any option
    expect(hostComponent.form.get('autocomplete')?.value).toBe(null)
  })

  it('should preserve form value when user focuses and blurs without typing (bug fix)', async () => {
    // This test reproduces a bug where:
    // 1. User selects "Italy" → form has 'IT', component shows "Italy"
    // 2. User clicks on the component (focus) but doesn't type anything
    // 3. User clicks outside (blur) → component was clearing but form had 'IT'
    //
    // Expected: Both the component display and form value should remain unchanged

    // Step 1: Select "Italy" option
    autocompleteComponent.onValueChange('IT')
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Verify initial state
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
    expect(autocompleteComponent._inputValue()).toBe('Italy')
    expect(autocompleteComponent._value()).toBe('IT')

    // Step 2: Simulate user clicking on input (focus) - this shows options
    // but user does NOT type anything
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._showOptions()).toBe(true)

    // Step 3: Simulate blur (user clicks outside without typing anything)
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150) // Wait for blur timeout
    fixture.detectChanges()

    // CRITICAL: Both form value and component display should be preserved
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
    expect(autocompleteComponent._inputValue()).toBe('Italy')
    expect(autocompleteComponent._value()).toBe('IT')

    // Step 4: Do it again to ensure consistent behavior
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Should still be preserved
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
    expect(autocompleteComponent._inputValue()).toBe('Italy')
    expect(autocompleteComponent._value()).toBe('IT')
  })

  it('should preserve form value when user tabs away and back without typing (bug fix: tab navigation)', async () => {
    // This test reproduces a bug where:
    // 1. User selects an option → form has value, input shows label
    // 2. User tabs forward to leave the autocomplete
    // 3. User tabs back to the autocomplete → text is selected (browser behavior)
    // 4. User tabs away again (without typing) → the autocomplete value is emptied
    //
    // Expected: Form value should be preserved when tabbing away without modifications

    // Step 1: Select "Italy" option
    autocompleteComponent.onValueChange('IT')
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Verify initial state
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
    expect(autocompleteComponent._inputValue()).toBe('Italy')

    // Step 2: Simulate tabbing away (blur without dropdown interaction)
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Value should be preserved after first blur
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
    expect(autocompleteComponent._inputValue()).toBe('Italy')

    // Step 3: Simulate tabbing back to the autocomplete (focus)
    // When the input gets focus, showOptionVisibility is typically called
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // At this point, the browser would select all text, but _userSearchText should have "Italy"
    expect(autocompleteComponent['_userSearchText']()).toBe('Italy')
    expect(autocompleteComponent['_isSearching']()).toBe(true)

    // Step 4: Tab away again WITHOUT typing anything
    // This is where the bug occurred - the value was being cleared
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // CRITICAL: Value should still be preserved
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
    expect(autocompleteComponent._inputValue()).toBe('Italy')
    expect(autocompleteComponent._value()).toBe('IT')

    // Step 5: Do it multiple times to ensure consistent behavior
    for (let i = 0; i < 3; i++) {
      autocompleteComponent.showOptionVisibility()
      await vi.advanceTimersByTimeAsync(0)
      fixture.detectChanges()

      autocompleteComponent.onBlurHandler()
      await vi.advanceTimersByTimeAsync(150)
      fixture.detectChanges()

      expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
      expect(autocompleteComponent._inputValue()).toBe('Italy')
    }
  })

  it('should highlight option only when exact match is found while typing', async () => {
    // This test verifies that _highlightedValue correctly tracks matching options during typing
    // This keeps the option list highlighting in sync with what will be selected on blur

    // Step 1: Select "Italy" option initially
    autocompleteComponent.onValueChange('IT')
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Verify highlighted value matches selected value when not searching
    expect(autocompleteComponent['_highlightedValue']()).toBe('IT')

    // Step 2: Start typing "Ital" (partial match - should NOT highlight)
    const mockEvent1 = { target: { value: 'Ital' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent1)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Should NOT highlight any option since "Ital" is not an exact match
    expect(autocompleteComponent['_highlightedValue']()).toBe(null)

    // Step 3: Complete typing "Italy" (exact match - should highlight)
    const mockEvent2 = { target: { value: 'Italy' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent2)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Should highlight 'IT' since "Italy" exactly matches the label
    expect(autocompleteComponent['_highlightedValue']()).toBe('IT')

    // Step 4: Delete a character to "Ital" again
    const mockEvent3 = { target: { value: 'Ital' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent3)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Should NOT highlight anymore
    expect(autocompleteComponent['_highlightedValue']()).toBe(null)

    // Step 5: Type back to "Italy"
    const mockEvent4 = { target: { value: 'Italy' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent4)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Should highlight 'IT' again
    expect(autocompleteComponent['_highlightedValue']()).toBe('IT')

    // Step 6: Blur - should select the highlighted option
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
    expect(autocompleteComponent._inputValue()).toBe('Italy')
  })
})

describe('QuangAutocompleteComponent - UpdateValueOnType', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <quang-autocomplete
          [allowFreeText]="allowFreeText()"
          [autoSelectOnExactMatch]="autoSelectOnExactMatch()"
          [searchTextDebounce]="50"
          [selectOptions]="options()"
          [updateValueOnType]="updateValueOnType()"
          formControlName="autocomplete"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  })
  class UpdateValueOnTypeTestHostComponent {
    form = new FormGroup({
      autocomplete: new FormControl<string | null>(null),
    })

    options = signal<SelectOption[]>([
      { label: 'Italy', value: 'IT' },
      { label: 'France', value: 'FR' },
      { label: 'Germany', value: 'DE' },
    ])

    updateValueOnType = signal(false)
    allowFreeText = signal(false)
    autoSelectOnExactMatch = signal(true)
  }

  let fixture: ComponentFixture<UpdateValueOnTypeTestHostComponent>
  let hostComponent: UpdateValueOnTypeTestHostComponent
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [UpdateValueOnTypeTestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(UpdateValueOnTypeTestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should NOT update form value while typing when updateValueOnType is false (default)', async () => {
    // Default is false
    expect(hostComponent.updateValueOnType()).toBe(false)

    // Type an exact match
    const mockEvent = { target: { value: 'Italy' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Form value should still be null (not updated during typing)
    expect(hostComponent.form.get('autocomplete')?.value).toBeNull()
  })

  it('should update form value while typing when updateValueOnType is true and exact match found', async () => {
    hostComponent.updateValueOnType.set(true)
    fixture.detectChanges()

    // Type an exact match
    const mockEvent = { target: { value: 'Italy' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Form value should be updated during typing
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
  })

  it('should update form value while typing with free text when updateValueOnType is true', async () => {
    hostComponent.updateValueOnType.set(true)
    hostComponent.allowFreeText.set(true)
    fixture.detectChanges()

    // Type custom text that doesn't match any option
    const mockEvent = { target: { value: 'custom value' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Form value should be updated with free text
    expect(hostComponent.form.get('autocomplete')?.value).toBe('custom value')
  })

  it('should sync form value while typing with free text even when updateValueOnType is false', async () => {
    // With allowFreeText, the input text IS the form value, so the value must
    // stay in sync as the user types regardless of the updateValueOnType flag.
    hostComponent.updateValueOnType.set(false)
    hostComponent.allowFreeText.set(true)
    fixture.detectChanges()

    // Type custom text
    const mockEvent = { target: { value: 'custom value' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Form value is synced with the typed text while typing
    expect(hostComponent.form.get('autocomplete')?.value).toBe('custom value')

    // And it remains after blur
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    expect(hostComponent.form.get('autocomplete')?.value).toBe('custom value')
  })

  it('should auto-select exact match on blur regardless of updateValueOnType setting', async () => {
    hostComponent.updateValueOnType.set(false)
    fixture.detectChanges()

    // Type an exact match
    const mockEvent = { target: { value: 'France' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Value not updated yet (updateValueOnType is false)
    expect(hostComponent.form.get('autocomplete')?.value).toBeNull()

    // Trigger blur
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Now value should be set
    expect(hostComponent.form.get('autocomplete')?.value).toBe('FR')
  })

  it('should respect autoSelectOnExactMatch=false when updateValueOnType is true', async () => {
    hostComponent.updateValueOnType.set(true)
    hostComponent.autoSelectOnExactMatch.set(false)
    hostComponent.allowFreeText.set(true)
    fixture.detectChanges()

    // Type an exact match
    const mockEvent = { target: { value: 'Germany' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Since autoSelectOnExactMatch is false and allowFreeText is true,
    // it should set the text as the value, not the option value
    expect(hostComponent.form.get('autocomplete')?.value).toBe('Germany')
  })

  it('should NOT update form value when autoSelectOnExactMatch=false and allowFreeText=false', async () => {
    hostComponent.updateValueOnType.set(true)
    hostComponent.autoSelectOnExactMatch.set(false)
    hostComponent.allowFreeText.set(false)
    fixture.detectChanges()

    // Type an exact match
    const mockEvent = { target: { value: 'Germany' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Since autoSelectOnExactMatch is false and allowFreeText is false,
    // nothing should be updated
    expect(hostComponent.form.get('autocomplete')?.value).toBeNull()
  })

  it('should handle case-insensitive matching when updateValueOnType is true', async () => {
    hostComponent.updateValueOnType.set(true)
    fixture.detectChanges()

    // Type in lowercase
    const mockEvent = { target: { value: 'italy' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Should match 'Italy' and set value to 'IT'
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
  })

  it('should handle whitespace-trimmed matching when updateValueOnType is true', async () => {
    hostComponent.updateValueOnType.set(true)
    fixture.detectChanges()

    // Type with extra whitespace
    const mockEvent = { target: { value: '  France  ' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Should match 'France' and set value to 'FR'
    expect(hostComponent.form.get('autocomplete')?.value).toBe('FR')
  })

  it('should clear form value while typing non-matching text when updateValueOnType is true and allowFreeText is false (updateValueWithoutExitingSearchMode)', async () => {
    // Set an initial value
    hostComponent.form.get('autocomplete')?.setValue('IT')
    hostComponent.updateValueOnType.set(true)
    hostComponent.allowFreeText.set(false)
    fixture.detectChanges()

    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')

    // Type something that doesn't match any option
    const mockEvent = { target: { value: 'xyz' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Form value should be cleared (empty string) via updateValueWithoutExitingSearchMode
    // This clears the value while staying in search mode
    expect(hostComponent.form.get('autocomplete')?.value).toBe('')

    // Component should still be in search mode
    expect(autocompleteComponent['_isSearching']()).toBe(true)
    expect(autocompleteComponent['_userSearchText']()).toBe('xyz')
  })

  it('should keep form value when typing matching text after clearing with updateValueOnType true', async () => {
    // Set an initial value
    hostComponent.form.get('autocomplete')?.setValue('IT')
    hostComponent.updateValueOnType.set(true)
    hostComponent.allowFreeText.set(false)
    fixture.detectChanges()

    // Type something that doesn't match - should clear
    let mockEvent = { target: { value: 'xyz' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()
    expect(hostComponent.form.get('autocomplete')?.value).toBe('')

    // Now type a matching value
    mockEvent = { target: { value: 'France' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Form value should be set to the matching option
    expect(hostComponent.form.get('autocomplete')?.value).toBe('FR')
  })

  it('should handle option with null value on blur (shouldAutoSelect with exitSearchMode=true)', async () => {
    // Add an option with undefined value (to test ?? '' fallback)
    hostComponent.options.set([
      { label: 'Italy', value: 'IT' },
      { label: 'None', value: undefined as unknown as string },
    ])
    hostComponent.updateValueOnType.set(false)
    fixture.detectChanges()
    await vi.advanceTimersByTimeAsync(10)
    fixture.detectChanges()

    // Type exact match for option with undefined value
    const mockEvent = { target: { value: 'None' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Trigger blur - should auto-select and use '' fallback for undefined value
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Value should be empty string (fallback for undefined)
    expect(hostComponent.form.get('autocomplete')?.value).toBe('')
  })

  it('should handle option with null value while typing (shouldAutoSelect with exitSearchMode=false)', async () => {
    // Add an option with undefined value (to test ?? '' fallback)
    hostComponent.options.set([
      { label: 'Italy', value: 'IT' },
      { label: 'None', value: undefined as unknown as string },
    ])
    hostComponent.updateValueOnType.set(true)
    fixture.detectChanges()
    await vi.advanceTimersByTimeAsync(10)
    fixture.detectChanges()

    // Type exact match for option with undefined value
    const mockEvent = { target: { value: 'None' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Value should be empty string (fallback for undefined via onValueChange path)
    expect(hostComponent.form.get('autocomplete')?.value).toBe('')
  })
})

describe('QuangAutocompleteComponent - Keyboard Navigation', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <quang-autocomplete
          [allowFreeText]="allowFreeText()"
          [searchTextDebounce]="50"
          [selectOptions]="options()"
          formControlName="autocomplete"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  })
  class KeyboardNavTestHostComponent {
    form = new FormGroup({
      autocomplete: new FormControl<string | null>(null),
    })

    options = signal<SelectOption[]>([
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
      { label: 'Option 3', value: 'opt3' },
    ])

    allowFreeText = signal(false)
  }

  let fixture: ComponentFixture<KeyboardNavTestHostComponent>
  let hostComponent: KeyboardNavTestHostComponent
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [KeyboardNavTestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(KeyboardNavTestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should open dropdown on ArrowDown when closed', async () => {
    expect(autocompleteComponent._showOptions()).toBeFalsy()

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
    autocompleteComponent.onInputKeydown(event)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._showOptions()).toBe(true)
    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('should not prevent default on ArrowDown when dropdown is already open', async () => {
    autocompleteComponent.showOptionVisibility()
    fixture.detectChanges()

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
    autocompleteComponent.onInputKeydown(event)

    expect(preventDefaultSpy).not.toHaveBeenCalled()
  })

  it('should open dropdown on ArrowUp when closed', async () => {
    expect(autocompleteComponent._showOptions()).toBeFalsy()

    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
    autocompleteComponent.onInputKeydown(event)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._showOptions()).toBe(true)
    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('should close dropdown on Escape when open', async () => {
    autocompleteComponent.showOptionVisibility()
    fixture.detectChanges()
    expect(autocompleteComponent._showOptions()).toBe(true)

    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
    autocompleteComponent.onInputKeydown(event)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._showOptions()).toBe(false)
    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('should not do anything on Escape when dropdown is closed', async () => {
    expect(autocompleteComponent._showOptions()).toBeFalsy()

    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
    autocompleteComponent.onInputKeydown(event)

    expect(preventDefaultSpy).not.toHaveBeenCalled()
  })

  it('should handle Enter key with allowFreeText and no filtered options', async () => {
    hostComponent.allowFreeText.set(true)
    fixture.detectChanges()

    // Type text that doesn't match any option
    const mockEvent = { target: { value: 'custom text' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Now filter to empty (simulate filtering that returns no results)
    hostComponent.options.set([])
    fixture.detectChanges()

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    const preventDefaultSpy = vi.spyOn(enterEvent, 'preventDefault')
    autocompleteComponent.onInputKeydown(enterEvent)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(preventDefaultSpy).toHaveBeenCalled()
    expect(autocompleteComponent._showOptions()).toBe(false)
    expect(hostComponent.form.get('autocomplete')?.value).toBe('custom text')
  })

  it('should not handle Enter specially when allowFreeText is false', async () => {
    hostComponent.allowFreeText.set(false)
    fixture.detectChanges()

    autocompleteComponent.showOptionVisibility()
    fixture.detectChanges()

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    const preventDefaultSpy = vi.spyOn(enterEvent, 'preventDefault')
    autocompleteComponent.onInputKeydown(enterEvent)

    // Should not prevent default when allowFreeText is false
    expect(preventDefaultSpy).not.toHaveBeenCalled()
  })

  it('should not handle Enter specially when there are filtered options', async () => {
    hostComponent.allowFreeText.set(true)
    fixture.detectChanges()

    autocompleteComponent.showOptionVisibility()
    fixture.detectChanges()

    // Options are available, so Enter should be handled by option-list
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    const preventDefaultSpy = vi.spyOn(enterEvent, 'preventDefault')
    autocompleteComponent.onInputKeydown(enterEvent)

    expect(preventDefaultSpy).not.toHaveBeenCalled()
  })
})

describe('QuangAutocompleteComponent - onValueChange with null', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <quang-autocomplete
          [allowFreeText]="true"
          [searchTextDebounce]="50"
          [selectOptions]="options"
          (selectedOption)="onSelected($event)"
          formControlName="autocomplete"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  })
  class NullValueTestHostComponent {
    form = new FormGroup({
      autocomplete: new FormControl<string | null>(null),
    })

    options: SelectOption[] = [{ label: 'Option 1', value: 'opt1' }]

    selectedValue: string | number | null = null

    onSelected(value: string | number | null): void {
      this.selectedValue = value
    }
  }

  let fixture: ComponentFixture<NullValueTestHostComponent>
  let hostComponent: NullValueTestHostComponent
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [NullValueTestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(NullValueTestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should use typed text when onValueChange receives null with allowFreeText', async () => {
    // Set up user search text
    const mockEvent = { target: { value: 'my typed text' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Call onValueChange with null (simulating selection of non-existent option)
    autocompleteComponent.onValueChange(null)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // Should use the typed text as value
    expect(hostComponent.form.get('autocomplete')?.value).toBe('my typed text')
    expect(hostComponent.selectedValue).toBe('my typed text')
  })

  it('should use typed text when onValueChange receives null and hideOptions is false', async () => {
    // Set up user search text
    const mockEvent = { target: { value: 'another text' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Call onValueChange with null and hideOptions=false
    autocompleteComponent.onValueChange(null, false)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // Should use the typed text as value
    expect(hostComponent.form.get('autocomplete')?.value).toBe('another text')
    // Dropdown should still be visible
    expect(autocompleteComponent._showOptions()).toBe(true)
  })

  it('should not use typed text when it is empty', async () => {
    // Set up empty search text
    autocompleteComponent['_userSearchText'].set('   ')
    autocompleteComponent['_isSearching'].set(true)
    fixture.detectChanges()

    // Call onValueChange with null
    autocompleteComponent.onValueChange(null)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // Should fall through to normal handling (null in this case since no other branch matches)
    expect(hostComponent.form.get('autocomplete')?.value).toBeNull()
  })
})

describe('QuangAutocompleteComponent - Options Change Handling', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <quang-autocomplete
          [multiple]="true"
          [searchTextDebounce]="50"
          [selectOptions]="options()"
          formControlName="autocomplete"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  })
  class OptionsChangeTestHostComponent {
    form = new FormGroup({
      autocomplete: new FormControl<string[] | null>(null),
    })

    options = signal<SelectOption[]>([
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
      { label: 'Option 3', value: 'opt3' },
    ])
  }

  let fixture: ComponentFixture<OptionsChangeTestHostComponent>
  let hostComponent: OptionsChangeTestHostComponent
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [OptionsChangeTestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(OptionsChangeTestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should update chip list when options change and value exists (multiple mode)', async () => {
    // Set initial value
    hostComponent.form.patchValue({ autocomplete: ['opt1', 'opt2'] })
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._chipList().length).toBe(2)

    // Change options - this triggers handleOptionsChange
    hostComponent.options.set([
      { label: 'New Option 1', value: 'opt1' },
      { label: 'New Option 2', value: 'opt2' },
      { label: 'New Option 3', value: 'opt3' },
      { label: 'Option 4', value: 'opt4' },
    ])
    fixture.detectChanges()
    await vi.advanceTimersByTimeAsync(0)

    // Chip list should still have the selected values
    expect(autocompleteComponent._chipList()).toContain('opt1')
    expect(autocompleteComponent._chipList()).toContain('opt2')
  })

  it('should handle options change when value is empty', async () => {
    // No initial value
    expect(hostComponent.form.get('autocomplete')?.value).toBeNull()

    // Change options
    hostComponent.options.set([{ label: 'New Option', value: 'new' }])
    fixture.detectChanges()
    await vi.advanceTimersByTimeAsync(0)

    // Should not throw, chip list should remain empty
    expect(autocompleteComponent._chipList().length).toBe(0)
  })
})

describe('QuangAutocompleteComponent - showOptionsChangeSubscription', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <quang-autocomplete
          [searchTextDebounce]="50"
          [selectOptions]="options"
          formControlName="autocomplete"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  })
  class ShowOptionsTestHostComponent {
    form = new FormGroup({
      autocomplete: new FormControl<string | null>(null),
    })

    options: SelectOption[] = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
    ]
  }

  let fixture: ComponentFixture<ShowOptionsTestHostComponent>
  let hostComponent: ShowOptionsTestHostComponent
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [ShowOptionsTestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(ShowOptionsTestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should process text when options hide while still in search mode', async () => {
    // Put component in search mode with typed text
    autocompleteComponent['_isSearching'].set(true)
    autocompleteComponent['_userSearchText'].set('Option 1')
    autocompleteComponent._showOptions.set(true)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // Directly set _showOptions to false without calling onBlurHandler
    // This simulates hiding options via a different path
    autocompleteComponent._showOptions.set(false)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // The showOptionsChangeSubscription should have processed the text
    // and selected the matching option
    expect(hostComponent.form.get('autocomplete')?.value).toBe('opt1')
  })
})

describe('QuangAutocompleteComponent - Multiple Mode Backspace Handling', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <quang-autocomplete
          [multiple]="true"
          [searchTextDebounce]="50"
          [selectOptions]="options"
          formControlName="autocomplete"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  })
  class BackspaceTestHostComponent {
    form = new FormGroup({
      autocomplete: new FormControl<string[] | null>(null),
    })

    options: SelectOption[] = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
      { label: 'Option 3', value: 'opt3' },
    ]
  }

  let fixture: ComponentFixture<BackspaceTestHostComponent>
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [BackspaceTestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(BackspaceTestHostComponent)
    fixture.detectChanges()
    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should focus last chip when Backspace is pressed with empty input and chips exist', async () => {
    // Add some chips
    autocompleteComponent.onValueChange('opt1')
    autocompleteComponent.onValueChange('opt2')
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    expect(autocompleteComponent._chipList().length).toBe(2)

    // Get the input element
    const inputElement = fixture.nativeElement.querySelector('input')
    expect(inputElement).toBeTruthy()

    // Create and dispatch a Backspace keydown event
    const backspaceEvent = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true })
    inputElement.dispatchEvent(backspaceEvent)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // The chip buttons should exist
    const chipButtons = fixture.nativeElement.querySelectorAll('.chip button.btn-chip')
    expect(chipButtons.length).toBe(2)
  })

  it('should not handle Backspace when input has text', async () => {
    // Add a chip
    autocompleteComponent.onValueChange('opt1')
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // Type something in the input
    const mockEvent = { target: { value: 'some text' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // The chip should still be there
    expect(autocompleteComponent._chipList().length).toBe(1)
  })

  it('should not handle Backspace when no chips exist', async () => {
    // No chips
    expect(autocompleteComponent._chipList().length).toBe(0)

    // Get the input element
    const inputElement = fixture.nativeElement.querySelector('input')

    // Create and dispatch a Backspace keydown event
    const backspaceEvent = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true })
    inputElement.dispatchEvent(backspaceEvent)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // Should not throw and nothing should happen
    expect(autocompleteComponent._chipList().length).toBe(0)
  })
})

describe('QuangAutocompleteComponent - InternalFilterOptions', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <quang-autocomplete
          [internalFilterOptions]="internalFilterOptions()"
          [searchTextDebounce]="50"
          [selectOptions]="options()"
          (searchTextChange)="onSearchTextChange($event)"
          formControlName="autocomplete"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  })
  class InternalFilterOptionsTestHostComponent {
    form = new FormGroup({
      autocomplete: new FormControl<string | null>(null),
    })

    options = signal<SelectOption[]>([
      { label: 'Italy', value: 'IT' },
      { label: 'France', value: 'FR' },
      { label: 'Germany', value: 'DE' },
      { label: 'Spain', value: 'ES' },
    ])

    internalFilterOptions = signal(true)
    searchText = ''

    onSearchTextChange(text: string): void {
      this.searchText = text
      // When internalFilterOptions is false, filtering is handled externally
      if (!this.internalFilterOptions() && text) {
        this.options.set(
          [
            { label: 'Italy', value: 'IT' },
            { label: 'France', value: 'FR' },
            { label: 'Germany', value: 'DE' },
            { label: 'Spain', value: 'ES' },
          ].filter((x) => x.label.toLowerCase().includes(text.toLowerCase()))
        )
      } else if (!this.internalFilterOptions()) {
        // Reset to all options when search text is empty
        this.options.set([
          { label: 'Italy', value: 'IT' },
          { label: 'France', value: 'FR' },
          { label: 'Germany', value: 'DE' },
          { label: 'Spain', value: 'ES' },
        ])
      }
    }
  }

  let fixture: ComponentFixture<InternalFilterOptionsTestHostComponent>
  let hostComponent: InternalFilterOptionsTestHostComponent
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [InternalFilterOptionsTestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(InternalFilterOptionsTestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should filter options internally when internalFilterOptions is true (default)', async () => {
    // Default is true
    expect(hostComponent.internalFilterOptions()).toBe(true)

    // Type partial text
    const mockEvent = { target: { value: 'It' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Options should be filtered internally
    expect(autocompleteComponent._filteredOptions().length).toBe(1)
    expect(autocompleteComponent._filteredOptions()[0].label).toBe('Italy')
  })

  it('should NOT filter options internally when internalFilterOptions is false', async () => {
    hostComponent.internalFilterOptions.set(false)
    fixture.detectChanges()

    // Type partial text - but filtering is disabled internally
    const mockEvent = { target: { value: 'It' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // All options should still be returned from filterOptions (no internal filtering)
    // But the host component's onSearchTextChange will update options externally
    expect(hostComponent.searchText).toBe('It')
    // After external filtering, options are updated
    expect(hostComponent.options().length).toBe(1)
  })

  it('should emit searchTextChange for external filtering when internalFilterOptions is false', async () => {
    hostComponent.internalFilterOptions.set(false)
    fixture.detectChanges()

    // Type search text
    const mockEvent = { target: { value: 'Fr' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // searchTextChange should be emitted for external handling
    expect(hostComponent.searchText).toBe('Fr')
    // External filter updated options
    expect(hostComponent.options().length).toBe(1)
    expect(hostComponent.options()[0].label).toBe('France')
  })

  it('should return all options from filterOptions when internalFilterOptions is false', async () => {
    hostComponent.internalFilterOptions.set(false)
    // Keep all original options
    hostComponent.options.set([
      { label: 'Italy', value: 'IT' },
      { label: 'France', value: 'FR' },
      { label: 'Germany', value: 'DE' },
      { label: 'Spain', value: 'ES' },
    ])
    fixture.detectChanges()

    // Access the protected filterOptions method via _filteredOptions computed
    // When internalFilterOptions is false, filterOptions returns all options regardless of search text
    autocompleteComponent.showOptionVisibility()
    autocompleteComponent['_userSearchText'].set('xyz')
    autocompleteComponent['_isSearching'].set(true)
    fixture.detectChanges()

    // filterOptions should return all options since internalFilterOptions is false
    // (unless options were externally filtered)
    const filtered = autocompleteComponent._filteredOptions()
    expect(filtered.length).toBe(4) // All options returned, no internal filtering
  })

  it('should return all options when user types only spaces', async () => {
    hostComponent.internalFilterOptions.set(true)
    fixture.detectChanges()

    // Type only spaces
    const mockEvent = { target: { value: '   ' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // All options should be returned since trimmed value is empty
    expect(autocompleteComponent._filteredOptions().length).toBe(4)
  })

  it('should filter correctly when search text has leading/trailing spaces', async () => {
    hostComponent.internalFilterOptions.set(true)
    fixture.detectChanges()

    // Type with spaces around the search term
    const mockEvent = { target: { value: '  It  ' } } as unknown as Event
    autocompleteComponent.onChangeInput(mockEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Should still find Italy after trimming
    expect(autocompleteComponent._filteredOptions().length).toBe(1)
    expect(autocompleteComponent._filteredOptions()[0].label).toBe('Italy')
  })
})

describe('QuangAutocompleteComponent - E2E Tab Navigation', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <input
          id="before-input"
          type="text"
        />
        <quang-autocomplete
          [searchTextDebounce]="50"
          [selectOptions]="options"
          formControlName="autocomplete"
        />
        <input
          id="after-input"
          type="text"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  })
  class TabNavigationTestHostComponent {
    form = new FormGroup({
      autocomplete: new FormControl<string | null>(null),
    })

    options: SelectOption[] = [
      { label: 'Italy', value: 'IT' },
      { label: 'France', value: 'FR' },
      { label: 'Germany', value: 'DE' },
    ]
  }

  let fixture: ComponentFixture<TabNavigationTestHostComponent>
  let hostComponent: TabNavigationTestHostComponent
  let autocompleteComponent: QuangAutocompleteComponent
  let inputElement: HTMLInputElement
  let beforeInput: HTMLInputElement
  let afterInput: HTMLInputElement

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [TabNavigationTestHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(TabNavigationTestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
    autocompleteComponent = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
    inputElement = fixture.nativeElement.querySelector('quang-autocomplete input')
    beforeInput = fixture.nativeElement.querySelector('#before-input')
    afterInput = fixture.nativeElement.querySelector('#after-input')
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should preserve value when tabbing through the autocomplete with a selected value', async () => {
    // Step 1: Select an option
    autocompleteComponent.onValueChange('IT')
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
    expect(inputElement.value).toBe('Italy')

    // Step 2: Focus the input and show options (simulates clicking or tabbing to it)
    inputElement.focus()
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // Step 3: Dispatch Tab keydown on input
    // This tests that the option-list's document-level Tab handler
    // does NOT interfere when focus is on the input
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
    inputElement.dispatchEvent(tabEvent)
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // Verify search state is preserved (bug fix: option-list was incorrectly handling Tab)
    expect(autocompleteComponent['_isSearching']()).toBe(true)
    expect(autocompleteComponent['_userSearchText']()).toBe('Italy')

    // Step 4: Simulate blur (tab moves focus away)
    const blurEvent = new FocusEvent('blur', { relatedTarget: afterInput })
    autocompleteComponent.onBlurInput(blurEvent)
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Value should be preserved
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
    expect(autocompleteComponent._inputValue()).toBe('Italy')
  })

  it('should preserve value after multiple tab cycles (tab away, tab back, tab away)', async () => {
    // Step 1: Select an option
    autocompleteComponent.onValueChange('FR')
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    expect(hostComponent.form.get('autocomplete')?.value).toBe('FR')

    // Cycle 1: Focus -> Tab away
    inputElement.focus()
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    const blurEvent1 = new FocusEvent('blur', { relatedTarget: afterInput })
    autocompleteComponent.onBlurInput(blurEvent1)
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    expect(hostComponent.form.get('autocomplete')?.value).toBe('FR')

    // Cycle 2: Tab back (focus) -> Tab away
    inputElement.focus()
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // At this point, _userSearchText should be "France"
    expect(autocompleteComponent['_userSearchText']()).toBe('France')

    const blurEvent2 = new FocusEvent('blur', { relatedTarget: afterInput })
    autocompleteComponent.onBlurInput(blurEvent2)
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    expect(hostComponent.form.get('autocomplete')?.value).toBe('FR')

    // Cycle 3: Shift+Tab back (focus) -> Shift+Tab away
    inputElement.focus()
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    const blurEvent3 = new FocusEvent('blur', { relatedTarget: beforeInput })
    autocompleteComponent.onBlurInput(blurEvent3)
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Value should STILL be preserved after all cycles
    expect(hostComponent.form.get('autocomplete')?.value).toBe('FR')
    expect(autocompleteComponent._inputValue()).toBe('France')
  })

  it('should handle the case where text is selected and user tabs away immediately', async () => {
    // This tests the specific bug scenario:
    // 1. Select option -> value is "IT", input shows "Italy"
    // 2. Tab away
    // 3. Tab back -> browser selects all text "Italy"
    // 4. Tab away immediately without typing -> value should NOT be cleared

    // Step 1: Select an option
    autocompleteComponent.onValueChange('IT')
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Step 2: First blur (tab away)
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')

    // Step 3: Focus again (tab back) - browser would select all text
    inputElement.focus()
    inputElement.select() // Simulate browser selecting all text
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // Verify the internal state
    expect(autocompleteComponent['_isSearching']()).toBe(true)
    expect(autocompleteComponent['_userSearchText']()).toBe('Italy')

    // Step 4: Immediately tab away (blur) without any typing
    const blurEvent = new FocusEvent('blur', { relatedTarget: afterInput })
    autocompleteComponent.onBlurInput(blurEvent)
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // CRITICAL: Value should be preserved
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
    expect(autocompleteComponent._inputValue()).toBe('Italy')
  })

  it('should clear value only when user actually deletes the text', async () => {
    // Select an option
    autocompleteComponent.onValueChange('DE')
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    expect(hostComponent.form.get('autocomplete')?.value).toBe('DE')

    // Focus the input
    inputElement.focus()
    autocompleteComponent.showOptionVisibility()
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    // User actually clears the input by typing (simulating Ctrl+A then Delete)
    const clearEvent = { target: { value: '' } } as unknown as Event
    autocompleteComponent.onChangeInput(clearEvent)
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Now blur
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // NOW the value should be cleared because user explicitly deleted the text
    expect(hostComponent.form.get('autocomplete')?.value).toBe(null)
  })

  it('should preserve value when focus event fires multiple times', async () => {
    // Select an option
    autocompleteComponent.onValueChange('IT')
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Simulate multiple focus events (can happen with some browser behaviors)
    for (let i = 0; i < 3; i++) {
      inputElement.focus()
      autocompleteComponent.showOptionVisibility()
      await vi.advanceTimersByTimeAsync(0)
      fixture.detectChanges()
    }

    // Now blur
    autocompleteComponent.onBlurHandler()
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()

    // Value should be preserved
    expect(hostComponent.form.get('autocomplete')?.value).toBe('IT')
    expect(autocompleteComponent._inputValue()).toBe('Italy')
  })

  it('should handle rapid tab navigation (focus-blur cycles)', async () => {
    // Select an option
    autocompleteComponent.onValueChange('FR')
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()

    // Rapid focus-blur cycles (simulating fast tabbing)
    for (let i = 0; i < 5; i++) {
      inputElement.focus()
      autocompleteComponent.showOptionVisibility()
      await vi.advanceTimersByTimeAsync(10) // Very short time

      const blurEvent = new FocusEvent('blur', { relatedTarget: afterInput })
      autocompleteComponent.onBlurInput(blurEvent)
      await vi.advanceTimersByTimeAsync(10)
      fixture.detectChanges()
    }

    // Wait for all debounces to complete
    await vi.advanceTimersByTimeAsync(200)
    fixture.detectChanges()

    // Value should be preserved
    expect(hostComponent.form.get('autocomplete')?.value).toBe('FR')
    expect(autocompleteComponent._inputValue()).toBe('France')
  })
})

// Test host component for chipsPosition
@Component({
  template: `
    <form [formGroup]="form">
      <quang-autocomplete
        [chipsPosition]="chipsPosition()"
        [multiple]="true"
        [searchTextDebounce]="50"
        [selectOptions]="options"
        componentId="chips-position-autocomplete"
        formControlName="autocomplete"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
})
class TestHostChipsPositionComponent {
  form = new FormGroup({
    autocomplete: new FormControl<string[]>(['opt1', 'opt2']),
  })

  options: SelectOption[] = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ]

  chipsPosition = signal<'top' | 'bottom'>('top')
}

describe('QuangAutocompleteComponent - Chips Position Snapshot Tests', () => {
  let hostFixture: ComponentFixture<TestHostChipsPositionComponent>
  let hostComponent: TestHostChipsPositionComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [TestHostChipsPositionComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    hostFixture = TestBed.createComponent(TestHostChipsPositionComponent)
    hostComponent = hostFixture.componentInstance
    hostFixture.detectChanges()
    await vi.advanceTimersByTimeAsync(0)
    hostFixture.detectChanges()
  })

  afterEach(() => {
    hostFixture.destroy()
    vi.useRealTimers()
  })

  it('should match snapshot with chips at top position', async () => {
    hostComponent.chipsPosition.set('top')
    hostFixture.detectChanges()
    await vi.advanceTimersByTimeAsync(0)
    hostFixture.detectChanges()

    const containerWrap = hostFixture.nativeElement.querySelector('.container-wrap')
    expect(containerWrap.innerHTML).toMatchSnapshot()
  })

  it('should match snapshot with chips at bottom position', async () => {
    hostComponent.chipsPosition.set('bottom')
    hostFixture.detectChanges()
    await vi.advanceTimersByTimeAsync(0)
    hostFixture.detectChanges()

    const containerWrap = hostFixture.nativeElement.querySelector('.container-wrap')
    expect(containerWrap.innerHTML).toMatchSnapshot()
  })

  it('should have chips-container with horizontal flex layout', async () => {
    hostComponent.chipsPosition.set('top')
    hostFixture.detectChanges()
    await vi.advanceTimersByTimeAsync(0)
    hostFixture.detectChanges()

    const chipsContainer = hostFixture.nativeElement.querySelector('.chips-container')
    expect(chipsContainer).toBeTruthy()

    const chips = chipsContainer.querySelectorAll('.chip')
    expect(chips.length).toBe(2)
  })

  it('should add chips-bottom class when chipsPosition is bottom', async () => {
    hostComponent.chipsPosition.set('bottom')
    hostFixture.detectChanges()
    await vi.advanceTimersByTimeAsync(0)
    hostFixture.detectChanges()

    const containerWrap = hostFixture.nativeElement.querySelector('.container-wrap')
    expect(containerWrap.classList.contains('chips-bottom')).toBe(true)
  })

  it('should not have chips-bottom class when chipsPosition is top', async () => {
    hostComponent.chipsPosition.set('top')
    hostFixture.detectChanges()
    await vi.advanceTimersByTimeAsync(0)
    hostFixture.detectChanges()

    const containerWrap = hostFixture.nativeElement.querySelector('.container-wrap')
    expect(containerWrap.classList.contains('chips-bottom')).toBe(false)
  })
})

// ============================================================================
// Documented behaviors (QUANG bug):
//  - allowFreeText FALSE: behaves as a select-with-autocomplete. The input is
//    only a search box; the form value can only become one of the listed option
//    values; non-matching text is cleared on blur; value derives from the
//    selected option.
//  - allowFreeText TRUE: behaves as a normal text input. Any typed value is
//    valid; the input text IS the form value, even with no matching option.
// ============================================================================
describe('QuangAutocompleteComponent - Documented free text behaviors', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <quang-autocomplete
          [allowFreeText]="allowFreeText"
          [searchTextDebounce]="50"
          [selectOptions]="options"
          [trim]="trim"
          formControlName="autocomplete"
        />
        <input
          id="outside-input"
          type="text"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  })
  class FreeTextBehaviorHostComponent {
    allowFreeText = false
    trim = false
    form = new FormGroup({
      autocomplete: new FormControl<string | null>(null),
    })
    options: SelectOption[] = [
      { label: 'Italy', value: 'IT' },
      { label: 'France', value: 'FR' },
      { label: 'Germany', value: 'DE' },
    ]
  }

  let fixture: ComponentFixture<FreeTextBehaviorHostComponent>
  let host: FreeTextBehaviorHostComponent
  let cmp: QuangAutocompleteComponent
  let input: HTMLInputElement

  async function setup(allowFreeText: boolean, trim = false): Promise<void> {
    fixture = TestBed.createComponent(FreeTextBehaviorHostComponent)
    host = fixture.componentInstance
    host.allowFreeText = allowFreeText
    host.trim = trim
    fixture.detectChanges()
    cmp = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
    input = fixture.nativeElement.querySelector('quang-autocomplete input')
  }

  function formValue(): string | number | string[] | number[] | null {
    return host.form.get('autocomplete')?.value ?? null
  }

  async function type(text: string): Promise<void> {
    input.value = text
    input.dispatchEvent(new Event('input'))
    await vi.advanceTimersByTimeAsync(100)
    fixture.detectChanges()
  }

  // Click outside the field -> the input loses focus to nothing (relatedTarget null)
  async function clickOutsideBlur(): Promise<void> {
    input.dispatchEvent(new FocusEvent('blur', { relatedTarget: null }))
    await vi.advanceTimersByTimeAsync(150)
    fixture.detectChanges()
  }

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [FreeTextBehaviorHostComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  describe('allowFreeText = false (select with autocomplete)', () => {
    it('typing only filters the options and does not change the form value', async () => {
      await setup(false)
      await type('Ita')

      expect(cmp._filteredOptions().map((o) => o.label)).toEqual(['Italy'])
      expect(formValue()).toBe(null)
    })

    it('selecting an option sets the form value to the option value', async () => {
      await setup(false)
      cmp.onValueChange('FR')
      await vi.advanceTimersByTimeAsync(100)
      fixture.detectChanges()

      expect(formValue()).toBe('FR')
      expect(cmp._inputValue()).toBe('France')
    })

    it('typing non-matching text then clicking outside clears the input and leaves value null', async () => {
      await setup(false)
      await type('not an option')
      await clickOutsideBlur()

      expect(formValue()).toBe(null)
      expect(cmp._inputValue()).toBe('')
    })
  })

  describe('allowFreeText = true (normal text input)', () => {
    it('typing any text syncs the form value to the typed text', async () => {
      await setup(true)
      await type('custom value')

      expect(formValue()).toBe('custom value')
    })

    it('the input text equals the form value when no option matches', async () => {
      await setup(true)
      await type('custom value')

      expect(cmp._inputValue()).toBe('custom value')
      expect(cmp._inputValue()).toBe(formValue())
    })

    it('clicking outside before debounce still keeps the typed text as the value', async () => {
      await setup(true)
      input.value = 'typed before blur'
      input.dispatchEvent(new Event('input'))
      // blur immediately, before the debounce timer fires
      await clickOutsideBlur()

      expect(formValue()).toBe('typed before blur')
    })

    it('keeps whitespace untrimmed in the value while the user is still typing', async () => {
      await setup(true)
      await type('hello ')

      // While typing, the raw text (including trailing space) is the value
      expect(formValue()).toBe('hello ')
    })

    it('keeps untrimmed value on blur by default (trim disabled)', async () => {
      await setup(true, false)
      await type('  hello world  ')
      expect(formValue()).toBe('  hello world  ')

      await clickOutsideBlur()
      expect(formValue()).toBe('  hello world  ')
    })

    it('trims the value only once the field loses focus (blur) when trim is enabled', async () => {
      await setup(true, true)
      await type('  hello world  ')
      // While typing, the raw text (including whitespace) is the value
      expect(formValue()).toBe('  hello world  ')

      await clickOutsideBlur()
      expect(formValue()).toBe('hello world')
    })
  })
})
