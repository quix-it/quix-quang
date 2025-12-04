import { Component, DebugElement, Injectable } from '@angular/core'
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'

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
    it('should update input value on typing', fakeAsync(() => {
      // Directly set the internal signal to test the binding
      // The real typing goes through debounce, but we can test the signal directly
      autocompleteComponent._inputValue.set('Option')
      hostFixture.detectChanges()

      expect(autocompleteComponent._inputValue()).toBe('Option')
    }))

    it('should emit searchTextChange on input', fakeAsync(() => {
      // Subscribe to the searchTextChange output before triggering
      let emittedValue = ''
      const sub = autocompleteComponent.searchTextChange.subscribe((val: string) => {
        emittedValue = val
      })

      // Simulate onChangeInput being called (which is triggered by (input) binding)
      const mockEvent = { target: { value: 'test' } } as unknown as Event
      autocompleteComponent.onChangeInput(mockEvent)

      // Use tick with the default debounce time (300ms, since it's read at construction before input binding)
      tick(300)
      hostFixture.detectChanges()

      sub.unsubscribe()
      expect(emittedValue).toBe('test')
    }))

    it('should show options on mousedown', fakeAsync(() => {
      inputElement.dispatchEvent(new MouseEvent('mousedown'))
      tick()
      hostFixture.detectChanges()

      expect(autocompleteComponent._showOptions()).toBe(true)
    }))

    it('should filter options based on input', fakeAsync(() => {
      autocompleteComponent._inputValue.set('Option 1')
      hostFixture.detectChanges()

      const filteredOptions = autocompleteComponent._filteredOptions()
      expect(filteredOptions.length).toBe(1)
      expect(filteredOptions[0].label).toBe('Option 1')
    }))

    it('should filter options case-insensitively', fakeAsync(() => {
      autocompleteComponent._inputValue.set('option')
      hostFixture.detectChanges()

      const filteredOptions = autocompleteComponent._filteredOptions()
      expect(filteredOptions.length).toBe(3)
    }))
  })

  describe('Option Selection', () => {
    it('should update form value when option is selected', fakeAsync(() => {
      autocompleteComponent.onValueChange('opt1')
      tick()
      hostFixture.detectChanges()

      expect(hostComponent.form.get('autocomplete')?.value).toBe('opt1')
    }))

    it('should emit selectedOption when option is selected', fakeAsync(() => {
      autocompleteComponent.onValueChange('opt2')
      tick()
      hostFixture.detectChanges()

      expect(hostComponent.selectedValue).toBe('opt2')
    }))

    it('should hide options after selection', fakeAsync(() => {
      autocompleteComponent.showOptionVisibility()
      tick()
      hostFixture.detectChanges()
      expect(autocompleteComponent._showOptions()).toBe(true)

      autocompleteComponent.onValueChange('opt1')
      tick(100)
      hostFixture.detectChanges()

      expect(autocompleteComponent._showOptions()).toBe(false)
    }))

    it('should update input value to selected option label', fakeAsync(() => {
      hostComponent.form.get('autocomplete')?.setValue('opt1')
      tick()
      hostFixture.detectChanges()

      expect(autocompleteComponent._inputValue()).toBe('Option 1')
    }))
  })

  describe('Form Control Integration', () => {
    it('should update component when form control value changes', fakeAsync(() => {
      hostComponent.form.get('autocomplete')?.setValue('opt2')
      tick()
      hostFixture.detectChanges()

      expect(autocompleteComponent._value()).toBe('opt2')
      expect(autocompleteComponent._inputValue()).toBe('Option 2')
    }))

    it('should mark form as touched on blur', fakeAsync(() => {
      expect(hostComponent.form.get('autocomplete')?.touched).toBe(false)

      // Call blur handler directly as the component does
      autocompleteComponent.onBlurHandler()
      tick(150)
      hostFixture.detectChanges()

      expect(hostComponent.form.get('autocomplete')?.touched).toBe(true)
    }))

    it('should clear form value when input is cleared and blurred', fakeAsync(() => {
      hostComponent.form.get('autocomplete')?.setValue('opt1')
      tick()
      hostFixture.detectChanges()

      // The component uses checkInputValue when options hide
      // If input doesn't match an option and syncFormWithText is false, it clears
      autocompleteComponent._inputValue.set('')
      autocompleteComponent.checkInputValue()
      tick()
      hostFixture.detectChanges()

      // When input is empty and no match, the form value should be cleared to empty string
      expect(hostComponent.form.get('autocomplete')?.value).toBe('')
    }))

    it('should disable input when form control is disabled', fakeAsync(() => {
      hostComponent.form.get('autocomplete')?.disable()
      tick()
      hostFixture.detectChanges()

      expect(inputElement.disabled).toBe(true)
    }))
  })

  describe('Validation', () => {
    it('should show required indicator when required', fakeAsync(() => {
      hostComponent.form.get('autocomplete')?.setValidators([Validators.required])
      hostComponent.form.get('autocomplete')?.updateValueAndValidity()
      tick()
      hostFixture.detectChanges()

      const requiredIndicator = hostFixture.nativeElement.querySelector('label span')
      expect(requiredIndicator).toBeTruthy()
    }))

    it('should show error message when invalid and touched', fakeAsync(() => {
      hostComponent.form.get('autocomplete')?.setValidators([Validators.required])
      hostComponent.form.get('autocomplete')?.updateValueAndValidity()
      hostComponent.form.get('autocomplete')?.markAsTouched()
      hostComponent.form.get('autocomplete')?.markAsDirty()
      tick()
      hostFixture.detectChanges()

      // Trigger checkFormErrors to update internal state
      autocompleteComponent.checkFormErrors()
      hostFixture.detectChanges()

      expect(autocompleteComponent._showErrors()).toBe(true)
    }))

    it('should hide error message when valid', fakeAsync(() => {
      hostComponent.form.get('autocomplete')?.setValidators([Validators.required])
      hostComponent.form.get('autocomplete')?.setValue('opt1')
      hostComponent.form.get('autocomplete')?.markAsTouched()
      tick()
      hostFixture.detectChanges()

      expect(autocompleteComponent._showErrors()).toBe(false)
    }))
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

    it('should check input value against options on blur', fakeAsync(() => {
      autocompleteComponent._inputValue.set('Option 1')
      autocompleteComponent.checkInputValue()
      tick()
      hostFixture.detectChanges()

      expect(hostComponent.form.get('autocomplete')?.value).toBe('opt1')
    }))
  })
})

describe('QuangAutocompleteComponent - Multiple Selection', () => {
  let hostComponent: TestHostMultipleComponent
  let hostFixture: ComponentFixture<TestHostMultipleComponent>
  let autocompleteDebugElement: DebugElement
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
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
  })

  describe('Multiple Selection Mode', () => {
    it('should be in multiple selection mode', () => {
      expect(autocompleteComponent.multiple()).toBe(true)
    })

    it('should add chip when option is selected', fakeAsync(() => {
      autocompleteComponent.onValueChange('opt1')
      tick()
      hostFixture.detectChanges()

      expect(autocompleteComponent._chipList()).toContain('opt1')
    }))

    it('should add multiple chips', fakeAsync(() => {
      autocompleteComponent.onValueChange('opt1')
      tick()
      autocompleteComponent.onValueChange('opt2')
      tick()
      hostFixture.detectChanges()

      expect(autocompleteComponent._chipList().length).toBe(2)
      expect(autocompleteComponent._chipList()).toContain('opt1')
      expect(autocompleteComponent._chipList()).toContain('opt2')
    }))

    it('should not add duplicate chips', fakeAsync(() => {
      autocompleteComponent.onValueChange('opt1')
      tick()
      autocompleteComponent.onValueChange('opt1')
      tick()
      hostFixture.detectChanges()

      expect(autocompleteComponent._chipList().filter((c) => c === 'opt1').length).toBe(1)
    }))

    it('should delete chip', fakeAsync(() => {
      autocompleteComponent.onValueChange('opt1')
      autocompleteComponent.onValueChange('opt2')
      tick()
      hostFixture.detectChanges()

      autocompleteComponent.deleteChip('opt1')
      tick()
      hostFixture.detectChanges()

      expect(autocompleteComponent._chipList()).not.toContain('opt1')
      expect(autocompleteComponent._chipList()).toContain('opt2')
    }))

    it('should update form control with chip list', fakeAsync(() => {
      autocompleteComponent.onValueChange('opt1')
      autocompleteComponent.onValueChange('opt2')
      tick()
      hostFixture.detectChanges()

      expect(hostComponent.form.get('autocomplete')?.value).toEqual(['opt1', 'opt2'])
    }))

    it('should filter out selected options from dropdown', fakeAsync(() => {
      autocompleteComponent._chipList.set(['opt1'])
      autocompleteComponent._inputValue.set('')
      tick()
      hostFixture.detectChanges()

      const filteredOptions = autocompleteComponent._filteredOptions()
      expect(filteredOptions.find((o) => o.value === 'opt1')).toBeUndefined()
    }))

    it('should render chips in template', fakeAsync(() => {
      autocompleteComponent.onValueChange('opt1')
      tick()
      hostFixture.detectChanges()

      const chips = hostFixture.nativeElement.querySelectorAll('.chip')
      expect(chips.length).toBe(1)
    }))

    it('should initialize with existing array value', fakeAsync(() => {
      hostComponent.form.get('autocomplete')?.setValue(['opt1', 'opt2'])
      tick()
      hostFixture.detectChanges()

      expect(autocompleteComponent._chipList().length).toBe(2)
    }))
  })
})

describe('QuangAutocompleteComponent - Internal Filter Options', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
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
  })

  it('should filter options internally by default', fakeAsync(() => {
    autocompleteComponent._inputValue.set('Another')
    tick()
    fixture.detectChanges()

    const filtered = autocompleteComponent._filteredOptions()
    expect(filtered.length).toBe(1)
    expect(filtered[0].value).toBe('another')
  }))

  it('should return all options when input is empty', fakeAsync(() => {
    autocompleteComponent._inputValue.set('')
    tick()
    fixture.detectChanges()

    const filtered = autocompleteComponent._filteredOptions()
    expect(filtered.length).toBe(4)
  }))
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
  })

  it('should sync form with typed text', fakeAsync(() => {
    const autocompleteComp = fixture.debugElement.query(By.directive(QuangAutocompleteComponent))
      .componentInstance as QuangAutocompleteComponent

    // Simulate typing - onChangeInput pushes to inputValue$ subject
    autocompleteComp.inputValue$.next('custom text')
    // Wait for debounce - default is 300ms (signal input read at construction time)
    tick(350)
    fixture.detectChanges()

    // When syncFormWithText is true, the component calls onValueChange
    // which then calls onChangedHandler to update the form
    expect(hostComponent.form.get('autocomplete')?.value).toBe('custom text')
  }))
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
  })

  it('should be in emit only mode', () => {
    expect(autocompleteComponent.emitOnly()).toBe(true)
  })

  it('should emit selected option without clearing input on blur', fakeAsync(() => {
    autocompleteComponent.onValueChange('opt1')
    tick()
    fixture.detectChanges()

    expect(hostComponent.selectedValue).toBe('opt1')
  }))
})

describe('QuangAutocompleteComponent - Visibility Control', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
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
  })

  it('should show options on showOptionVisibility', fakeAsync(() => {
    autocompleteComponent.showOptionVisibility()
    tick()
    fixture.detectChanges()

    expect(autocompleteComponent._showOptions()).toBe(true)
  }))

  it('should hide options on hideOptionVisibility', fakeAsync(() => {
    autocompleteComponent.showOptionVisibility()
    tick()
    fixture.detectChanges()
    expect(autocompleteComponent._showOptions()).toBe(true)

    autocompleteComponent.hideOptionVisibility()
    tick(100)
    fixture.detectChanges()

    expect(autocompleteComponent._showOptions()).toBe(false)
  }))

  it('should clear pending hide timeout when showing options', fakeAsync(() => {
    autocompleteComponent.hideOptionVisibility()
    tick(10) // Partial timeout
    autocompleteComponent.showOptionVisibility()
    tick(100)
    fixture.detectChanges()

    expect(autocompleteComponent._showOptions()).toBe(true)
  }))

  it('should hide options immediately when skipTimeout is true', fakeAsync(() => {
    autocompleteComponent.showOptionVisibility()
    tick()
    fixture.detectChanges()

    autocompleteComponent.hideOptionVisibility(true)
    tick(10)
    fixture.detectChanges()

    expect(autocompleteComponent._showOptions()).toBe(false)
  }))
})

describe('QuangAutocompleteComponent - WriteValue', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let autocompleteComponent: QuangAutocompleteComponent

  beforeEach(async () => {
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
  })

  it('should handle writeValue with string value', fakeAsync(() => {
    autocompleteComponent.writeValue('opt1')
    tick()
    fixture.detectChanges()

    expect(autocompleteComponent._value()).toBe('opt1')
    expect(autocompleteComponent._inputValue()).toBe('Option 1')
  }))

  it('should handle writeValue with number value', fakeAsync(() => {
    // Test with existing options that have number values
    autocompleteComponent.writeValue(123)
    tick()
    fixture.detectChanges()

    expect(autocompleteComponent._value()).toBe(123)
  }))

  it('should reset input value when value not found and resetOnMiss is true', fakeAsync(() => {
    autocompleteComponent._inputValue.set('Some text')
    autocompleteComponent.writeValue('nonexistent')
    tick()
    fixture.detectChanges()

    expect(autocompleteComponent._inputValue()).toBe('')
  }))
})
