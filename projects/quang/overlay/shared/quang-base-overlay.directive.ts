import { ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal, ComponentType } from '@angular/cdk/portal'
import { Directive, ElementRef, HostListener, ViewContainerRef, computed, inject, input, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Directive()
export abstract class QuangBaseOverlayDirective<T = ComponentType<any>> {
  _targetComponentType = signal<ComponentType<T> | undefined>(undefined)

  /**
   * The amount of pixels needed for the popover to automatically disappear. If undefined the popover will not disappear on scroll
   * Default: 100
   * @default 100
   */
  scrollCloseThreshold = input<number | undefined>(100)

  showMethod = input<'click' | 'hover'>('click')
  content = input.required<any>()
  closeOnClickOutside: boolean = true
  overlayPosition = input<'top' | 'bottom' | 'left' | 'right'>('top')
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
    switch (this.overlayPosition()) {
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
    const targetComponentType = this._targetComponentType()
    if (!targetComponentType) {
      return
    }
    const positionStrategy = this.overlayPositionBuilder()
      .flexibleConnectedTo(this.elementRef())
      .withPositions(this._tooltipPosition())
    this.overlayRef.set(
      this.overlay().create({
        positionStrategy,
        scrollStrategy: this.scrollCloseThreshold()
          ? this.overlay().scrollStrategies.close({ threshold: this.scrollCloseThreshold() })
          : this.overlay().scrollStrategies.noop(),
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

    const componentPortal = new ComponentPortal(targetComponentType)
    const createdOverlay = this.overlayRef()
    if (createdOverlay) {
      const tooltipRef = createdOverlay.attach(componentPortal)
      ;(tooltipRef.instance as any).content = this.content
    }
  }

  detachOverlay(): void {
    this.overlayRef()?.detach()
    this.overlayRef()?.dispose()
  }

  showHideOverlay(): void {
    if (this.overlayRef()?.hasAttached()) {
      this.detachOverlay()
    } else {
      this.attachOverlay()
    }
  }
}
