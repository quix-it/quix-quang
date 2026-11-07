import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay'
import { Component, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { QuangModalComponent } from './modal.component'

import { ModalAnimationMode } from './models/ModalAnimationMode'

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

@Component({
  standalone: true,
  imports: [QuangModalComponent],
  template: `
    <quang-modal
      [animationMode]="animationMode()"
      position="center"
    >
      <ng-container body>
        <p>Body</p>
      </ng-container>
    </quang-modal>
  `,
})
class AnimatedModalHostComponent {
  animationMode = signal<ModalAnimationMode | undefined>(undefined)
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

  describe('animationMode', () => {
    let styleEl: HTMLStyleElement

    beforeEach(() => {
      // The animation rules are plain single-class CSS, so the stylesheet is parsed as is.
      styleEl = document.createElement('style')
      styleEl.textContent = readFileSync(
        resolve(process.cwd(), 'projects/quang/overlay/modal/modal.component.scss'),
        'utf8'
      )
      document.head.appendChild(styleEl)
    })

    afterEach(() => {
      styleEl.remove()
    })

    // Starting transform of the enter animation the cascade applies to the rendered dialog.
    function enterAnimationStart(mode: ModalAnimationMode): string | undefined {
      const animatedFixture = TestBed.createComponent(AnimatedModalHostComponent)
      animatedFixture.componentInstance.animationMode.set(mode)
      animatedFixture.detectChanges()
      const dialogs = overlayContainer.getContainerElement().querySelectorAll<HTMLElement>('.dialog')
      const dialog = dialogs[dialogs.length - 1]
      const rules = Array.from(styleEl.sheet?.cssRules ?? [])
      const animationName = rules
        .filter(
          (rule): rule is CSSStyleRule =>
            /^\.[\w-]+$/.test((rule as CSSStyleRule).selectorText ?? '') &&
            dialog.classList.contains((rule as CSSStyleRule).selectorText.slice(1))
        )
        .map((rule) => rule.style.getPropertyValue('animation').split(' ')[0])
        .filter((name) => !!name)
        .pop()
      const keyframes = rules.find(
        (rule): rule is CSSKeyframesRule => 'name' in rule && (rule as CSSKeyframesRule).name === animationName
      )
      const from = Array.from(keyframes?.cssRules ?? []).find((frame) => (frame as CSSKeyframeRule).keyText === 'from')
      animatedFixture.destroy()
      return (from as CSSKeyframeRule | undefined)?.style.getPropertyValue('transform')
    }

    it('should make the modal enter from the top when animationMode is SLIDE_TOP_TO_BOTTOM', () => {
      expect(enterAnimationStart('SLIDE_TOP_TO_BOTTOM')).toBe('translateY(-100%)')
    })

    it('should give SLIDE_TOP_TO_BOTTOM and SLIDE_BOTTOM_TO_TOP different enter animations', () => {
      expect(enterAnimationStart('SLIDE_TOP_TO_BOTTOM')).not.toBe(enterAnimationStart('SLIDE_BOTTOM_TO_TOP'))
    })
  })
})
