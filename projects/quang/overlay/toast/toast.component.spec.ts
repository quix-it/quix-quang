import { Injectable } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { afterEach, vi } from 'vitest'

import { QuangToastService } from './toast.service'

import { QuangToastComponent } from './toast.component'

@Injectable()
class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(): Observable<Record<string, string>> {
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

describe('QuangToastComponent', () => {
  let component: QuangToastComponent
  let fixture: ComponentFixture<QuangToastComponent>
  let toastService: QuangToastService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuangToastComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(QuangToastComponent)
    component = fixture.componentInstance
    toastService = TestBed.inject(QuangToastService)
    fixture.detectChanges()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show toast when service opens one and hide when closed', () => {
    vi.useFakeTimers()

    toastService.openToast({
      type: 'success',
      position: 'top-right',
      timing: 1000,
      text: 'Hello',
      showCloseButton: true,
    })
    fixture.detectChanges()

    const toastEl = fixture.nativeElement.querySelector('.toast') as HTMLElement
    expect(toastEl.classList.contains('show')).toBe(true)
    expect(toastEl.textContent).toContain('Hello')

    const closeBtn = fixture.nativeElement.querySelector('button.btn-close') as HTMLButtonElement | null
    expect(closeBtn).not.toBeNull()

    closeBtn?.click()
    fixture.detectChanges()

    expect(toastService.isShowing()).toBe(false)
    expect(toastEl.classList.contains('hide')).toBe(true)
  })
})
