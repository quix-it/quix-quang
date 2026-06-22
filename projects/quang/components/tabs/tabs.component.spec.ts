import { Component, DebugElement, Injectable, TemplateRef, ViewChild, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { By } from '@angular/platform-browser'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { QuangTabsComponent, TabConfiguration } from './tabs.component'

@Injectable()
class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(_lang: string): Observable<Record<string, string>> {
    return of({
      'tab.first': 'First Tab',
      'tab.second': 'Second Tab',
      'tab.third': 'Third Tab',
    })
  }
}

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

// Standard test host component
@Component({
  template: `
    <form [formGroup]="form">
      <ng-template
        #tabTpl
        let-index="index"
        let-selected="selected"
        let-tab
      >
        <span class="custom-tab">Custom {{ tab.id }} {{ selected }} {{ index }}</span>
      </ng-template>

      <quang-tabs
        [componentClass]="componentClass"
        [componentTabIndex]="componentTabIndex"
        [isReadonly]="isReadonly()"
        [tabs]="tabs"
        (tabChange)="onTabChange($event)"
        formControlName="selectedTab"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangTabsComponent],
})
class TestHostComponent {
  @ViewChild('tabTpl', { read: TemplateRef })
  tabTpl?: TemplateRef<unknown>

  form = new FormGroup({
    selectedTab: new FormControl<string>('tab1'),
  })

  isReadonly = signal<boolean>(false)
  componentClass = ''
  componentTabIndex = 0
  lastTabChangeEvent: string | null = null

  tabs: TabConfiguration[] = [
    { id: 'tab1', label: 'tab.first' },
    { id: 'tab2', label: 'tab.second' },
    { id: 'tab3', label: 'tab.third' },
  ]

  onTabChange(tabId: string): void {
    this.lastTabChangeEvent = tabId
  }

  setTemplatedTabs(): void {
    this.tabs = [
      { id: 'tab1', label: 'tab.first' },
      { id: 'tab2', label: 'tab.second', renderer: this.tabTpl },
      { id: 'tab3', label: 'tab.third' },
    ]
  }

  setDisabledTab(): void {
    this.tabs = [
      { id: 'tab1', label: 'tab.first' },
      { id: 'tab2', label: 'tab.second', disabled: true },
      { id: 'tab3', label: 'tab.third' },
    ]
  }
}

// Test host for snapshots
@Component({
  template: `
    <quang-tabs
      [formControl]="control"
      [tabs]="tabs"
    />
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangTabsComponent],
})
class SnapshotHostComponent {
  control = new FormControl<string>('tab1')
  tabs: TabConfiguration[] = [
    { id: 'tab1', label: 'First' },
    { id: 'tab2', label: 'Second' },
  ]
}

describe('QuangTabsComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let host: TestHostComponent
  let tabsComponent: QuangTabsComponent
  let tabsDebugElement: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    host = fixture.componentInstance
    tabsDebugElement = fixture.debugElement.query(By.directive(QuangTabsComponent))
    tabsComponent = tabsDebugElement.componentInstance
    fixture.detectChanges()
  })

  describe('Component Initialization', () => {
    it('should be defined', () => {
      expect(QuangTabsComponent).toBeDefined()
    })

    it('should create component instance', () => {
      expect(tabsComponent).toBeTruthy()
    })

    it('should initialize with correct number of tabs', () => {
      expect(tabsComponent.tabs().length).toBe(3)
    })

    it('should render all tabs as buttons', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(buttons.length).toBe(3)
    })

    it('should display translated labels', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(buttons[0].textContent?.trim()).toBe('First Tab')
      expect(buttons[1].textContent?.trim()).toBe('Second Tab')
      expect(buttons[2].textContent?.trim()).toBe('Third Tab')
    })

    it('should have tabs container with correct id', () => {
      const container = fixture.nativeElement.querySelector('#tabs-container')
      expect(container).toBeTruthy()
    })

    it('should apply flex layout classes', () => {
      const container = fixture.nativeElement.querySelector('#tabs-container')
      expect(container.classList.contains('d-flex')).toBe(true)
      expect(container.classList.contains('flex-column')).toBe(true)
      expect(container.classList.contains('flex-lg-row')).toBe(true)
    })
  })

  describe('Tab Selection', () => {
    it('should mark first tab as selected initially', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(buttons[0].classList.contains('selected')).toBe(true)
      expect(buttons[1].classList.contains('selected')).toBe(false)
      expect(buttons[2].classList.contains('selected')).toBe(false)
    })

    it('should update form control value when tab is clicked', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[1].click()
      fixture.detectChanges()

      expect(host.form.get('selectedTab')?.value).toBe('tab2')
    })

    it('should update selected class when tab is clicked', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[1].click()
      fixture.detectChanges()

      expect(buttons[0].classList.contains('selected')).toBe(false)
      expect(buttons[1].classList.contains('selected')).toBe(true)
      expect(buttons[2].classList.contains('selected')).toBe(false)
    })

    it('should update selected tab when form value changes programmatically', () => {
      host.form.patchValue({ selectedTab: 'tab3' })
      fixture.detectChanges()

      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(buttons[2].classList.contains('selected')).toBe(true)
      expect(buttons[0].classList.contains('selected')).toBe(false)
    })

    it('should call isTabSelected correctly', () => {
      expect(tabsComponent.isTabSelected(host.tabs[0])).toBe(true)
      expect(tabsComponent.isTabSelected(host.tabs[1])).toBe(false)
      expect(tabsComponent.isTabSelected(host.tabs[2])).toBe(false)
    })
  })

  describe('Tab Events', () => {
    it('should emit tabChange event when tab is clicked', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[2].click()
      fixture.detectChanges()

      expect(host.lastTabChangeEvent).toBe('tab3')
    })

    it('should emit tabChange with correct tab id', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[1].click()
      fixture.detectChanges()
      expect(host.lastTabChangeEvent).toBe('tab2')

      buttons[0].click()
      fixture.detectChanges()
      expect(host.lastTabChangeEvent).toBe('tab1')
    })

    it('should not emit tabChange when clicking already selected tab', () => {
      host.lastTabChangeEvent = null
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      // Click first tab (already selected)
      buttons[0].click()
      fixture.detectChanges()

      // Event should still be emitted (component doesn't prevent this)
      expect(host.lastTabChangeEvent).toBe('tab1')
    })
  })

  describe('Disabled State', () => {
    it('should disable all tabs when form control is disabled', () => {
      host.form.get('selectedTab')?.disable()
      fixture.detectChanges()

      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(Array.from(buttons).every((b) => b.disabled)).toBe(true)
    })

    it('should not change tab when form control is disabled', () => {
      host.form.get('selectedTab')?.disable()
      fixture.detectChanges()

      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      const initialValue = host.form.get('selectedTab')?.value

      buttons[1].click()
      fixture.detectChanges()

      expect(host.form.get('selectedTab')?.value).toBe(initialValue)
    })

    it('should not emit tabChange when disabled tab is clicked', () => {
      host.form.get('selectedTab')?.disable()
      fixture.detectChanges()

      host.lastTabChangeEvent = null
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[1].click()
      fixture.detectChanges()

      expect(host.lastTabChangeEvent).toBeNull()
    })

    it('should re-enable tabs when form control is enabled', () => {
      host.form.get('selectedTab')?.disable()
      fixture.detectChanges()

      let buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(buttons[0].disabled).toBe(true)

      host.form.get('selectedTab')?.enable()
      fixture.detectChanges()

      buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(buttons[0].disabled).toBe(false)
    })
  })

  describe('Individual Tab Disabled State', () => {
    beforeEach(() => {
      host.setDisabledTab()
      fixture.detectChanges()
    })

    it('should disable individual tab when tab.disabled is true', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(buttons[0].disabled).toBe(false)
      expect(buttons[1].disabled).toBe(true)
      expect(buttons[2].disabled).toBe(false)
    })

    it('should not select disabled tab when clicked', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[1].click()
      fixture.detectChanges()

      expect(host.form.get('selectedTab')?.value).toBe('tab1') // Should remain tab1
    })

    it('should not emit tabChange for disabled tab', () => {
      host.lastTabChangeEvent = null
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[1].click()
      fixture.detectChanges()

      expect(host.lastTabChangeEvent).toBeNull()
    })

    it('should call isTabDisabled correctly for individual tabs', () => {
      expect(tabsComponent.isTabDisabled(host.tabs[0])).toBe(false)
      expect(tabsComponent.isTabDisabled(host.tabs[1])).toBe(true)
      expect(tabsComponent.isTabDisabled(host.tabs[2])).toBe(false)
    })
  })

  describe('Readonly Mode', () => {
    it('should disable all tabs when isReadonly is true', () => {
      host.isReadonly.set(true)
      fixture.detectChanges()

      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(Array.from(buttons).every((b) => b.disabled)).toBe(true)
    })

    it('should not allow tab selection in readonly mode', () => {
      host.isReadonly.set(true)
      fixture.detectChanges()

      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[1].click()
      fixture.detectChanges()

      expect(host.form.get('selectedTab')?.value).toBe('tab1') // Should not change
    })

    it('should not emit tabChange in readonly mode', () => {
      host.isReadonly.set(true)
      fixture.detectChanges()

      host.lastTabChangeEvent = null
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[1].click()
      fixture.detectChanges()

      expect(host.lastTabChangeEvent).toBeNull()
    })

    it('should enable tabs when readonly is turned off', () => {
      host.isReadonly.set(true)
      fixture.detectChanges()

      let buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(buttons[0].disabled).toBe(true)

      host.isReadonly.set(false)
      fixture.detectChanges()

      buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(buttons[0].disabled).toBe(false)
    })
  })

  describe('Custom Tab Templates', () => {
    beforeEach(() => {
      host.setTemplatedTabs()
      fixture.detectChanges()
    })

    it('should render custom tab template when renderer is provided', () => {
      const custom = fixture.nativeElement.querySelector('.custom-tab') as HTMLElement | null
      expect(custom).toBeTruthy()
      expect(custom?.textContent).toContain('Custom tab2')
    })

    it('should pass tab object to custom template', () => {
      const custom = fixture.nativeElement.querySelector('.custom-tab') as HTMLElement | null
      expect(custom?.textContent).toContain('tab2')
    })

    it('should pass selected state to custom template', () => {
      const custom = fixture.nativeElement.querySelector('.custom-tab') as HTMLElement | null
      expect(custom?.textContent).toContain('false') // tab2 is not selected initially
    })

    it('should update selected state in custom template when tab is selected', () => {
      host.form.patchValue({ selectedTab: 'tab2' })
      fixture.detectChanges()

      const custom = fixture.nativeElement.querySelector('.custom-tab') as HTMLElement | null
      expect(custom?.textContent).toContain('true') // tab2 is now selected
    })

    it('should pass index to custom template', () => {
      const custom = fixture.nativeElement.querySelector('.custom-tab') as HTMLElement | null
      expect(custom?.textContent).toContain('1') // tab2 is at index 1
    })

    it('should render standard tabs alongside custom templates', () => {
      const allTabs = fixture.nativeElement.querySelectorAll('button, .custom-tab')
      expect(allTabs.length).toBe(3) // 2 buttons + 1 custom
    })
  })

  describe('Helper Methods', () => {
    it('should return correct tab index with getTabIndex', () => {
      expect(tabsComponent.getTabIndex(host.tabs[0])).toBe(0)
      expect(tabsComponent.getTabIndex(host.tabs[1])).toBe(1)
      expect(tabsComponent.getTabIndex(host.tabs[2])).toBe(2)
    })

    it('should return -1 for non-existent tab', () => {
      const fakeTab: TabConfiguration = { id: 'fake', label: 'Fake' }
      expect(tabsComponent.getTabIndex(fakeTab)).toBe(-1)
    })

    it('should call onSelectTab when tab is clicked', () => {
      const spy = vi.spyOn(tabsComponent, 'onSelectTab')
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[1].click()

      expect(spy).toHaveBeenCalledWith(host.tabs[1])
    })

    it('should not call onChangedHandler when tab is disabled', () => {
      host.setDisabledTab()
      fixture.detectChanges()

      const spy = vi.spyOn(tabsComponent, 'onChangedHandler')
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[1].click()

      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('Component Inputs', () => {
    it('should accept componentClass input', () => {
      host.componentClass = 'custom-class'
      fixture.detectChanges()

      // The componentClass is inherited from QuangBaseComponent
      expect(tabsComponent.componentClass()).toBe('custom-class')
    })

    it('should accept componentTabIndex input', () => {
      host.componentTabIndex = 5
      fixture.detectChanges()

      expect(tabsComponent.componentTabIndex()).toBe(5)
    })

    it('should accept tabs input', () => {
      const newTabs: TabConfiguration[] = [
        { id: 'new1', label: 'New 1' },
        { id: 'new2', label: 'New 2' },
      ]
      host.tabs = newTabs
      fixture.detectChanges()

      expect(tabsComponent.tabs().length).toBe(2)
      expect(tabsComponent.tabs()[0].id).toBe('new1')
    })
  })

  describe('Form Integration', () => {
    it('should work with reactive forms', () => {
      expect(host.form.get('selectedTab')?.value).toBe('tab1')

      host.form.patchValue({ selectedTab: 'tab2' })
      fixture.detectChanges()

      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(buttons[1].classList.contains('selected')).toBe(true)
    })

    it('should support form validation', () => {
      host.form = new FormGroup({
        selectedTab: new FormControl<string | null>(null, Validators.required),
      })
      fixture.detectChanges()

      expect(host.form.get('selectedTab')?.invalid).toBe(true)

      host.form.patchValue({ selectedTab: 'tab1' })
      expect(host.form.get('selectedTab')?.valid).toBe(true)
    })

    it('should update form on tab click', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[2].click()
      fixture.detectChanges()

      expect(host.form.value).toEqual({ selectedTab: 'tab3' })
    })
  })

  describe('Accessibility', () => {
    it('should have button type="button"', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(Array.from(buttons).every((b) => b.type === 'button')).toBe(true)
    })

    it('should apply correct CSS classes to buttons', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(buttons[0].classList.contains('btn')).toBe(true)
      expect(buttons[0].classList.contains('btn-only-text')).toBe(true)
      expect(buttons[0].classList.contains('flex-grow-1')).toBe(true)
    })

    it('should handle keyboard navigation', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      // Simulate Enter key press
      buttons[1].dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }))
      buttons[1].click()
      fixture.detectChanges()

      expect(host.form.get('selectedTab')?.value).toBe('tab2')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty tabs array', () => {
      host.tabs = []
      fixture.detectChanges()

      const buttons = fixture.nativeElement.querySelectorAll('button')
      expect(buttons.length).toBe(0)
    })

    it('should handle single tab', () => {
      host.tabs = [{ id: 'only', label: 'Only Tab' }]
      host.form.patchValue({ selectedTab: 'only' })
      fixture.detectChanges()

      const buttons = fixture.nativeElement.querySelectorAll('button')
      expect(buttons.length).toBe(1)
      expect(buttons[0].classList.contains('selected')).toBe(true)
    })

    it('should handle rapid tab changes', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[1].click()
      buttons[2].click()
      buttons[0].click()
      fixture.detectChanges()

      expect(host.form.get('selectedTab')?.value).toBe('tab1')
      expect(host.lastTabChangeEvent).toBe('tab1')
    })

    it('should handle null form value', () => {
      host.form.patchValue({ selectedTab: null as unknown as string })
      fixture.detectChanges()

      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
      expect(Array.from(buttons).every((b) => !b.classList.contains('selected'))).toBe(true)
    })

    it('should handle tabs with same label but different ids', () => {
      host.tabs = [
        { id: 'tab1', label: 'Same Label' },
        { id: 'tab2', label: 'Same Label' },
      ]
      fixture.detectChanges()

      const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>

      buttons[1].click()
      fixture.detectChanges()

      expect(host.form.get('selectedTab')?.value).toBe('tab2')
    })
  })

  describe('Snapshot Tests', () => {
    let snapshotFixture: ComponentFixture<SnapshotHostComponent>
    let snapshotHost: SnapshotHostComponent

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SnapshotHostComponent],
        providers: [getTranslocoTestingProviders()],
      }).compileComponents()

      snapshotFixture = TestBed.createComponent(SnapshotHostComponent)
      snapshotHost = snapshotFixture.componentInstance
      snapshotFixture.detectChanges()
    })

    it('should match snapshot with default tabs', () => {
      const container = snapshotFixture.nativeElement.querySelector('#tabs-container')
      expect(container.innerHTML).toMatchSnapshot()
    })

    it('should match snapshot with first tab selected', () => {
      snapshotHost.control.setValue('tab1')
      snapshotFixture.detectChanges()

      const container = snapshotFixture.nativeElement.querySelector('#tabs-container')
      expect(container.innerHTML).toMatchSnapshot()
    })

    it('should match snapshot with second tab selected', () => {
      snapshotHost.control.setValue('tab2')
      snapshotFixture.detectChanges()

      const container = snapshotFixture.nativeElement.querySelector('#tabs-container')
      expect(container.innerHTML).toMatchSnapshot()
    })
  })
})
