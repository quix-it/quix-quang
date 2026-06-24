import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideNoopAnimations } from '@angular/platform-browser/animations'

import { QuangTooltipComponent } from './tooltip.component'

describe('QuangTooltipComponent', () => {
  let fixture: ComponentFixture<QuangTooltipComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuangTooltipComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents()

    fixture = TestBed.createComponent(QuangTooltipComponent)
  })

  it('should render tooltip content when overlayContent is provided', () => {
    fixture.componentRef.setInput('overlayContent', 'Hello')
    fixture.detectChanges()

    const tooltip = fixture.nativeElement.querySelector('.quang-tooltip') as HTMLElement | null
    expect(tooltip).not.toBeNull()
    expect(tooltip?.textContent).toContain('Hello')
  })

  it('should not render tooltip when overlayContent is an empty string', () => {
    fixture.componentRef.setInput('overlayContent', '')
    fixture.detectChanges()

    const tooltip = fixture.nativeElement.querySelector('.quang-tooltip') as HTMLElement | null
    expect(tooltip).toBeNull()
  })
})
