import { Component, ElementRef, TemplateRef, viewChild } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { TranslocoTestingModule } from '@jsverse/transloco'
import { vi } from 'vitest'

import { OptionListParentType, QuangOptionListComponent, SelectOption } from './option-list.component'

// Test host component to provide required inputs
@Component({
  template: `
    <button #buttonRef>Open</button>

    <ng-template
      #optTpl
      let-index="index"
      let-opt
      let-selected="selected"
    >
      <span class="custom-opt">Custom {{ opt.label }} selected: {{ selected }} index: {{ index }}</span>
    </ng-template>

    <quang-option-list
      [_value]="value"
      [nullOption]="nullOption"
      [parentType]="parentType"
      [selectButtonRef]="buttonElement"
      [selectionMode]="selectionMode"
      [selectOptions]="options"
      [translateValue]="translateValue"
      (blurHandler)="onBlur($event)"
      (changedHandler)="onChanged($event)"
    />
  `,
  standalone: true,
  imports: [QuangOptionListComponent],
})
class TestHostComponent {
  buttonRef = viewChild<ElementRef<HTMLButtonElement>>('buttonRef')

  optTpl = viewChild<TemplateRef<unknown>>('optTpl')

  get buttonElement(): HTMLButtonElement {
    return this.buttonRef()?.nativeElement as HTMLButtonElement
  }

  options: SelectOption[] = [
    { label: 'Italy', value: 'IT' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DE' },
  ]

  value: string | number | null = null
  nullOption = true
  parentType = OptionListParentType.SELECT
  selectionMode: 'single' | 'multiple' = 'single'
  translateValue = false

  changedValue: unknown = undefined
  blurEvent: unknown = undefined

  onChanged(value: unknown): void {
    this.changedValue = value
  }

  onBlur(event: unknown): void {
    this.blurEvent = event
  }

  setTemplatedOptions(): void {
    this.options = [
      { label: 'Italy', value: 'IT' },
      { label: 'France', value: 'FR', renderer: this.optTpl() },
      { label: 'Germany', value: 'DE' },
    ]
  }
}

// Test host for multiple selection mode
@Component({
  template: `
    <button #buttonRef>Open</button>
    <quang-option-list
      [_value]="value"
      [nullOption]="false"
      [parentType]="parentType"
      [selectButtonRef]="buttonElement"
      [selectOptions]="options"
      (changedHandler)="onChanged($event)"
      selectionMode="multiple"
    />
  `,
  standalone: true,
  imports: [QuangOptionListComponent],
})
class MultipleSelectionTestHostComponent {
  buttonRef = viewChild<ElementRef<HTMLButtonElement>>('buttonRef')

  get buttonElement(): HTMLButtonElement {
    return this.buttonRef()?.nativeElement as HTMLButtonElement
  }

  options: SelectOption[] = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ]

  value: string[] | null = null
  parentType = OptionListParentType.AUTOCOMPLETE

  changedValue: unknown = undefined

  onChanged(value: unknown): void {
    this.changedValue = value
  }
}

describe('QuangOptionListComponent', () => {
  it('should be defined', () => {
    expect(QuangOptionListComponent).toBeDefined()
  })
})

describe('QuangOptionListComponent - Basic Rendering', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let hostComponent: TestHostComponent
  let optionListComponent: QuangOptionListComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule, TranslocoTestingModule.forRoot({})],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
    optionListComponent = fixture.debugElement.query(By.directive(QuangOptionListComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should render options list', () => {
    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    // 3 options + 1 null option = 4
    expect(listItems.length).toBe(4)
  })

  it('should include null option when nullOption is true', () => {
    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    expect(listItems.length).toBe(4)

    // First item should be the null option with empty label
    const firstItem = listItems[0]
    const label = firstItem.query(By.css('.checkbox-label'))
    expect(label.nativeElement.textContent.trim()).toBe('')
  })

  it('should not include null option when nullOption is false', () => {
    hostComponent.nullOption = false
    fixture.detectChanges()

    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    expect(listItems.length).toBe(3)
  })

  it('should display option labels correctly', () => {
    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    const labels = listItems.map((item) => item.query(By.css('.checkbox-label')).nativeElement.textContent.trim())

    // First is null option, then our 3 options
    expect(labels).toEqual(['', 'Italy', 'France', 'Germany'])
  })

  it('should compute selectOptionsList with null option prepended', () => {
    const options = optionListComponent.selectOptionsList()
    expect(options.length).toBe(4)
    expect(options[0]).toEqual({ label: '', value: null })
    expect(options[1]).toEqual({ label: 'Italy', value: 'IT' })
  })

  it('should render option renderer when provided', () => {
    hostComponent.value = 'FR'
    hostComponent.setTemplatedOptions()
    fixture.detectChanges()

    const custom = fixture.nativeElement.querySelector('.custom-opt') as HTMLElement | null
    expect(custom).toBeTruthy()
    expect(custom?.textContent).toContain('Custom France')
    expect(custom?.textContent).toContain('selected: true')
    expect(custom?.textContent).toContain('index: 2')
  })
})

describe('QuangOptionListComponent - Selection', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let hostComponent: TestHostComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule, TranslocoTestingModule.forRoot({})],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should emit changedHandler when option is clicked', () => {
    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    // Click on "Italy" (index 1, after null option)
    listItems[1].triggerEventHandler('mousedown', new MouseEvent('mousedown'))
    fixture.detectChanges()

    expect(hostComponent.changedValue).toBe('IT')
  })

  it('should emit null when null option is clicked', () => {
    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    // Click on null option (index 0)
    listItems[0].triggerEventHandler('mousedown', new MouseEvent('mousedown'))
    fixture.detectChanges()

    expect(hostComponent.changedValue).toBeNull()
  })

  it('should mark selected option with selected class', () => {
    hostComponent.value = 'FR'
    fixture.detectChanges()

    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    // France is at index 2 (after null option and Italy)
    const franceItem = listItems[2]
    expect(franceItem.classes['selected']).toBe(true)
  })

  it('should return correct selected state via getSelected', () => {
    const optionListComponent = fixture.debugElement.query(By.directive(QuangOptionListComponent)).componentInstance

    hostComponent.value = 'IT'
    fixture.detectChanges()

    expect(optionListComponent.getSelected({ label: 'Italy', value: 'IT' })).toBe(true)
    expect(optionListComponent.getSelected({ label: 'France', value: 'FR' })).toBe(false)
  })

  it('should find correct selectedElementIndex', () => {
    const optionListComponent = fixture.debugElement.query(By.directive(QuangOptionListComponent)).componentInstance

    hostComponent.value = 'DE'
    fixture.detectChanges()

    // Germany is at index 3 (after null, Italy, France)
    expect(optionListComponent.selectedElementIndex()).toBe(3)
  })
})

describe('QuangOptionListComponent - Multiple Selection', () => {
  let fixture: ComponentFixture<MultipleSelectionTestHostComponent>
  let hostComponent: MultipleSelectionTestHostComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleSelectionTestHostComponent, NoopAnimationsModule, TranslocoTestingModule.forRoot({})],
    }).compileComponents()

    fixture = TestBed.createComponent(MultipleSelectionTestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should show checkboxes in multiple mode', () => {
    const checkboxes = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'))
    // All 3 options should have visible checkboxes
    expect(checkboxes.length).toBe(3)
  })

  it('should add item to selection when clicked', () => {
    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    listItems[0].triggerEventHandler('mousedown', new MouseEvent('mousedown'))
    fixture.detectChanges()

    expect(hostComponent.changedValue).toEqual(['opt1'])
  })

  it('should add multiple items to selection', () => {
    hostComponent.value = ['opt1']
    fixture.detectChanges()

    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    listItems[1].triggerEventHandler('mousedown', new MouseEvent('mousedown'))
    fixture.detectChanges()

    expect(hostComponent.changedValue).toEqual(['opt1', 'opt2'])
  })

  it('should remove item from selection when clicked again', () => {
    hostComponent.value = ['opt1', 'opt2']
    fixture.detectChanges()

    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    listItems[0].triggerEventHandler('mousedown', new MouseEvent('mousedown'))
    fixture.detectChanges()

    expect(hostComponent.changedValue).toEqual(['opt2'])
  })

  it('should check checkboxes for selected items', () => {
    hostComponent.value = ['opt1', 'opt3']
    fixture.detectChanges()

    const checkboxes = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'))
    expect(checkboxes[0].nativeElement.checked).toBe(true)
    expect(checkboxes[1].nativeElement.checked).toBe(false)
    expect(checkboxes[2].nativeElement.checked).toBe(true)
  })
})

describe('QuangOptionListComponent - Blur Handling', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let hostComponent: TestHostComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule, TranslocoTestingModule.forRoot({})],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should emit blurHandler on blur', () => {
    const optionListContainer = fixture.debugElement.query(By.css('.option-list'))
    const blurEvent = new FocusEvent('blur')

    optionListContainer.triggerEventHandler('blur', blurEvent)
    fixture.detectChanges()

    expect(hostComponent.blurEvent).toBe(blurEvent)
  })
})

describe('QuangOptionListComponent - Search in SELECT mode', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let optionListComponent: QuangOptionListComponent

  beforeEach(async () => {
    vi.useFakeTimers()
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule, TranslocoTestingModule.forRoot({})],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    fixture.componentInstance.parentType = OptionListParentType.SELECT
    fixture.detectChanges()
    optionListComponent = fixture.debugElement.query(By.directive(QuangOptionListComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should find option by typing first letter', () => {
    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    // Add scrollIntoView mock to each element
    const mockListItems = listItems.map((item) => {
      item.nativeElement.scrollIntoView = vi.fn()
      return item.nativeElement
    }) as HTMLLIElement[]

    // Type 'f' to find France
    const newIndex = optionListComponent.handleSearch('f', mockListItems, 0)

    // France is at index 2 (after null and Italy)
    expect(newIndex).toBe(2)
  })

  it('should find option by typing multiple letters', async () => {
    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    // Add scrollIntoView mock to each element
    const mockListItems = listItems.map((item) => {
      item.nativeElement.scrollIntoView = vi.fn()
      return item.nativeElement
    }) as HTMLLIElement[]

    // Type 'ge' to find Germany
    optionListComponent.handleSearch('g', mockListItems, 0)
    const newIndex = optionListComponent.handleSearch('e', mockListItems, 0)

    // Germany is at index 3
    expect(newIndex).toBe(3)
  })

  it('should reset search string after timeout', async () => {
    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    // Add scrollIntoView mock to each element
    const mockListItems = listItems.map((item) => {
      item.nativeElement.scrollIntoView = vi.fn()
      return item.nativeElement
    }) as HTMLLIElement[]

    optionListComponent.handleSearch('f', mockListItems, 0)
    expect(optionListComponent.searchString()).toBe('f')

    // Advance time past the reset timeout (500ms)
    await vi.advanceTimersByTimeAsync(600)

    expect(optionListComponent.searchString()).toBe('')
  })

  it('should return current index if no match found', () => {
    const listItems = fixture.debugElement.queryAll(By.css('.item'))
    const mockListItems = listItems.map((item) => item.nativeElement) as HTMLLIElement[]

    // Type 'x' which doesn't match any option
    const newIndex = optionListComponent.handleSearch('x', mockListItems, 1)

    expect(newIndex).toBe(1)
  })
})

describe('QuangOptionListComponent - Positioning', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let optionListComponent: QuangOptionListComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule, TranslocoTestingModule.forRoot({})],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    fixture.detectChanges()
    optionListComponent = fixture.debugElement.query(By.directive(QuangOptionListComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should set element width based on button ref', () => {
    optionListComponent.getOptionListWidth()
    expect(optionListComponent.elementWidth()).toMatch(/\d+px/)
  })

  it('should calculate element top position', () => {
    optionListComponent.getOptionListTop()
    // Either top or bottom should be set
    const top = optionListComponent.elementTop()
    const bottom = optionListComponent.elementBottom()

    expect(top === 'unset' || bottom === 'unset').toBe(true)
  })
})

describe('QuangOptionListComponent - Scrollable Parent Detection', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let optionListComponent: QuangOptionListComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule, TranslocoTestingModule.forRoot({})],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    fixture.detectChanges()
    optionListComponent = fixture.debugElement.query(By.directive(QuangOptionListComponent)).componentInstance
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should return false for isScrollable on non-scrollable element', () => {
    const div = document.createElement('div')
    expect(optionListComponent.isScrollable(div)).toBe(false)
  })

  it('should return document.body as scroll parent for non-scrollable parents', () => {
    const div = document.createElement('div')
    const parent = optionListComponent.getScrollParent(div)
    expect(parent).toBe(document.body)
  })

  it('should handle null/undefined in getScrollParent', () => {
    expect(optionListComponent.getScrollParent(null)).toBe(document.body)
    expect(optionListComponent.getScrollParent(undefined)).toBe(document.body)
  })
})
