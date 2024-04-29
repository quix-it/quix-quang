import { ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { Directive, ElementRef, HostListener, computed, effect, inject, input, signal } from '@angular/core'

import { QuangTooltipComponent } from './tooltip.component'

@Directive({
  selector: '[quangTooltip]',
  standalone: true
})
export class QuangTooltipDirective {
  showTimeout: any
  text = input.required<string>({ alias: 'quangTooltip' })
  quangTooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top')
  private top = signal<ConnectedPosition>({
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -8
  })
  private bottom = signal<ConnectedPosition>({
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 8
  })
  private left = signal<ConnectedPosition>({
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -8
  })
  private right = signal<ConnectedPosition>({
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: 8
  })
  _tooltipPosition = computed((): ConnectedPosition[] => {
    switch (this.quangTooltipPosition()) {
      case 'top':
        return [this.top(), this.bottom()]
      case 'bottom':
        return [this.bottom(), this.top()]
      case 'left':
        return [this.left(), this.right()]
      case 'right':
        return [this.right(), this.left()]
      default:
        return [this.top(), this.bottom()]
    }
  })
  private overlayRef = signal<OverlayRef | null>(null)
  private readonly overlay = signal(inject(Overlay))
  private readonly overlayPositionBuilder = signal(inject(OverlayPositionBuilder))
  private readonly elementRef = signal(inject(ElementRef))
  _overlayRefEffect = effect(
    () => {
      console.log('_overlayRefEffect')
      const positionStrategy = this.overlayPositionBuilder()
        .flexibleConnectedTo(this.elementRef())
        .withPositions(this._tooltipPosition())
      this.overlayRef.set(this.overlay().create({ positionStrategy }))
    },
    { allowSignalWrites: true }
  )

  @HostListener('mouseenter') show() {
    if (this.showTimeout) clearTimeout(this.showTimeout)
    this.showTimeout = setTimeout(() => {
      const tooltipPortal = new ComponentPortal(QuangTooltipComponent)
      const createdOverlay = this.overlayRef()
      if (createdOverlay) {
        const tooltipRef = createdOverlay.attach(tooltipPortal)
        tooltipRef.instance.text = this.text
      }
    }, 500)
  }

  @HostListener('mouseleave') hide() {
    if (this.showTimeout) clearTimeout(this.showTimeout)
    this.overlayRef()?.detach()
  }
}
