import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay'
import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangModalComponent } from './modal.component'

@Component({
  standalone: true,
  imports: [QuangModalComponent],
  template: `
    <quang-modal
      (backdropClick)="onBackdropClick()"
      position="center"
    >
      <ng-container header>
        <h2>Header</h2>
      </ng-container>
      <ng-container body>
        <p>Body</p>
      </ng-container>
      <ng-container footer>
        <span>Footer</span>
      </ng-container>
    </quang-modal>
  `,
})
class ModalHostComponent {
  backdropClicks = 0

  onBackdropClick(): void {
    this.backdropClicks += 1
  }
}

describe('QuangModalComponent', () => {
  let fixture: ComponentFixture<ModalHostComponent>
  let overlayContainer: OverlayContainer

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayModule, ModalHostComponent],
    }).compileComponents()

    overlayContainer = TestBed.inject(OverlayContainer)
    fixture = TestBed.createComponent(ModalHostComponent)
    fixture.detectChanges()
  })

  afterEach(() => {
    overlayContainer.ngOnDestroy()
  })

  it('should attach overlay with projected content', () => {
    const containerEl = overlayContainer.getContainerElement()
    const dialog = containerEl.querySelector('.dialog') as HTMLElement | null
    expect(dialog).not.toBeNull()
    expect(dialog?.textContent).toContain('Header')
    expect(dialog?.textContent).toContain('Body')
    expect(dialog?.textContent).toContain('Footer')
  })

  it('should emit backdropClick when backdrop is clicked', () => {
    const containerEl = overlayContainer.getContainerElement()
    const backdrop = containerEl.querySelector('.cdk-overlay-backdrop') as HTMLElement | null
    expect(backdrop).not.toBeNull()

    backdrop?.click()
    fixture.detectChanges()

    expect(fixture.componentInstance.backdropClicks).toBe(1)
  })
})
