import { ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay'
import { Directive, ElementRef, HostListener, OnInit, TemplateRef, inject, input, signal } from '@angular/core'

@Directive({
  selector: '[quangPopover]',
  providers: [],
  standalone: true
})
export class QuangPopoverDirective implements OnInit {
  @HostListener('click') onClick(): void {
    if (this.showMethod() === 'click') this.attachOverlay()
  }

  @HostListener('hover') onHover(): void {
    if (this.showMethod() === 'hover') this.attachOverlay()
  }

  showMethod = input<'click' | 'hover'>('click')
  popoverContent = input.required<TemplateRef<any>>({ alias: 'quangPopover' })

  showTimeout: any
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

  private overlayRef = signal<OverlayRef | null>(null)

  private readonly overlay = signal(inject(Overlay))
  private readonly overlayPositionBuilder = signal(inject(OverlayPositionBuilder))
  private readonly elementRef = signal(inject(ElementRef))

  ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder()
      .flexibleConnectedTo(this.elementRef())
      .withPositions(this.getPositions())
    this.overlayRef.set(this.overlay().create({ positionStrategy }))
  }

  attachOverlay(): void {
    const createdOverlay = this.overlayRef()
    if (createdOverlay) {
      this.overlayRef()?.attach(this.popoverContent())
    }
  }

  getPositions(): ConnectedPosition[] {
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
  }
}
