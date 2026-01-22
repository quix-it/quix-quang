import { ApplicationRef, Component, Injectable } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { By } from '@angular/platform-browser'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { QuangDateComponent } from './date.component'
import { ErrorData } from 'quang/components/shared'

// AirDatepicker is a DOM-heavy dependency; mock it for jsdom unit tests.
vi.mock('air-datepicker', () => {
  class AirDatepickerMock {
    visible = false
    $datepicker = document.createElement('div')
    selectedDates: Date[] = []
    opts: unknown
    constructor(_el: unknown, opts: unknown) {
      this.opts = opts
    }
    update(_opts: unknown, _updateOpts?: unknown): void {
      return
    }
    setFocusDate(_value: unknown): void {
      return
    }
    clear(_opts?: unknown): void {
      return
    }
    show() {
      this.visible = true
    }
    hide() {
      this.visible = false
    }
    destroy(): void {
      return
    }
    selectDate(_date: unknown, _opts?: unknown): void {
      return
    }
  }

  return {
    default: AirDatepickerMock,
  }
})

vi.mock('air-datepicker/locale/en', () => ({ default: {} }))
vi.mock('air-datepicker/locale/it', () => ({ default: {} }))
vi.mock('air-datepicker/locale/fr', () => ({ default: {} }))

@Injectable()
class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(_lang: string): Observable<Record<string, string>> {
    return of({})
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

const noMatchValidator = (control: AbstractControl<string | null>): ValidationErrors | null => {
  return control.value === 'ok' ? null : { noMatch: true }
}

interface DateRangeValue {
  dateFrom: string | null
  dateTo: string | null
}

interface AirDatepickerLike {
  opts: {
    onSelect: (arg: { date: unknown }) => void
  }
  $datepicker: HTMLElement
  selectedDates: Date[]
  show: () => void
  hide: () => void
  visible: boolean
}

interface QuangDateComponentPrivateApi {
  _value: () => unknown
  propagateValueToControl: () => void
}

@Component({
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
    >
      <quang-date
        [errorMap]="errors"
        componentId="requiredDate"
        formControlName="requiredDate"
      />

      <quang-date
        [errorMap]="errors"
        componentId="customDate"
        formControlName="customDate"
      />

      <button type="submit">Submit</button>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangDateComponent],
})
class TestHostComponent {
  errors: ErrorData[] = [
    { error: Validators.required.name, message: 'form.errors.required' },
    { error: 'noMatch', message: 'form.errors.noMatch' },
  ]

  form = new FormGroup({
    requiredDate: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    // Non-empty so required passes, invalid due to custom validator
    customDate: new FormControl<string>(new Date(0).toISOString(), {
      nonNullable: true,
      validators: [Validators.required, noMatchValidator],
    }),
  })

  onSubmit(): void {
    this.form.markAllAsTouched()
  }
}

@Component({
  template: `
    <quang-date
      [formControl]="control"
      [showInline]="true"
      [showOnlyTimepicker]="true"
      componentId="timeOnly"
      componentLabel="Time"
    />
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangDateComponent],
})
class InlineTimeOnlyHostComponent {
  control = new FormControl<string | null>('2026-01-15T10:12:00.000Z')
}

@Component({
  template: `
    <quang-date
      [formControl]="control"
      componentId="snapDefault"
      componentLabel="snap.label"
    >
      <span class="icon"></span>
    </quang-date>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangDateComponent],
})
class SnapshotDefaultHostComponent {
  control = new FormControl<string | null>(null)
}

@Component({
  template: `
    <quang-date
      [formControl]="control"
      [showInline]="true"
      componentId="snapInline"
      componentLabel="snap.inline"
    >
      <span class="icon"></span>
    </quang-date>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangDateComponent],
})
class SnapshotInlineHostComponent {
  control = new FormControl<string | null>(null)
}

@Component({
  template: `
    <quang-date
      [formControl]="control"
      componentId="snapNoContent"
      componentLabel="snap.noContent"
    />
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangDateComponent],
})
class SnapshotNoContentHostComponent {
  control = new FormControl<string | null>(null)
}

@Component({
  template: `
    <quang-date
      [formControl]="control"
      [rangeSelection]="true"
      componentId="range"
      componentLabel="Range"
    >
      <span class="icon"></span>
    </quang-date>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangDateComponent],
})
class RangeHostComponent {
  control = new FormControl<DateRangeValue | null>(null)
}

@Component({
  template: `
    <quang-date
      [datepickerOptions]="opts"
      [formControl]="control"
      [showInline]="true"
      componentId="opts"
      componentLabel="Options"
    >
      <span class="icon"></span>
    </quang-date>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangDateComponent],
})
class DatepickerOptionsHostComponent {
  control = new FormControl<string | null>(null)
  opts?: {
    onSelect?: (...args: unknown[]) => void
  }
}

@Component({
  template: `
    <quang-date
      [formControl]="control"
      componentId="parse"
      componentLabel="Parse"
    />
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangDateComponent],
})
class NonInlineParseHostComponent {
  control = new FormControl<string | null>(null)
}

@Component({
  template: `
    <quang-date
      [formControl]="control"
      [rangeSelection]="true"
      componentId="parseRange"
      componentLabel="Parse Range"
    />
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangDateComponent],
})
class NonInlineRangeParseHostComponent {
  control = new FormControl<DateRangeValue | null>(null)
}

@Component({
  template: `
    <quang-date
      [formControl]="control"
      [showOnlyTimepicker]="true"
      componentId="normalize"
      componentLabel="Normalize"
    />
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangDateComponent],
})
class NormalizeTimeOnlyHostComponent {
  control = new FormControl<string | null>('2026-01-15T10:12:00.000Z')
}

@Component({
  template: `
    <quang-date
      [activeLanguageOverride]="lang"
      [formControl]="control"
      componentId="locale"
      componentLabel="Locale"
    />
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangDateComponent],
})
class LocaleHostComponent {
  control = new FormControl<string | null>(null)
  lang: string | undefined
}

describe('QuangDateComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    fixture.detectChanges()
  })

  it('should be defined', () => {
    expect(QuangDateComponent).toBeDefined()
  })

  it('should show error state after submitting invalid form (markAllAsTouched)', () => {
    const host = fixture.componentInstance
    expect(host.form.invalid).toBe(true)

    const inputsBefore = fixture.debugElement.queryAll(By.css('quang-date input.form-control'))
    expect(inputsBefore.length).toBe(2)
    expect((inputsBefore[0].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(false)
    expect((inputsBefore[1].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(false)

    const formEl = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement
    formEl.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    fixture.detectChanges()

    const inputsAfter = fixture.debugElement.queryAll(By.css('quang-date input.form-control'))
    expect((inputsAfter[0].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(true)
    expect((inputsAfter[1].nativeElement as HTMLInputElement).classList.contains('is-invalid')).toBe(true)
  })
})

describe('QuangDateComponent - snapshots', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()
  })

  it('should match snapshot (default with content)', () => {
    const fixture = TestBed.createComponent(SnapshotDefaultHostComponent)
    fixture.detectChanges()
    expect(fixture.nativeElement as HTMLElement).toMatchSnapshot()
  })

  it('should match snapshot (inline mode hides input/button visually)', () => {
    const fixture = TestBed.createComponent(SnapshotInlineHostComponent)
    fixture.detectChanges()
    expect(fixture.nativeElement as HTMLElement).toMatchSnapshot()
  })

  it('should match snapshot (no content hides calendar button)', () => {
    const fixture = TestBed.createComponent(SnapshotNoContentHostComponent)
    fixture.detectChanges()
    expect(fixture.nativeElement as HTMLElement).toMatchSnapshot()
  })
})

describe('QuangDateComponent - range selection', () => {
  it('should not commit value on partial range selection, but should on complete range', async () => {
    await TestBed.configureTestingModule({
      imports: [RangeHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(RangeHostComponent)
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent
    const dp = dateCmp._airDatepickerInstance() as unknown as AirDatepickerLike
    const dateCmpPrivate = dateCmp as unknown as QuangDateComponentPrivateApi

    expect(dateCmpPrivate._value()).toBe(null)

    // Partial range: only start date selected.
    dp.opts.onSelect({ date: [new Date('2026-01-15T12:00:00.000Z'), null] })
    fixture.detectChanges()

    expect(dateCmpPrivate._value()).toBe(null)

    // Complete range: start + end.
    dp.opts.onSelect({ date: [new Date('2026-01-15T12:00:00.000Z'), new Date('2026-01-20T12:00:00.000Z')] })
    fixture.detectChanges()

    const value = dateCmpPrivate._value() as unknown as { dateFrom: string; dateTo: string }
    expect(value).toBeTruthy()
    expect(value.dateFrom).toContain('T00:00:00.000Z')
    expect(value.dateTo).toContain('T00:00:00.000Z')
  })

  it('should not render the separator when range value is empty (both dates null)', async () => {
    await TestBed.configureTestingModule({
      imports: [NonInlineRangeParseHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(NonInlineRangeParseHostComponent)
    fixture.detectChanges()

    // Ensure the internal value is an empty range.
    fixture.componentInstance.control.setValue({ dateFrom: null, dateTo: null })
    fixture.detectChanges()

    const inputEl = (fixture.nativeElement as HTMLElement).querySelector('input.form-control') as HTMLInputElement
    expect(inputEl.value).toBe('')
  })
})

describe('QuangDateComponent - datepickerOptions chaining', () => {
  it('should call user onSelect and still update the form control in inline mode', async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerOptionsHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(DatepickerOptionsHostComponent)
    const host = fixture.componentInstance
    host.opts = {
      onSelect: vi.fn(),
    }
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent
    const dp = dateCmp._airDatepickerInstance() as unknown as AirDatepickerLike

    expect(host.control.value).toBe(null)

    dp.opts.onSelect({ date: new Date('2026-01-15T10:12:00.000Z') })
    fixture.detectChanges()

    expect(host.opts.onSelect).toHaveBeenCalledTimes(1)
    expect(host.control.value).toContain('T')
  })

  it('should trigger a coalesced tick when propagating value (inline)', async () => {
    await TestBed.configureTestingModule({
      imports: [SnapshotInlineHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const appRef = TestBed.inject(ApplicationRef)
    const tickSpy = vi.spyOn(appRef, 'tick')

    const fixture = TestBed.createComponent(SnapshotInlineHostComponent)
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent
    const dp = dateCmp._airDatepickerInstance() as unknown as AirDatepickerLike

    tickSpy.mockClear()

    dp.opts.onSelect({ date: new Date('2026-01-15T10:12:00.000Z') })
    fixture.detectChanges()

    await new Promise<void>((resolve) => queueMicrotask(() => resolve()))
    expect(tickSpy).toHaveBeenCalled()
  })
})

describe('QuangDateComponent - inline mode', () => {
  it('should propagate value to the form control in inline time-only mode when timepicker inputs change', async () => {
    vi.useFakeTimers()

    await TestBed.configureTestingModule({
      imports: [InlineTimeOnlyHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(InlineTimeOnlyHostComponent)
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent
    const dp = dateCmp._airDatepickerInstance() as unknown as AirDatepickerLike

    // Provide a fake timepicker DOM under the current datepicker instance root.
    const timepickerRoot = document.createElement('div')
    timepickerRoot.className = 'air-datepicker-time'
    const h = document.createElement('input')
    const m = document.createElement('input')
    timepickerRoot.appendChild(h)
    timepickerRoot.appendChild(m)
    dp.$datepicker.appendChild(timepickerRoot)

    // Re-run setup to attach handlers onto the newly created inputs.
    dateCmp['setupTimepicker']()

    // Simulate that AirDatepicker updated its internal selected date (after user changes time).
    dp.selectedDates = [new Date('2026-01-15T11:24:00.000Z')]

    // Trigger the handler that the component attaches in setupTimepicker.
    h.dispatchEvent(new Event('input', { bubbles: true }))

    vi.runAllTimers()
    fixture.detectChanges()

    expect(fixture.componentInstance.control.value).toBe('2026-01-15T11:24:00.000Z')

    vi.useRealTimers()
  })
})

describe('QuangDateComponent - non-inline parsing (onHideCalendar)', () => {
  it('should parse a valid date string on hide and propagate it', async () => {
    await TestBed.configureTestingModule({
      imports: [NonInlineParseHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(NonInlineParseHostComponent)
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent

    const inputEl = (fixture.nativeElement as HTMLElement).querySelector('input.form-control') as HTMLInputElement
    inputEl.value = '15/01/2026'

    dateCmp.onHideCalendar()
    fixture.detectChanges()

    await new Promise<void>((resolve) => queueMicrotask(() => resolve()))

    expect(fixture.componentInstance.control.value).toBe('2026-01-15T00:00:00.000Z')
  })

  it('should set null on hide when the input does not match the expected format', async () => {
    await TestBed.configureTestingModule({
      imports: [NonInlineParseHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(NonInlineParseHostComponent)
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent

    const inputEl = (fixture.nativeElement as HTMLElement).querySelector('input.form-control') as HTMLInputElement
    inputEl.value = 'not-a-date'

    dateCmp.onHideCalendar()
    fixture.detectChanges()

    await new Promise<void>((resolve) => queueMicrotask(() => resolve()))
    expect(fixture.componentInstance.control.value).toBe(null)
  })

  it('should parse range input string on hide (including partial range)', async () => {
    await TestBed.configureTestingModule({
      imports: [NonInlineRangeParseHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(NonInlineRangeParseHostComponent)
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent

    const inputEl = (fixture.nativeElement as HTMLElement).querySelector('input.form-control') as HTMLInputElement

    inputEl.value = '15/01/2026 - 20/01/2026'
    dateCmp.onHideCalendar()
    fixture.detectChanges()

    await new Promise<void>((resolve) => queueMicrotask(() => resolve()))

    expect(fixture.componentInstance.control.value?.dateFrom).toBe('2026-01-15T00:00:00.000Z')
    expect(fixture.componentInstance.control.value?.dateTo).toBe('2026-01-20T00:00:00.000Z')

    // Partial range: only first date.
    inputEl.value = '15/01/2026 - '
    dateCmp.onHideCalendar()
    fixture.detectChanges()

    await new Promise<void>((resolve) => queueMicrotask(() => resolve()))
    expect(fixture.componentInstance.control.value?.dateFrom).toBe('2026-01-15T00:00:00.000Z')
    expect(fixture.componentInstance.control.value?.dateTo).toBe(null)
  })
})

describe('QuangDateComponent - keyboard interactions', () => {
  it('should open on Enter and hide on Escape', async () => {
    await TestBed.configureTestingModule({
      imports: [NonInlineParseHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(NonInlineParseHostComponent)
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent
    const dp = dateCmp._airDatepickerInstance() as unknown as AirDatepickerLike

    const showSpy = vi.spyOn(dp, 'show')
    const hideSpy = vi.spyOn(dp, 'hide')

    dateCmp.onInputKeydown(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(showSpy).toHaveBeenCalledTimes(1)

    dp.visible = true
    dateCmp.onInputKeydown(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(hideSpy).toHaveBeenCalledTimes(1)
  })
})

describe('QuangDateComponent - locale and normalization', () => {
  it('should return the right locale for activeLanguageOverride', async () => {
    await TestBed.configureTestingModule({
      imports: [LocaleHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(LocaleHostComponent)
    const host = fixture.componentInstance
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent

    host.lang = 'it'
    fixture.detectChanges()
    expect(dateCmp.getLocale()).toBeDefined()

    host.lang = 'fr'
    fixture.detectChanges()
    expect(dateCmp.getLocale()).toBeDefined()

    host.lang = 'xx'
    fixture.detectChanges()
    expect(dateCmp.getLocale()).toBeDefined()
  })

  it('should preserve date part when showOnlyTimepicker updates value', async () => {
    await TestBed.configureTestingModule({
      imports: [NormalizeTimeOnlyHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(NormalizeTimeOnlyHostComponent)
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent

    // Set a value with a different date; component should keep current date and replace only time.
    dateCmp.onChangedHandler('1999-01-01T11:24:00.000Z')
    ;(dateCmp as unknown as QuangDateComponentPrivateApi).propagateValueToControl()
    fixture.detectChanges()

    await new Promise<void>((resolve) => queueMicrotask(() => resolve()))

    expect(fixture.componentInstance.control.value).toBe('2026-01-15T11:24:00.000Z')
  })
})

describe('QuangDateComponent - onChangeText', () => {
  it('should update internal value for a valid non-inline date string', async () => {
    await TestBed.configureTestingModule({
      imports: [NonInlineParseHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(NonInlineParseHostComponent)
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent

    const inputEl = (fixture.nativeElement as HTMLElement).querySelector('input.form-control') as HTMLInputElement
    inputEl.value = '15/01/2026'

    dateCmp.onChangeText({ target: inputEl } as unknown as Event)
    fixture.detectChanges()

    // Non-inline: CVA propagation happens on hide/blur, but internal value should be updated.
    expect((dateCmp as unknown as QuangDateComponentPrivateApi)._value()).toBe('2026-01-15T00:00:00.000Z')
    expect(fixture.componentInstance.control.value).toBe(null)
  })

  it('should propagate to the FormControl for a valid inline date string', async () => {
    await TestBed.configureTestingModule({
      imports: [SnapshotInlineHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(SnapshotInlineHostComponent)
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent

    const inputEl = (fixture.nativeElement as HTMLElement).querySelector('input.form-control') as HTMLInputElement
    inputEl.value = '15/01/2026'

    dateCmp.onChangeText({ target: inputEl } as unknown as Event)
    fixture.detectChanges()

    expect(fixture.componentInstance.control.value).toBe('2026-01-15T00:00:00.000Z')
  })

  it('should propagate empty string to the FormControl when clearing input in inline mode', async () => {
    await TestBed.configureTestingModule({
      imports: [SnapshotInlineHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(SnapshotInlineHostComponent)
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent

    const inputEl = (fixture.nativeElement as HTMLElement).querySelector('input.form-control') as HTMLInputElement
    inputEl.value = ''

    dateCmp.onChangeText({ target: inputEl } as unknown as Event)
    fixture.detectChanges()

    expect(fixture.componentInstance.control.value).toBe('')
  })

  it('should ignore invalid/incomplete input', async () => {
    await TestBed.configureTestingModule({
      imports: [NonInlineParseHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    const fixture = TestBed.createComponent(NonInlineParseHostComponent)
    fixture.detectChanges()

    const dateDebugEl = fixture.debugElement.query(By.directive(QuangDateComponent))
    const dateCmp = dateDebugEl.componentInstance as QuangDateComponent

    const inputEl = (fixture.nativeElement as HTMLElement).querySelector('input.form-control') as HTMLInputElement

    // Wrong length => ignored.
    inputEl.value = '1/1/2026'
    dateCmp.onChangeText({ target: inputEl } as unknown as Event)
    fixture.detectChanges()
    expect((dateCmp as unknown as QuangDateComponentPrivateApi)._value()).toBe(null)

    // Same length but invalid => ignored.
    inputEl.value = '99/99/9999'
    dateCmp.onChangeText({ target: inputEl } as unknown as Event)
    fixture.detectChanges()
    expect((dateCmp as unknown as QuangDateComponentPrivateApi)._value()).toBe(null)
  })
})
