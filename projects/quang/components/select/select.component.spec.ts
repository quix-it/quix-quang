import { Component, Injectable, TemplateRef, viewChild } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { QuangSelectComponent } from './select.component'
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

@Component({
  template: `
    <form [formGroup]="form">
      <quang-select
        [selectOptions]="options"
        formControlName="country"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangSelectComponent],
})
class TestHostComponent {
  form = new FormGroup({
    country: new FormControl<string | null>(null),
  })

  options: SelectOption[] = [
    { label: 'Italy', value: 'IT' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DE' },
  ]
}

@Component({
  template: `
    <form [formGroup]="form">
      <ng-template
        #optTpl
        let-opt
        let-selected="selected"
      >
        <span class="custom-opt">Custom {{ opt.label }} selected: {{ selected }}</span>
      </ng-template>

      <quang-select
        [selectOptions]="options"
        formControlName="country"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangSelectComponent],
})
class TestHostTemplatedComponent {
  form = new FormGroup({
    country: new FormControl<string | null>(null),
  })

  private readonly optTpl = viewChild<TemplateRef<QuangSelectOptionTemplateContext>>('optTpl')

  options: SelectOption[] = [
    { label: 'Italy', value: 'IT' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DE' },
  ]

  setTemplatedOptions(): void {
    this.options = [
      { label: 'Italy', value: 'IT' },
      { label: 'France', value: 'FR', renderer: this.optTpl() },
      { label: 'Germany', value: 'DE' },
    ]
  }
}

describe('QuangSelectComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let hostComponent: TestHostComponent
  let selectComponent: QuangSelectComponent
  let buttonElement: HTMLButtonElement

  beforeEach(async () => {
    vi.useFakeTimers()

    // Mock scrollIntoView for jsdom
    Element.prototype.scrollIntoView = vi.fn()

    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TestHostTemplatedComponent, NoopAnimationsModule],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    hostComponent = fixture.componentInstance
    fixture.detectChanges()
    selectComponent = fixture.debugElement.query(By.directive(QuangSelectComponent)).componentInstance
    buttonElement = fixture.nativeElement.querySelector('quang-select button')
  })

  afterEach(() => {
    fixture.destroy()
    vi.useRealTimers()
  })

  it('should be defined', () => {
    expect(QuangSelectComponent).toBeDefined()
  })

  it('should create the component', () => {
    expect(selectComponent).toBeTruthy()
  })

  it('should focus button after selecting an option', async () => {
    // Open dropdown
    buttonElement.click()
    fixture.detectChanges()
    await vi.advanceTimersByTimeAsync(0)

    expect(selectComponent._showOptions()).toBe(true)

    // Select an option
    selectComponent.onChangedHandler('IT')
    fixture.detectChanges()
    await vi.advanceTimersByTimeAsync(100)

    // Button should be focused
    expect(document.activeElement).toBe(buttonElement)
    expect(hostComponent.form.get('country')?.value).toBe('IT')
  })

  it('should focus button after selecting an option via keyboard (Enter)', async () => {
    // Focus button and open dropdown
    buttonElement.focus()
    buttonElement.click()
    fixture.detectChanges()
    await vi.advanceTimersByTimeAsync(0)

    expect(selectComponent._showOptions()).toBe(true)

    // Simulate Enter key on option-list which triggers changedHandler
    selectComponent.onChangedHandler('FR')
    fixture.detectChanges()
    await vi.advanceTimersByTimeAsync(100)

    // Button should be focused
    expect(document.activeElement).toBe(buttonElement)
    expect(hostComponent.form.get('country')?.value).toBe('FR')
  })

  it('should focus button after pressing Escape', async () => {
    // Open dropdown
    buttonElement.click()
    fixture.detectChanges()
    await vi.advanceTimersByTimeAsync(0)

    expect(selectComponent._showOptions()).toBe(true)

    // Press Escape
    selectComponent.onEscapePressed()
    fixture.detectChanges()
    await vi.advanceTimersByTimeAsync(100)

    // Button should be focused
    expect(document.activeElement).toBe(buttonElement)
  })

  it('should render selected option renderer template in the field when provided', async () => {
    const templatedFixture = TestBed.createComponent(TestHostTemplatedComponent)
    templatedFixture.detectChanges()

    const templatedHost = templatedFixture.componentInstance
    templatedHost.setTemplatedOptions()
    templatedHost.form.get('country')?.setValue('FR')
    templatedFixture.detectChanges()
    await vi.advanceTimersByTimeAsync(0)

    const custom = templatedFixture.nativeElement.querySelector('.custom-opt') as HTMLElement | null
    expect(custom).toBeTruthy()
    expect(custom?.textContent).toContain('Custom France')
    expect(custom?.textContent).toContain('selected: true')
  })
})
