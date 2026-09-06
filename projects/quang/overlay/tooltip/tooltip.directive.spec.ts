import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay'
import { Component, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { QuangTooltipComponent } from './tooltip.component'

import { QuangTooltipDirective } from './tooltip.directive'

@Component({
  standalone: true,
  imports: [QuangTooltipDirective],
  template: `
    <button
      [quangTooltip]="tooltipText"
      [showMethod]="showMethod()"
    >
      Trigger
    </button>
  `,
})
class TooltipHostComponent {
  tooltipText = 'Hello'
  showMethod = signal<'click' | 'hover'>('hover')
}

describe('QuangTooltipDirective', () => {
  let fixture: ComponentFixture<TooltipHostComponent>
  let overlayContainer: OverlayContainer | null = null

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayModule, NoopAnimationsModule, QuangTooltipComponent, TooltipHostComponent],
    }).compileComponents()

    overlayContainer = TestBed.inject(OverlayContainer)
    fixture = TestBed.createComponent(TooltipHostComponent)
    fixture.detectChanges()
  })

  afterEach(() => {
    overlayContainer?.ngOnDestroy()
  })

  it('should attach on hover and detach on leave (hover mode)', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    const containerEl = overlayContainer!.getContainerElement()

    button.dispatchEvent(new Event('mouseenter'))
    fixture.detectChanges()

    const tooltip = containerEl.querySelector('.quang-tooltip') as HTMLElement | null
    expect(tooltip).not.toBeNull()
    expect(tooltip?.textContent).toContain('Hello')

    button.dispatchEvent(new Event('mouseleave'))
    fixture.detectChanges()

    expect(containerEl.querySelector('.quang-tooltip')).toBeNull()
  })

  it('should attach on click and close on backdrop click (click mode)', () => {
    fixture.componentInstance.showMethod.set('click')
    fixture.detectChanges()

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    const containerEl = overlayContainer!.getContainerElement()

    button.click()
    fixture.detectChanges()

    expect(containerEl.querySelector('.quang-tooltip')).not.toBeNull()

    const backdrop = containerEl.querySelector('.cdk-overlay-backdrop') as HTMLElement | null
    expect(backdrop).not.toBeNull()

    backdrop?.click()
    fixture.detectChanges()

    expect(containerEl.querySelector('.quang-tooltip')).toBeNull()
  })
})
