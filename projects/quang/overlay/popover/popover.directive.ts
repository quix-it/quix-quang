import { ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import {
  Directive,
  ElementRef,
  HostListener,
  TemplateRef,
  ViewContainerRef,
  computed,
  effect,
  inject,
  input,
  signal
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { QuangPopoverComponent } from './popover.component'

@Directive({
  selector: '[quangPopover]',
  standalone: true
})
export class QuangPopoverDirective {
  showMethod = input<'click' | 'hover'>('click')
  popoverContent = input.required<TemplateRef<any> | null>({ alias: 'quangPopover' })
  closeOnClickOutside: boolean = true
  quangPopoverPosition = input<'top' | 'bottom' | 'left' | 'right'>('top')
  _takeUntilDestroyed = signal(takeUntilDestroyed())
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
    switch (this.quangPopoverPosition()) {
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
      const positionStrategy = this.overlayPositionBuilder()
        .flexibleConnectedTo(this.elementRef())
        .withPositions(this._tooltipPosition())
      this.overlayRef.set(
        this.overlay().create({
          positionStrategy,
          hasBackdrop: this.showMethod() === 'click',
          backdropClass: ''
        })
      )
      this.overlayRef()
        ?.backdropClick()
        .pipe(this._takeUntilDestroyed())
        .subscribe(() => {
          if (this.closeOnClickOutside) {
            this.detachOverlay()
          }
        })
    },
    { allowSignalWrites: true }
  )
  private readonly viewContainerRef = signal(inject(ViewContainerRef))

  @HostListener('click') onClick(): void {
    if (this.showMethod() === 'click') this.showHideOverlay()
  }

  @HostListener('mouseenter') onHover(): void {
    if (this.showMethod() === 'hover') this.showHideOverlay()
  }

  @HostListener('mouseleave') onLeave(): void {
    if (this.showMethod() === 'hover') this.detachOverlay()
  }

  attachOverlay(): void {
    const componentPortal = new ComponentPortal(QuangPopoverComponent)
    const createdOverlay = this.overlayRef()
    if (createdOverlay) {
      const tooltipRef = createdOverlay.attach(componentPortal)
      tooltipRef.instance.popoverContent = this.popoverContent
    }
  }

  detachOverlay(): void {
    this.overlayRef()?.detach()
  }

  showHideOverlay(): void {
    if (this.overlayRef()?.hasAttached()) {
      this.detachOverlay()
    } else {
      this.attachOverlay()
    }
  }
}
