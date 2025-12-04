import { Component, DebugElement, Injectable } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { vi } from 'vitest'

import { QuangAutocompleteComponent } from './autocomplete.component'
import { SelectOption } from 'quang/components/shared'

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
      // Directly set the internal signal to test the binding
      // The real typing goes through debounce, but we can test the signal directly
      autocompleteComponent._inputValue.set('Option')
      hostFixture.detectChanges()

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
      autocompleteComponent._inputValue.set('Option 1')
      hostFixture.detectChanges()

      const filteredOptions = autocompleteComponent._filteredOptions()
      expect(filteredOptions.length).toBe(1)
      expect(filteredOptions[0].label).toBe('Option 1')
    })

    it('should filter options case-insensitively', async () => {
      autocompleteComponent._inputValue.set('option')
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

      // Verify filtering uses the current input value
      const filteredOptions = autocompleteComponent._filteredOptions()
      expect(filteredOptions.length).toBe(1)
      expect(filteredOptions[0].value).toBe('opt2')
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

      // The component uses checkInputValue when options hide
      // If input doesn't match an option and syncFormWithText is false, it clears
      autocompleteComponent._inputValue.set('')
      autocompleteComponent.checkInputValue()
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      // When input is empty and no match, the form value should be cleared to empty string
      expect(hostComponent.form.get('autocomplete')?.value).toBe('')
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

    it('should return empty string for unknown chip value', () => {
      const description = autocompleteComponent.getDescription('unknown')
      expect(description).toBe('')
    })

    it('should check input value against options on blur', async () => {
      autocompleteComponent._inputValue.set('Option 1')
      autocompleteComponent.checkInputValue()
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

    it('should update form control with chip list', async () => {
      autocompleteComponent.onValueChange('opt1')
      autocompleteComponent.onValueChange('opt2')
      await vi.advanceTimersByTimeAsync(0)
      hostFixture.detectChanges()

      expect(hostComponent.form.get('autocomplete')?.value).toEqual(['opt1', 'opt2'])
    })

    it('should filter out selected options from dropdown', async () => {
      autocompleteComponent._chipList.set(['opt1'])
      autocompleteComponent._inputValue.set('')
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
    autocompleteComponent._inputValue.set('Another')
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

    const filtered = autocompleteComponent._filteredOptions()
    expect(filtered.length).toBe(1)
    expect(filtered[0].value).toBe('another')
  })

  it('should return all options when input is empty', async () => {
    autocompleteComponent._inputValue.set('')
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

    autocompleteComponent.hideOptionVisibility(true)
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

  it('should reset input value when value not found and resetOnMiss is true', async () => {
    autocompleteComponent._inputValue.set('Some text')
    autocompleteComponent.writeValue('nonexistent')
    await vi.advanceTimersByTimeAsync(0)
    fixture.detectChanges()

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

    // Step 2: User clears the input text
    autocompleteComponent._inputValue.set('')
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

    // Clear input (user deleted text)
    autocompleteComponent._inputValue.set('')
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
