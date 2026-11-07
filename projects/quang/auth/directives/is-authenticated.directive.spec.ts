import { Component, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangAuthService } from '../auth.service'

import { QuangIsAuthenticatedDirective } from './is-authenticated.directive'

@Component({
  template: `
    <div *quangIsAuthenticated>
      <span class="protected-content">protected</span>
    </div>
  `,
  imports: [QuangIsAuthenticatedDirective],
})
class TestHostComponent {}

describe('QuangIsAuthenticatedDirective', () => {
  it('should be defined', () => {
    expect(QuangIsAuthenticatedDirective).toBeDefined()
  })

  describe('rendering', () => {
    let fixture: ComponentFixture<TestHostComponent>
    let isAuthenticated: ReturnType<typeof signal<boolean>>

    const protectedContentCount = (): number =>
      (fixture.nativeElement as HTMLElement).querySelectorAll('.protected-content').length

    beforeEach(() => {
      // The effect under test reacts to writes on the auth state, so the mock signal
      // notifies on every write instead of collapsing equal values.
      isAuthenticated = signal(false, { equal: () => false })

      TestBed.configureTestingModule({
        imports: [TestHostComponent],
        providers: [{ provide: QuangAuthService, useValue: { isAuthenticated } }],
      })

      fixture = TestBed.createComponent(TestHostComponent)
    })

    it('should render the templated content only once when the effect re-runs while the user is authenticated', () => {
      isAuthenticated.set(true)
      fixture.detectChanges()

      isAuthenticated.set(true)
      fixture.detectChanges()

      expect(protectedContentCount()).toBe(1)
    })
  })
})
