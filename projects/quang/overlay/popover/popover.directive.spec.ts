import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay'
import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { QuangPopoverComponent } from './popover.component'

import { QuangPopoverDirective } from './popover.directive'

@Component({
  standalone: true,
  imports: [QuangPopoverDirective],
  template: `
    <button
      [quangOverlayPayload]="payload"
      [quangPopover]="tpl"
      showMethod="click"
    >
      Trigger
    </button>

    <ng-template
      #tpl
      let-data
    >
      <span class="payload">{{ data.foo }}</span>
    </ng-template>
  `,
})
class PopoverHostComponent {
  payload = { foo: 'bar' }
}

describe('QuangPopoverDirective', () => {
  let fixture: ComponentFixture<PopoverHostComponent>
  let overlayContainer: OverlayContainer | null = null

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayModule, NoopAnimationsModule, QuangPopoverComponent, PopoverHostComponent],
    }).compileComponents()

    overlayContainer = TestBed.inject(OverlayContainer)
    fixture = TestBed.createComponent(PopoverHostComponent)
    fixture.detectChanges()
  })

  afterEach(() => {
    overlayContainer?.ngOnDestroy()
  })

  it('should attach on click and render template with payload', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    const containerEl = overlayContainer!.getContainerElement()

    button.click()
    fixture.detectChanges()

    const payloadEl = containerEl.querySelector('.payload') as HTMLElement | null
    expect(payloadEl).not.toBeNull()
    expect(payloadEl?.textContent).toContain('bar')
  })

  it('should close on backdrop click', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    const containerEl = overlayContainer!.getContainerElement()

    button.click()
    fixture.detectChanges()

    expect(containerEl.querySelector('.payload')).not.toBeNull()

    const backdrop = containerEl.querySelector('.cdk-overlay-backdrop') as HTMLElement | null
    expect(backdrop).not.toBeNull()

    backdrop?.click()
    fixture.detectChanges()

    expect(containerEl.querySelector('.payload')).toBeNull()
  })
})
